import prisma from "@/app/lib/prisma";
import { convertLexicalToHtml } from "@/app/lib/lexicalToHtml";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { PrismaClientWithAccelerate } from "@/app/lib/prisma";
import { NewsletterIssue } from "@/generated/prisma";
import React from "react";

async function getNewsletterIssue(id: string) {
  try {
    const newsletterIssue = await (
      prisma as PrismaClientWithAccelerate
    ).newsletterIssue.findUnique({
      where: { id },
    });
    return newsletterIssue;
  } catch (error) {
    console.error("Failed to fetch newsletter issue:", error);
    return null;
  }
}

// Helper to check if a string is likely JSON
function isLikelyJsonString(str: string | null | undefined): boolean {
  if (!str) return false;
  try {
    const parsed = JSON.parse(str);
    // Further check if it has a common Lexical root structure
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

export default async function ViewNewsletterPage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params; // Await params and then destructure
  const issue = await getNewsletterIssue(id); // Use the destructured id

  if (!issue) {
    notFound();
  }

  let htmlContent = "";
  if (issue.content) {
    if (isLikelyJsonString(issue.content)) {
      try {
        htmlContent = convertLexicalToHtml(issue.content);
      } catch (error) {
        console.error(
          "Error converting Lexical JSON content to HTML for issue ID:",
          issue.id,
          error
        );
        // Provide the raw content if conversion fails, wrapped in a pre tag for visibility
        htmlContent = `<p style="color: red;">Error displaying structured content. Raw content below:</p><pre style="white-space: pre-wrap; word-wrap: break-word; border: 1px solid #ccc; padding: 10px; background-color: #f9f9f9;">${issue.content.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</pre>`;
      }
    } else {
      // Assume it's already HTML if it's not valid JSON
      console.warn(
        "Content for issue ID",
        issue.id,
        "does not appear to be Lexical JSON. Displaying as raw HTML."
      );
      htmlContent = issue.content;
    }
  } else {
    htmlContent = "<p>No content available for this issue.</p>";
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link
          href="/admin/newsletter"
          className="text-indigo-600 hover:text-indigo-800"
        >
          &larr; Back to Newsletter Issues
        </Link>
      </div>

      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-800">{issue.title}</h1>
          <p className="text-sm text-gray-500">
            Status:{" "}
            <span
              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                issue.status === "SENT"
                  ? "bg-green-100 text-green-800"
                  : issue.status === "DRAFT"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-gray-100 text-gray-800" // Fallback for other statuses (e.g., ARCHIVED)
              }`}
            >
              {issue.status}
            </span>
            {issue.sentAt && (
              <span className="ml-4">
                Sent: {new Date(issue.sentAt).toLocaleString()}
              </span>
            )}
          </p>
        </div>

        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Preview:</h2>
          <div
            className="prose prose-lg max-w-none text-black"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        </div>
      </div>
    </div>
  );
}
