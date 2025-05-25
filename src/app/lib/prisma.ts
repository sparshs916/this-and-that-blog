import { PrismaClient } from "@/generated/prisma";
import { withAccelerate } from "@prisma/extension-accelerate";

// Helper to get the type of the client extended with Accelerate.
// This is used for type inference and does not create a runtime client here.
const _tempClient = new PrismaClient();
const _tempExtendedClient = _tempClient.$extends(withAccelerate());
export type PrismaClientWithAccelerate = typeof _tempExtendedClient; // Export this type

// This type represents either the base Prisma client or the one extended with Accelerate.
type PrismaClientVariant = PrismaClient | PrismaClientWithAccelerate;

const prismaClientSingleton = (): PrismaClientVariant => {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    console.error("prisma.ts: FATAL: DATABASE_URL environment variable is not set.");
    throw new Error("DATABASE_URL environment variable is not set. Prisma client cannot be initialized.");
  }

  // Instantiate PrismaClient with the explicit datasource URL.
  // This ensures the client instance is aware of the correct URL from the start.
  const client = new PrismaClient({
    datasources: {
      db: {
        url: databaseUrl, // Use the runtime DATABASE_URL for this instance
      },
    },
  });

  // Conditionally apply Accelerate based on the DATABASE_URL format
  if (databaseUrl.startsWith("prisma://")) {
    return client.$extends(withAccelerate());
  } else {
    return client; // This is an OriginalPrismaClient instance, correctly configured.
  }
};

declare global {
  var prismaGlobalInstance: PrismaClientVariant | undefined;
}

// Ensure 'instance' is correctly typed before assigning to prisma or globalThis.prismaGlobalInstance
const instance: PrismaClientVariant = globalThis.prismaGlobalInstance ?? prismaClientSingleton();

// Export the correctly typed instance. No casting is needed.
const prisma = instance;

export default prisma;

if (process.env.NODE_ENV !== "production") {
  // Assign the correctly typed instance to the global cache
  globalThis.prismaGlobalInstance = instance;
}