import { db } from '@/db'; // Import your Drizzle ORM database instance
import { users, payments, courses, enrollments } from '@/db/schema'; // Import your Drizzle ORM schema
import { eq } from 'drizzle-orm'; // Import the eq function from Drizzle ORM
import { currentUser } from '@clerk/nextjs/server';
import DataTable from "../data-table-history";
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from "@/components/ui/separator";

const SkeletonDataTable: React.FC = () => {
  return (
    <div className="space-y-4">
      <Skeleton className="h-10 w-full bg-gray-800" />
      <Skeleton className="h-6 w-3/4 bg-gray-800" />
      <Skeleton className="h-6 w-1/2 bg-gray-800" />
      <Skeleton className="h-6 w-1/4 bg-gray-800" />
    </div>
  );
};

async function getCustomerByEmail(email: string) {
  const customer = await db.select().from(users).where(eq(users.email, email)).execute();
  return customer;
}

async function getCustomerTransactions(userId: number) {
  const transactions = await db.select({
    payment: payments,
    course: courses,
    enrollment: enrollments,
  })
    .from(payments)
    .leftJoin(courses, eq(courses.id, payments.courseId))
    .leftJoin(enrollments, eq(enrollments.courseId, payments.courseId))
    .where(eq(payments.userId, userId))
    .execute();

  return transactions;
}

export default async function HistoryPage() {
  // Get the Backend API User object when you need access to the user's information
  const user = await currentUser();

  // Check if the user and email address are defined
  const email = user?.emailAddresses[0]?.emailAddress;
  if (!email) {
    window.location.reload();
    return <div>Error: Email address not found</div>;
  }

  const customer = await getCustomerByEmail(email);
  console.log(customer, "customer");
  if (!customer.length) {
    window.location.reload();
    return <div>Error: Customer not found</div>;
  }

  const downloadLinks = await getCustomerTransactions(customer[0].id);
  console.log(downloadLinks, "downloadLinks");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const transformedData = downloadLinks.map((link: any) => ({
    id: link.payment.id,
    orderId: link.payment.orderId,
    amount: link.payment.amount,
    status: link.payment.status,
    createdAt: link.payment.createdAt,
    updatedAt: link.payment.updatedAt,
    course: link.course ? {
      id: link.course.id,
      title: link.course.title,
      description: link.course.description,
      price: link.course.price,
    } : null,
    enrollment: link.enrollment ? {
      id: link.enrollment.id,
      enrolledAt: link.enrollment.enrolledAt,
    } : null,
  }));

  console.log(transformedData, "transformedData");

  return (
    <Suspense fallback={<SkeletonDataTable />}>
      <div className="bg-stone-900 min-h-screen py-8 px-4 sm:px-8 text-white">
        <div className="flex flex-col gap-6">
          <div className='flex flex-col gap-2'>
            <div>
              <h3 className="text-lg font-semibold text-white">Transaction History</h3>
              <p className="text-sm text-gray-400">
                Here you can view your transaction history.
              </p>
            </div>
            <Separator className="bg-white/20" />
          </div>
          {transformedData.length > 0 ? (
            <DataTable data={transformedData} />
          ) : (
            <div className="text-center py-8 text-gray-400">No Transactions yet</div>
          )}
        </div>
        <div className="mt-8">
          <p className="text-sm text-gray-400 italic text-center">*** Anda akan dihubungi melalui WhatsApp jika Anda sudah membayar untuk kelas. ***</p>
        </div>
      </div>
    </Suspense>
  );
}