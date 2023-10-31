// @ts-check
import { PrismaClient } from "@prisma/client"

//how to config single instance for Prisma client in nextJS
const globalForPrisma = global;

const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["query"],
  });

if (process.env.NODE_ENV === "development") {
  globalForPrisma.prisma = prisma;
}


export default prisma;