
'use client';

import { useOrderStore } from '@/store/useOrderStore';
import { formatDistance } from 'date-fns';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/orders/status-badge';

export function RecentOrders() {
    const filteredOrders = useOrderStore((state) => state.filteredOrders);

    // Get only the 5 most recent orders
    const recentOrders = [...filteredOrders()]
        .sort((a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime())
        .slice(0, 5);

    return (
        <div className="space-y-4">
            <div className="overflow-x-auto rounded-lg border">
                <table className="w-full">
                    <thead>
                        <tr className="bg-muted/50">
                            <th className="px-4 py-3 text-left text-sm font-medium">Order ID</th>
                            <th className="px-4 py-3 text-left text-sm font-medium">Customer</th>
                            <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
                            <th className="px-4 py-3 text-left text-sm font-medium">Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recentOrders.map((order) => (
                            <tr key={order.id} className="border-t transition-colors hover:bg-muted/50">
                                <td className="px-4 py-3 text-sm">{order.id}</td>
                                <td className="px-4 py-3 text-sm">{order.customerName}</td>
                                <td className="px-4 py-3 text-sm">
                                    <StatusBadge status={order.status} />
                                </td>
                                <td className="px-4 py-3 text-sm">
                                    {formatDistance(new Date(order.orderDate), new Date(), {
                                        addSuffix: true
                                    })}
                                </td>
                            </tr>
                        ))}
                        {recentOrders.length === 0 && (
                            <tr>
                                <td colSpan={4} className="px-4 py-3 text-center text-sm text-muted-foreground">
                                    No recent orders found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-end">
                <Button variant="outline" size="sm" asChild>
                    <Link href="/orders">View all orders</Link>
                </Button>
            </div>
        </div>
    );
}