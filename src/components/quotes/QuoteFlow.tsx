"use client";

import { useState } from "react";
import { apiFetch } from "@/lib/api";
import { Contact, Quote } from "@/types";
import AddressBook from "@/components/account/AddressBook";
import BackButton from "@/components/navigation/BackButton";
import QuoteList from "./QuoteList";
import QuoteBuilder from "./QuoteBuilder";

export default function QuoteFlow() {
  const [showAddressBook, setShowAddressBook] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
  const [loadingQuote, setLoadingQuote] = useState(false);

  function handleBackClick() {
    if (selectedQuote) {
      setSelectedQuote(null);
    } else if (selectedContact) {
      setSelectedContact(null);
      setShowAddressBook(true);
    } else {
      setShowAddressBook(false);
    }
  }

  function handleNewQuoteClick() {
    setSelectedQuote(null);
    setSelectedContact(null);
    setShowAddressBook(true);
  }

  function handleUseContact(contact: Contact) {
    setSelectedContact(contact);
    setShowAddressBook(false);
  }

  async function handleOpenQuote(quote: Quote) {
    setLoadingQuote(true);
    try {
      const fullQuote = await apiFetch<Quote>(`/quotes/${quote.id}`);
      setSelectedQuote(fullQuote);
      setSelectedContact(null);
      setShowAddressBook(false);
    } finally {
      setLoadingQuote(false);
    }
  }

  function handleHomeClick() {
    setShowAddressBook(false);
    setSelectedContact(null);
    setSelectedQuote(null);
  }

  function handleNewQuote() {
    setSelectedQuote(null);
    setSelectedContact(null);
    setShowAddressBook(true);
  }

  if (loadingQuote) {
    return (
      <div className="container mx-auto py-4 md:py-8">
        <div className="rounded-2xl border p-6">Loading quote...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-4 md:py-8">
      {selectedQuote ? (
        <QuoteBuilder
          quoteData={selectedQuote}
          backButton={<BackButton onClick={handleBackClick} />}
          onNewQuote={handleNewQuote}
          onHomeClick={handleHomeClick}
        />
      ) : selectedContact ? (
        <QuoteBuilder
          customer={selectedContact}
          backButton={<BackButton onClick={handleBackClick} />}
          onNewQuote={handleNewQuote}
          onHomeClick={handleHomeClick}
        />
      ) : showAddressBook ? (
        <AddressBook
          mode="quote"
          onUseContact={handleUseContact}
          backButton={<BackButton onClick={handleBackClick} />}
          introMessage="Select a contact to start a new quote, or add a new contact first."
        />
      ) : (
        <QuoteList
          onNewQuoteClick={handleNewQuoteClick}
          onOpenQuote={handleOpenQuote}
        />
      )}
    </div>
  );
}