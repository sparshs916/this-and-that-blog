import { PrismaClient as OriginalPrismaClient } from "@/generated/prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

const prismaClientSingleton = () => {
  return new OriginalPrismaClient().$extends(withAccelerate());
};

type PrismaClientExtended = ReturnType<typeof prismaClientSingleton>;

declare global {
  // eslint-disable-next-line no-var
  var prismaGlobalInstance: PrismaClientExtended | undefined;
}

const prisma = globalThis.prismaGlobalInstance ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") {
  globalThis.prismaGlobalInstance = prisma;
}