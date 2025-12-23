import { PrismaClient } from '@prisma/client'

/**
 * Единый экземпляр Prisma
 * Используется во всех репозиториях
 */

const prisma = new PrismaClient();

console.log('[PRISMA] PrismaClient инициализирован');

export default prisma;