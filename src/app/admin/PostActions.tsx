"use client";

import React from "react";
import Link from "next/link";
import { deletePost, togglePublishStatus } from "@/app/lib/actions"; // Use alias

interface PostActionsProps {
  postId: string;
  postSlug: string;
  isPublished: boolean;
}

export default function PostActions({
  postId,
  postSlug,
  isPublished,
}: PostActionsProps) {
  // Wrapper function for delete action
  const handleDelete = () => {
    // Add confirmation dialog
    if (!confirm("Are you sure you want to delete this post?")) {
      return; // Stop execution if user cancels
    }
    void (async () => {
      try {
        const result = await deletePost(postId);

        if (result.status && result.status >= 400) {
          // Server action reported an error
          alert(
            result.message || "Failed to delete the post. Please try again."
          );
        } else if (result.status === 200) {
          // Successfully deleted, revalidation will update the UI.
          // Optionally, show a success message, e.g., using a toast notification library.
        } else {
          // Unexpected result structure, though deletePost should conform to State interface
          alert(
            "Received an unexpected response after attempting to delete the post."
          );
        }
      } catch (error) {
        // Catch client-side errors or if the promise from deletePost rejects unexpectedly
        alert(
          "An unexpected error occurred while trying to delete the post. Please try again."
        );
      }
    })();
  };

  // Wrapper function for toggle publish status action
  const handleTogglePublish = () => {
    void (async () => {
      try {
        await togglePublishStatus(postId, isPublished);
        // Optionally show a success notification
      } catch (error) {
        // Optionally show an error notification
        alert("Failed to toggle publish status. Please try again."); // Added alert for toggle failure
      }
    })();
  };

  return (
    <div className="flex items-center justify-end space-x-2">
      {/* Publish/Unpublish Button */}
      {/* Changed to use onClick for consistency and potential future enhancements */}
      <button
        type="button"
        onClick={handleTogglePublish}
        className={`px-2 py-1 text-xs rounded ${
          isPublished
            ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
            : "bg-blue-500 text-white hover:bg-blue-600"
        }`}
      >
        {isPublished ? "Unpublish" : "Publish"}
      </button>

      {/* Edit Link */}
      <Link
        href={`/admin/edit/${postId}`}
        className="text-indigo-600 hover:text-indigo-900 text-sm"
      >
        Edit
      </Link>

      {/* Delete Button - Changed to use onClick instead of form action */}
      <button
        type="button" // Change type to button to prevent form submission
        onClick={handleDelete} // Call handleDelete on click
        className="text-red-500 hover:text-red-700 text-sm"
      >
        Delete
      </button>

      {/* View Link - Conditionally rendered based on published status */}
      {isPublished && (
        <Link
          href={`/blog/${postSlug}`}
          target="_blank"
          className="text-blue-500 hover:text-blue-700 text-sm"
        >
          View
        </Link>
      )}
    </div>
  );
}
