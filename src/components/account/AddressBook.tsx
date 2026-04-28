"use client";

import { ChangeEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { apiFetch } from "@/lib/api";
import { Contact } from "@/types";

interface AddressBookProps {
  mode?: "default" | "quote";
  onUseContact?: (contact: Contact) => void;
  backButton?: React.ReactNode;
  introMessage?: string;
}

type ContactForm = {
  name: string;
  email: string;
  phone: string;
  company: string;
  address1: string;
  address2: string;
  city: string;
  county: string;
  postcode: string;
};

const emptyForm: ContactForm = {
  name: "",
  email: "",
  phone: "",
  company: "",
  address1: "",
  address2: "",
  city: "",
  county: "",
  postcode: "",
};

export default function AddressBook({
  mode = "default",
  onUseContact,
  backButton,
  introMessage,
}: AddressBookProps) {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [activeContact, setActiveContact] = useState<Contact | null>(null);
  const [form, setForm] = useState<ContactForm>(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  async function fetchContacts() {
    setLoading(true);
    try {
      const res = await apiFetch<{ contacts: Contact[] }>("/contacts");
      setContacts(res.contacts);
    } catch (error) {
      console.error("Error fetching contacts:", error);
      setErrorMessage("Failed to load contacts.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchContacts();
  }, []);

  const filteredContacts = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return contacts;

    return contacts.filter((contact) => {
      const fields = [
        contact.name,
        contact.company,
        contact.email,
        contact.phone,
        contact.city,
        contact.postcode,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return fields.includes(term);
    });
  }, [contacts, searchTerm]);

  function handleFormChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function openAddModal() {
    setIsEdit(false);
    setActiveContact(null);
    setForm(emptyForm);
    setErrorMessage("");
    setSuccessMessage("");
    setIsModalOpen(true);
  }

  function openEditModal(contact: Contact) {
    setIsEdit(true);
    setActiveContact(contact);
    setForm({
      name: contact.name || "",
      email: contact.email || "",
      phone: contact.phone || "",
      company: contact.company || "",
      address1: contact.address1 || "",
      address2: contact.address2 || "",
      city: contact.city || "",
      county: contact.county || "",
      postcode: contact.postcode || "",
    });
    setErrorMessage("");
    setSuccessMessage("");
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setActiveContact(null);
    setForm(emptyForm);
  }

  async function handleSave() {
    setSaving(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      if (isEdit && activeContact) {
        const updated = await apiFetch<Contact>(`/contacts/${activeContact.id}`, {
          method: "PUT",
          body: form,
        });

        setContacts((prev) =>
          prev.map((contact) =>
            contact.id === updated.id ? updated : contact
          )
        );

        setSuccessMessage("Contact updated successfully.");
      } else {
        const created = await apiFetch<Contact>("/contacts", {
          method: "POST",
          body: form,
        });

        setContacts((prev) => [created, ...prev]);
        setSuccessMessage("Contact added successfully.");

        if (onUseContact) {
          onUseContact(created);
          closeModal();
          return;
        }
      }

      closeModal();
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Failed to save contact."
      );
    } finally {
      setSaving(false);
    }
  }

async function handleDelete() {
  if (!activeContact) return;

  const confirmed = window.confirm(
    `Delete ${activeContact.name || "this contact"}?`
  );
  if (!confirmed) return;

  setSaving(true);
  setErrorMessage("");
  setSuccessMessage("");

  try {
    await apiFetch(`/contacts/${activeContact.id}`, {
      method: "DELETE",
    });

    setContacts((prev) =>
      prev.filter((contact) => contact.id !== activeContact.id)
    );

    closeModal();
    setSuccessMessage("Contact deleted successfully.");
  } catch (error) {
    setErrorMessage(
    error instanceof Error ? error.message : "Unable to delete contact."
  );
  } finally {
    setSaving(false);
  }
}

  return (
    <div className="mx-auto max-w-[980px] py-4 md:py-8">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {backButton}
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold">Address Book</h1>
            <p className="text-sm text-gray-600">
              Manage customers and reuse them in quotes.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
          >
            Dashboard
          </Link>

          {mode === "default" ? (
            <Link
              href="/account/quotes"
              className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
            >
              Quotes
            </Link>
          ) : null}

          <button
            type="button"
            onClick={openAddModal}
            className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
          >
            + Add Contact
          </button>
        </div>
      </div>

      {introMessage ? (
        <div className="mb-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          {introMessage}
        </div>
      ) : null}

      {successMessage ? (
        <div className="mb-4 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
          {successMessage}
        </div>
      ) : null}

      {errorMessage ? (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {errorMessage}
        </div>
      ) : null}

      <div className="mb-6">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search contacts..."
          className="w-full rounded-2xl border px-4 py-3"
        />
      </div>

      {loading ? (
        <div className="rounded-2xl border p-6">Loading contacts...</div>
      ) : filteredContacts.length === 0 ? (
        <div className="rounded-2xl border p-6 text-gray-600">
          No contacts found.
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredContacts.map((contact) => (
            <div
              key={contact.id}
              className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div className="space-y-1">
                  <h2 className="text-lg font-semibold">{contact.name}</h2>
                  {contact.company ? (
                    <p className="text-sm text-gray-700">{contact.company}</p>
                  ) : null}
                  {contact.email ? (
                    <p className="text-sm text-gray-600">{contact.email}</p>
                  ) : null}
                  {contact.phone ? (
                    <p className="text-sm text-gray-600">{contact.phone}</p>
                  ) : null}
                  {[contact.address1, contact.address2, contact.city, contact.county, contact.postcode]
                    .filter(Boolean)
                    .length > 0 ? (
                    <p className="text-sm text-gray-600">
                      {[contact.address1, contact.address2, contact.city, contact.county, contact.postcode]
                        .filter(Boolean)
                        .join(", ")}
                    </p>
                  ) : null}
                </div>

                <div className="flex flex-wrap gap-2">
                  {mode === "quote" && onUseContact ? (
                    <button
                      type="button"
                      onClick={() => onUseContact(contact)}
                      className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
                    >
                      Use Contact
                    </button>
                  ) : null}

                  <button
                  type="button"
                  onClick={() => openEditModal(contact)}
                  className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                >
                  Edit
                </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {isModalOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-semibold">
                {isEdit ? "Edit Contact" : "Add Contact"}
              </h3>

              <button
                type="button"
                onClick={closeModal}
                className="rounded-xl border px-3 py-1.5 text-sm"
              >
                Close
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <input
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleFormChange}
                className="rounded-xl border px-3 py-2"
              />
              <input
                name="company"
                placeholder="Company"
                value={form.company}
                onChange={handleFormChange}
                className="rounded-xl border px-3 py-2"
              />
              <input
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleFormChange}
                className="rounded-xl border px-3 py-2"
              />
              <input
                name="phone"
                placeholder="Phone"
                value={form.phone}
                onChange={handleFormChange}
                className="rounded-xl border px-3 py-2"
              />
              <input
                name="address1"
                placeholder="Address 1"
                value={form.address1}
                onChange={handleFormChange}
                className="rounded-xl border px-3 py-2 md:col-span-2"
              />
              <input
                name="address2"
                placeholder="Address 2"
                value={form.address2}
                onChange={handleFormChange}
                className="rounded-xl border px-3 py-2 md:col-span-2"
              />
              <input
                name="city"
                placeholder="Town / City"
                value={form.city}
                onChange={handleFormChange}
                className="rounded-xl border px-3 py-2"
              />
              <input
                name="county"
                placeholder="County / State"
                value={form.county}
                onChange={handleFormChange}
                className="rounded-xl border px-3 py-2"
              />
              <input
                name="postcode"
                placeholder="Postcode / ZIP"
                value={form.postcode}
                onChange={handleFormChange}
                className="rounded-xl border px-3 py-2 md:col-span-2"
              />
            </div>

            <div className="mt-6 flex flex-wrap justify-between gap-3">
              <div>
                {isEdit ? (
                  <button
                    type="button"
                    onClick={handleDelete}
                    disabled={saving}
                    className="rounded-xl border border-rose-300 bg-rose-50 px-4 py-2 text-sm font-medium text-rose-700 hover:bg-rose-100 disabled:opacity-50"
                  >
                    Delete Contact
                  </button>
                ) : null}
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-xl border px-4 py-2 text-sm"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={saving}
                  className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-50"
                >
                  {saving
                    ? "Saving..."
                    : isEdit
                    ? "Save Changes"
                    : "Add Contact"}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}