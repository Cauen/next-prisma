import { PrismaClient } from '@prisma/client'

declare global {
  namespace NodeJS {
    interface Global {
      prisma: PrismaClient;
    }
  }
}

let prisma: PrismaClient

console.log({ globalPrisma: global.prisma })
global.prisma = global.prisma || new PrismaClient()
prisma = global.prisma
export { prisma }