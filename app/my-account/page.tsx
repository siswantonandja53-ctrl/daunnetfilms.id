import ProfilePage from './ProfileClient';
import { getOrCreateUser } from "@/lib/auth";
// import { getAddress } from '@/lib/getAddress';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { db } from '@/db';
import { eq } from 'drizzle-orm'; // Import the eq function from Drizzle ORM
import { users } from '@/db/schema'; // Import your Drizzle ORM schema

async function Profile() {
    const user = await getOrCreateUser(); // Await the result of getUser

    if (!user) {
        return <div>Error: User not found</div>;
    }

    const email = user.email;

    if (!email) {
        return <div>Error: Email address not found</div>;
    }

    const customer = await db.select().from(users).where(eq(users.email, email)).execute();

    if (!customer.length) {
        return <div>Error: Customer not found</div>;
    }



    return (
        <Suspense fallback={<Skeleton className="h-10 w-full" />}>
            <ProfilePage userData={user}  />
        </Suspense>
    );
}

export default Profile;