"use client";

import { useState, useEffect } from "react";
import { useActionState } from "react";
import { createNewsletterIssue } from "@/app/lib/actions"; // Corrected import
import LexicalEditor from "@/app/components/LexicalEditor";
import { State } from "@/app/lib/actions";

const initialState: State = {
  message: null,
  errors: {},
  status: undefined,
};

const initialEmptyLexicalStateString = JSON.stringify({
  root: {
    children: [
      {
        children: [],
        direction: null,
        format: "",
        indent: 0,
        type: "paragraph",
        version: 1,
      },
    ],
    direction: null,
    format: "",
    indent: 0,
    type: "root",
    version: 1,
  },
});

export default function ComposeNewsletterPage() {
  const [editorStateJson, setEditorStateJson] = useState<string>(
    initialEmptyLexicalStateString
  );
  const [actionState, formAction, isPending] = useActionState(
    createNewsletterIssue, // Corrected function call
    initialState
  );
  const [formKey, setFormKey] = useState(Date.now()); // To reset form fields

  useEffect(() => {
    if (actionState.status === 201 && actionState.message) {
      // Successfully created, reset form
      // This logic might not fully execute if a redirect happens very quickly from the server action
      setEditorStateJson(initialEmptyLexicalStateString);
      setFormKey(Date.now());
      // alert(actionState.message); // Or use a more sophisticated notification
    } else if (
      actionState.message &&
      actionState.status &&
      actionState.status >= 400 // Check for error status explicitly
    ) {
      // alert(actionState.message); // Or display error more gracefully
    }
  }, [actionState]);

  const handleEditorChange = (jsonString: string) => {
    setEditorStateJson(jsonString);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Compose Newsletter
      </h1>

      {actionState.message &&
        actionState.status !== 201 && ( // Display general/error messages
          <div
            className={`mb-4 p-3 rounded-md ${
              actionState.status && actionState.status >= 400
                ? "bg-red-100 text-red-700"
                : "bg-blue-100 text-blue-700" // Default for non-error, non-201 messages
            }`}
          >
            {actionState.message}
          </div>
        )}
      {/* Explicitly show success message if actionState indicates it (e.g., if not redirecting immediately) */}
      {actionState.message && actionState.status === 201 && (
        <div className="mb-4 p-3 rounded-md bg-green-100 text-green-700">
          {actionState.message}
        </div>
      )}

      <form
        action={formAction}
        key={formKey}
        className="space-y-6 bg-white p-6 shadow-md rounded-lg"
      >
        <div>
          <label
            htmlFor="subject"
            className="block text-sm font-medium text-black mb-1"
          >
            Subject
          </label>
          <input
            type="text"
            id="subject" // id can remain "subject" for the label association
            name="title" // Changed from "subject" to "title"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
            disabled={isPending}
          />
          {actionState.errors?.title && (
            <p className="mt-1 text-xs text-red-600">
              {actionState.errors.title.join(", ")}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Content
          </label>
          <input type="hidden" name="content" value={editorStateJson} />
          <div className="mt-1 border border-gray-300 rounded-md shadow-sm">
            <LexicalEditor
              onChange={handleEditorChange}
              initialContent={editorStateJson}
            />
          </div>
          {actionState.errors?.content && (
            <p className="mt-1 text-xs text-red-600">
              {actionState.errors.content.join(", ")}
            </p>
          )}
        </div>

        <div>
          <button
            type="submit"
            disabled={isPending}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {isPending ? "Saving..." : "Save Draft"}
          </button>
        </div>
      </form>
    </div>
  );
}
