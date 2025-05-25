"use client";

import { useTransition } from "react";
import { deleteNewsletterIssue } from "@/app/lib/actions"; // Assuming you'll create this action

interface DeleteNewsletterButtonProps {
  issueId: string;
}

export default function DeleteNewsletterButton({
  issueId,
}: DeleteNewsletterButtonProps) {
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    if (confirm("Are you sure you want to delete this newsletter issue?")) {
      startTransition(async () => {
        const result = await deleteNewsletterIssue(issueId);
        if (result?.message && result.status && result.status >= 400) {
          alert(`Error deleting issue: ${result.message}`);
        } else if (result?.errors) {
          alert(`Error deleting issue: ${JSON.stringify(result.errors)}`);
        }
        // Revalidation will be handled by the server action
      });
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className="text-red-600 hover:text-red-900 disabled:opacity-50"
      title="Delete Newsletter Issue"
    >
      {isPending ? "Deleting..." : "Delete"}
    </button>
  );
}
