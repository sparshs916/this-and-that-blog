"use client";

import { useState, useEffect, use } from "react"; // Added 'use'
import { useActionState } from "react";
import { updateNewsletterIssue } from "@/app/lib/actions"; // Corrected import
import LexicalEditor from "@/app/components/LexicalEditor";
import { State } from "@/app/lib/actions";
import prisma from "@/app/lib/prisma"; // Required for fetching
import { NewsletterIssue } from "@/generated/prisma/client"; // Type for the issue

const initialState: State = {
  message: null,
  errors: {},
  status: undefined,
};

// Helper to check if a string is likely Lexical JSON
function isLikelyLexicalJsonString(str: string | null | undefined): boolean {
  if (!str) return false;
  try {
    const parsed = JSON.parse(str);
    return (
      typeof parsed === "object" &&
      parsed !== null &&
      "root" in parsed &&
      typeof parsed.root === "object" &&
      parsed.root !== null &&
      "children" in parsed.root
    );
  } catch (e) {
    return false;
  }
}

// Helper function to fetch newsletter issue (client-side for this example, consider server component if preferred)
// For simplicity in this client component, we'll fetch here.
// Ideally, for RSC, this would be passed as a prop from a server component parent or fetched in a route handler.
async function getNewsletterIssue(id: string): Promise<NewsletterIssue | null> {
  // This is a placeholder. In a real app, you'd fetch this from your API/server action
  // For the purpose of this example, let's assume this function can be adapted
  // to be called in a useEffect hook or similar client-side data fetching pattern.
  // Since direct prisma access isn't typical in client components without an API route,
  // this part would need to be refactored for a production app.
  // For now, we'll simulate the fetch and expect this to be adapted.
  // console.log(`Fetching issue with id: ${id} - this needs a proper API endpoint`);
  // return null;
  // This function will not be directly callable from client like this with Prisma.
  // It's more of a conceptual placeholder. The actual data fetching will be done in the component.
  // We'll fetch the data within the component using a useEffect hook and a dedicated API route or server action.
  // For now, the component will expect `initialSubject` and `initialContent` as props or fetch them.
  // Let's adjust the component to receive these as props or fetch them.
  // For this iteration, we'll fetch within useEffect.
  return null; // This function itself won't be used directly as Prisma is server-side.
}

export default function EditNewsletterPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // params is a Promise
  const resolvedParams = use(params); // Unwrap the params Promise
  const { id } = resolvedParams; // Access id from resolvedParams
  const [initialTitle, setInitialTitle] = useState<string>(""); // Renamed from initialSubject
  const [initialContentJson, setInitialContentJson] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const [editorStateJson, setEditorStateJson] = useState<string>("");
  const [actionState, formAction, isPending] = useActionState(
    updateNewsletterIssue, // Corrected server action
    initialState
  );
  const [formKey, setFormKey] = useState(Date.now());

  useEffect(() => {
    async function fetchIssueData() {
      setIsLoading(true);
      setFetchError(null);
      try {
        const issue = await fetch(`/api/newsletter-issue?id=${id}`).then(
          (res) => {
            if (!res.ok) throw new Error("Failed to fetch newsletter issue");
            return res.json();
          }
        );

        if (issue) {
          setInitialTitle(issue.title); // Changed from issue.subject
          const content = issue.content || "";
          if (isLikelyLexicalJsonString(content)) {
            setInitialContentJson(content);
            setEditorStateJson(content);
          } else {
            // If content is not valid Lexical JSON (e.g., it\'s HTML or empty/corrupted)
            // Initialize with an empty editor state.
            console.warn(
              "Fetched content is not valid Lexical JSON. Initializing with empty editor for ID:",
              id
            );
            const emptyLexicalState = JSON.stringify({
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
            setInitialContentJson(emptyLexicalState);
            setEditorStateJson(emptyLexicalState);
          }
        } else {
          setFetchError("Newsletter issue not found.");
        }
      } catch (error) {
        console.error("Failed to fetch newsletter issue:", error);
        setFetchError(
          error instanceof Error ? error.message : "An unknown error occurred."
        );
      } finally {
        setIsLoading(false);
      }
    }
    if (id) {
      fetchIssueData();
    }
  }, [id]);

  useEffect(() => {
    if (actionState.status === 200 && actionState.message) {
      // 200 for update
      // alert(actionState.message); // Or use a more sophisticated notification
      // Optionally, redirect or give other feedback
      // Form reset is less critical on edit, user might want to continue editing
    } else if (
      actionState.message &&
      actionState.status &&
      actionState.status >= 400
    ) {
      // alert(actionState.message); // Or display error more gracefully
    }
  }, [actionState]);

  const handleEditorChange = (jsonString: string) => {
    setEditorStateJson(jsonString);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        Loading newsletter data...
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="container mx-auto px-4 py-8 text-center text-red-600">
        Error: {fetchError}
      </div>
    );
  }

  if (!initialTitle && !isLoading) {
    // If not loading and still no subject, assume not found after fetch attempt
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        Newsletter issue not found.
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Edit Newsletter</h1>

      {actionState.message && (
        <div
          className={`mb-4 p-3 rounded-md ${
            actionState.status && actionState.status >= 400
              ? "bg-red-100 text-red-700"
              : actionState.status === 200
                ? "bg-green-100 text-green-700"
                : "bg-blue-100 text-blue-700" // Default for other messages
          }`}
        >
          {actionState.message}
        </div>
      )}

      <form
        action={formAction}
        key={formKey}
        className="space-y-6 bg-white p-6 shadow-md rounded-lg"
      >
        <input type="hidden" name="id" value={id} />
        <div>
          <label
            htmlFor="title" // Changed from subject
            className="block text-sm font-medium text-black mb-1"
          >
            Title {/* Changed from Subject */}
          </label>
          <input
            type="text"
            id="title" // Changed from subject
            name="title" // Changed from subject
            required
            defaultValue={initialTitle} // Changed from initialSubject
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
            disabled={isPending}
          />
          {actionState.errors?.title && ( // Changed from subject
            <p className="mt-1 text-xs text-red-600">
              {actionState.errors.title} {/* Changed from subject */}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="content"
            className="block text-sm font-medium text-black mb-1"
          >
            Content
          </label>
          <div className="mt-1 p-2.5 border border-gray-300 rounded-md shadow-sm">
            <LexicalEditor
              initialContent={initialContentJson} // Use initialContentJson here
              onChange={handleEditorChange}
              // isEditable={!isPending} // Removed isEditable prop
            />
          </div>
          <input type="hidden" name="content" value={editorStateJson} />
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
            {isPending ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
