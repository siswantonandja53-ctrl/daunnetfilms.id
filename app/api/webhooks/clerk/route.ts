import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { WebhookEvent } from '@clerk/nextjs/server';
import { db } from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function POST(req: Request) {
  // Get the headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occurred -- no svix headers', {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.text();

  // Create a new Svix instance with your secret.
  if (!process.env.CLERK_WEBHOOK_SECRET) {
    console.error('Missing CLERK_WEBHOOK_SECRET');
    return new Response('Server misconfiguration', { status: 500 });
  }
  const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(payload, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error occurred', {
      status: 400,
    });
  }

  // Handle the webhook
  const eventType = evt.type;
  // Silently ignore email.* events (user.updated will carry authoritative email state)
  if (eventType.startsWith('email.')) {
    return new Response('Ignored email event', { status: 200 });
  }
  
  try {
    // Helper to pick primary email from Clerk user payload
    const getPrimaryEmail = (e: WebhookEvent) => {
      type EmailAddress = { id: string; email_address: string };
      const data = e.data as {
        primary_email_address_id?: string;
        email_addresses?: EmailAddress[];
      };
      const primaryId = data.primary_email_address_id;
      const emails = data.email_addresses ?? [];
      const primary = primaryId ? emails.find((x) => x.id === primaryId)?.email_address : undefined;
      return primary || emails[0]?.email_address || '';
    };

    switch (eventType) {
      case 'user.created':
        await db.insert(users).values({
          clerkId: evt.data.id,
          email: getPrimaryEmail(evt),
          firstName: evt.data.first_name || null,
          lastName: evt.data.last_name || null,
          imageUrl: evt.data.image_url || null,
        });
        console.log('User created:', evt.data.id);
        break;

      case 'user.updated':
        await db.update(users)
          .set({
            email: getPrimaryEmail(evt),
            firstName: evt.data.first_name || null,
            lastName: evt.data.last_name || null,
            imageUrl: evt.data.image_url || null,
            updatedAt: new Date(),
          })
          .where(eq(users.clerkId, evt.data.id));
        console.log('User updated:', evt.data.id);
        break;

      case 'user.deleted':
        await db.delete(users).where(eq(users.clerkId, evt.data.id || ''));
        console.log('User deleted:', evt.data.id);
        break;

      default:
        if (process.env.NODE_ENV !== 'production') {
          console.log(`Ignored event type: ${eventType}`);
        }
    }

    return new Response('Webhook processed successfully', { status: 200 });
  } catch (error) {
    console.error('Database error:', error);
    return new Response('Database error occurred', { status: 500 });
  }
}