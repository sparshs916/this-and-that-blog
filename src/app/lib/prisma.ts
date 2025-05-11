import { PrismaClient } from "@/generated/prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

// Define a global variable to hold the Prisma client instance
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

// Initialize Prisma Client with Accelerate extension
const prisma =
  global.prisma ||
  new PrismaClient().$extends(withAccelerate());

// In development, assign the Prisma client to the global variable
// This prevents creating a new client on every hot reload
if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}

export default prisma;