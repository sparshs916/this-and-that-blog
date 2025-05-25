
// @/src/lib/newsletters.ts
import prisma from "@/app/lib/prisma";
import { NewsletterIssue, NewsletterStatus, Prisma } from "@/generated/prisma/client";
import type { PrismaClientWithAccelerate } from "@/app/lib/prisma";

export type SortableNewsletterFields = "subject" | "status" | "createdAt";
export type SortOrder = "asc" | "desc";

interface GetNewsletterIssuesParams {
  page?: number;
  limit?: number;
  sortBy?: SortableNewsletterFields;
  sortOrder?: SortOrder;
  status?: NewsletterStatus; // Optional: to filter by status if needed later
}

interface GetNewsletterIssuesResult {
  issues: NewsletterIssue[];
  totalIssues: number;
  totalPages: number;
  currentPage: number;
}

export async function getNewsletterIssues({
  page = 1,
  limit = 5, // Default to 5 issues per page
  sortBy = "createdAt",
  sortOrder = "desc",
  status,
}: GetNewsletterIssuesParams): Promise<GetNewsletterIssuesResult> {
  const skip = (page - 1) * limit;
  const take = limit;

  const whereClause: Prisma.NewsletterIssueWhereInput = {};
  if (status) {
    whereClause.status = status;
  }

  const orderByClause: Prisma.NewsletterIssueOrderByWithRelationInput = {
    [sortBy]: sortOrder,
  };

  try {
    const issues = await (
      prisma as PrismaClientWithAccelerate
    ).newsletterIssue.findMany({
      where: whereClause,
      orderBy: orderByClause,
      skip,
      take,
    });

    const totalIssues = await (
      prisma as PrismaClientWithAccelerate
    ).newsletterIssue.count({
      where: whereClause,
    });

    return {
      issues,
      totalIssues,
      totalPages: Math.ceil(totalIssues / limit),
      currentPage: page,
    };
  } catch (error) {
    console.error("Failed to fetch newsletter issues:", error);
    // In case of an error, return an empty list and appropriate pagination info
    return {
      issues: [],
      totalIssues: 0,
      totalPages: 0,
      currentPage: 1,
    };
  }
}
