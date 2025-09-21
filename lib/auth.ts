import { currentUser } from '@clerk/nextjs/server';
import { db } from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function getOrCreateUser() {
  const user = await currentUser();
  
  if (!user) {
    return null;
  }

  // Check if user exists in our database
  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.clerkId, user.id))
    .limit(1);

  if (existingUser.length > 0) {
    return existingUser[0];
  }

  // If user doesn't exist, create them (fallback in case webhook failed)
  const newUser = await db
    .insert(users)
    .values({
      clerkId: user.id,
      email: user.emailAddresses[0]?.emailAddress || '',
      firstName: user.firstName || null,
      lastName: user.lastName || null,
      imageUrl: user.imageUrl || null,
    })
    .returning();

  return newUser[0];
}