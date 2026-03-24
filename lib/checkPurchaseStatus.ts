import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function checkUserPurchaseStatus(email: string): Promise<boolean> {
  const user = await prisma.user.findUnique({
    where: { email },
    select: { plan: true },
  })

  return user?.plan === 'paid'
}
