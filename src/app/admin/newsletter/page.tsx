import prisma from "@/app/lib/prisma";
import Link from "next/link";
import { NewsletterIssue, NewsletterStatus } from "@/generated/prisma";
import type { PrismaClientWithAccelerate } from "@/app/lib/prisma";
import SendNewsletterButton from "./SendNewsletterButton"; // Import the client component
import DeleteNewsletterButton from "./DeleteNewsletterButton"; // Ensure this line is present and not commented out

async function getNewsletterIssues(): Promise<NewsletterIssue[]> {
  const issues = await (
    prisma as PrismaClientWithAccelerate
  ).newsletterIssue.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return issues;
}

export default async function NewsletterIssuesPage() {
  const issues: NewsletterIssue[] = await getNewsletterIssues();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Newsletter Issues
        </h1>
        <Link
          href="/admin/newsletter/compose"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-sm sm:text-base whitespace-nowrap"
        >
          Compose New
        </Link>
      </div>

      {issues.length === 0 ? (
        <p className="text-gray-600">No newsletter issues found.</p>
      ) : (
        <div className="bg-white shadow-md rounded-lg overflow-x-auto">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Title {/* Changed from Subject to Title */}
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Created At
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {issues.map((issue: NewsletterIssue) => (
                <tr key={issue.id}>
                  <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                      {issue.title}{" "}
                      {/* Changed from issue.subject to issue.title */}
                    </p>
                  </td>
                  <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        issue.status === NewsletterStatus.DRAFT
                          ? "bg-yellow-100 text-yellow-800"
                          : issue.status === NewsletterStatus.SENT
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {issue.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                      {new Date(issue.createdAt).toLocaleDateString()}
                    </p>
                  </td>
                  <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm">
                    <div className="flex items-center space-x-3">
                      <Link
                        href={`/admin/newsletter/edit/${issue.id}`}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        Edit
                      </Link>
                      {issue.status === NewsletterStatus.DRAFT && (
                        <SendNewsletterButton issueId={issue.id} />
                      )}
                      <Link
                        href={`/admin/newsletter/view/${issue.id}`}
                        className="text-blue-600 hover:text-blue-900"
                        title="View Newsletter"
                      >
                        View
                      </Link>
                      <DeleteNewsletterButton issueId={issue.id} />{" "}
                      {/* Ensure this line is present */}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
