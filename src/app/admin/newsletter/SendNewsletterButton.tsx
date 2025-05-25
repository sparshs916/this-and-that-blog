"use client";

import { sendNewsletter } from "@/app/lib/actions";
import { useTransition, useState } from "react";

interface SendNewsletterButtonProps {
  issueId: string;
}

export default function SendNewsletterButton({
  issueId,
}: SendNewsletterButtonProps) {
  const [isTransitionPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(false); // Local loading state

  const handleClick = () => {
    if (isLoading || isTransitionPending) return; // Prevent multiple clicks if already processing

    setIsLoading(true); // Set local loading state immediately
    startTransition(async () => {
      try {
        const result = await sendNewsletter(issueId);
        if (result?.message) {
          alert(result.message); // Or use a more sophisticated notification system
        }
      } catch (error) {
        console.error("Failed to send newsletter:", error);
        alert("An error occurred while trying to send the newsletter.");
      } finally {
        setIsLoading(false); // Reset local loading state regardless of outcome
      }
    });
  };

  const buttonDisabled = isLoading || isTransitionPending;

  return (
    <button
      type="button"
      onClick={handleClick}
      className="text-green-600 hover:text-green-900 mr-3"
      title="Send Newsletter"
      disabled={buttonDisabled} // Use combined disabled state
    >
      {buttonDisabled ? "Sending..." : "Send"}
    </button>
  );
}
