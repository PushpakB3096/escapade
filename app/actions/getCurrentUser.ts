import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import prisma from '@/app/libs/primsadb';
import { Session } from 'next-auth';

export async function getSession(): Promise<Session | null> {
  return await getServerSession(authOptions);
}

export default async function getCurrentUser() {
  try {
    const session = await getSession();

    const email = session?.user?.email;

    if (!email) return null;

    const currentUser = await prisma.user.findUnique({
      where: {
        email
      }
    });

    if (!currentUser) return null;

    return currentUser;
  } catch (error) {
    return null;
  }
}
