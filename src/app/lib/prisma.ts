import { PrismaClient } from "@/generated/prisma/client"; // Correct import path

// Check and log the DATABASE_URL
if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL environment variable is not set!");
} else {
  // Log the URL being used to verify it's correct inside the container
  console.log("DATABASE_URL found:", process.env.DATABASE_URL);
}

// Directly instantiate and export the client
const prisma = new PrismaClient();

export default prisma;