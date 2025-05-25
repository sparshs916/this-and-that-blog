"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { subscribeToNewsletter } from "@/app/lib/actions";
import type { State } from "@/app/lib/actions";
import { useEffect, useRef, useState } from "react";

const initialState: State = {
  message: null,
  errors: {},
  status: undefined,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 transition-colors"
    >
      {pending ? "Subscribing..." : "Subscribe"}
    </button>
  );
}

export default function NewsletterForm() {
  const [state, formAction] = useActionState(
    subscribeToNewsletter,
    initialState
  );
  const formRef = useRef<HTMLFormElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  // Effect for handling form submission success
  useEffect(() => {
    if (state.status === 200 && state.message) {
      formRef.current?.reset();
      // Optionally, you might want to auto-dismiss after a successful submission
      // setTimeout(() => {
      //   setIsVisible(false);
      // }, 3000);
    }
  }, [state.status, state.message]);

  const handleDismiss = () => {
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="relative p-6 bg-white rounded-lg shadow-lg border border-gray-200">
      <button
        onClick={handleDismiss}
        className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors z-10"
        aria-label="Dismiss newsletter signup"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
      {state.message && (
        <div
          className={`mb-4 p-3 rounded-md text-sm ${
            state.status === 200
              ? "bg-green-100 border-green-400 text-green-700"
              : "bg-red-100 border-red-400 text-red-700"
          }`}
          role="alert"
        >
          {state.message}
        </div>
      )}
      <div>
        {" "}
        {/* Inner container for content */}
        <h3 className="text-lg font-medium text-gray-900 mb-2">Stay Updated</h3>
        <p className="text-sm text-gray-600 mb-4">
          Get the latest posts and recipes delivered straight to your inbox.
        </p>
        <form
          action={formAction}
          ref={formRef}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-center gap-3"
        >
          <div className="w-full sm:w-auto flex-grow">
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400"
              placeholder="Enter your email"
            />
          </div>
          <SubmitButton />
        </form>
        {state.errors?.email && (
          <p className="mt-1 text-sm text-red-600">
            {state.errors.email.join(", ")}
          </p>
        )}
      </div>
    </div>
  );
}
