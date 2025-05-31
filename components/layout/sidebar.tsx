'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { DashboardIcon, OrdersIcon, PizzaIcon } from '@/components/icons';

const navItems = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: DashboardIcon,
    },
    {
        title: 'Orders',
        href: '/orders',
        icon: OrdersIcon,
    },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="fixed inset-y-0 z-30 hidden w-64 flex-col border-r bg-background lg:flex">
            <div className="flex h-14 items-center border-b px-4 py-2">
                <Link
                    href="/dashboard"
                    className="flex items-center gap-2 font-semibold transition-colors"
                >
                    <PizzaIcon className="h-6 w-6" />
                    <span className="text-lg font-bold">Pizza Dashboard</span>
                </Link>
            </div>
            <div className="flex-1 overflow-auto py-4">
                <nav className="grid items-start px-2 gap-2">
                    {navItems.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <Link
                                key={index}
                                href={item.href}
                                className={cn(
                                    'group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground',
                                    pathname === item.href ? 'bg-accent text-accent-foreground' : 'transparent',
                                )}
                            >
                                <Icon className="h-5 w-5" />
                                <span>{item.title}</span>
                            </Link>
                        );
                    })}
                </nav>
            </div>
        </div>
    );
}