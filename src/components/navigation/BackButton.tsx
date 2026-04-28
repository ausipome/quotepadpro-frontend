"use client";

type Props = {
  onClick: () => void;
};

export default function BackButton({ onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center rounded-xl border px-4 py-2 text-sm hover:bg-gray-50"
      type="button"
    >
      ← Back
    </button>
  );
}