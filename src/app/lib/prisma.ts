import { PrismaClient } from "@/generated/prisma/client"; // Correct import path

// Check and log the DATABASE_URL, only on the server
if (typeof window === 'undefined') {
  if (!process.env.DATABASE_URL) {
    // console.error("DATABASE_URL environment variable is not set on the server!"); // Removed log
  } else {
    // Log the URL being used to verify it's correct inside the container
    // console.log("DATABASE_URL found on server:", process.env.DATABASE_URL); // Removed log
  }
}

// Directly instantiate and export the client
const prisma = new PrismaClient();

export default prisma;