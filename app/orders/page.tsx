import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { OrdersTable } from '@/components/orders/orders-table';

export default async function OrdersPage() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect('/login');
    }

    return (
        <DashboardLayout>
            <div className="space-y-4 md:space-y-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Pizza Orders</h1>
                    <p className="text-muted-foreground">
                        View and manage your pizza orders
                    </p>
                </div>

                <OrdersTable />
            </div>
        </DashboardLayout>
    );
}