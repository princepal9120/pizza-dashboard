import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DashboardStats } from '@/components/dashboard/dashboard-stats';
import { RecentOrders } from '@/components/dashboard/recent-orders';

export default async function DashboardPage() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect('/login');
    }

    return (
        <DashboardLayout>
            <div className="space-y-4 md:space-y-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                    <p className="text-muted-foreground">
                        Hello, {session.user?.name || 'User'}! Welcome to your pizza dashboard.
                    </p>
                </div>

                <DashboardStats />

                <Card>
                    <CardHeader>
                        <CardTitle>Recent Orders</CardTitle>
                        <CardDescription>
                            Your most recent pizza orders
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <RecentOrders />
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
}