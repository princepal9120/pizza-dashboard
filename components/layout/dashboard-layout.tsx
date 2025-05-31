import { ReactNode } from 'react';
import { Sidebar } from './sidebar';
import { Header } from './header';

interface DashboardLayoutProps {
    children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <div className="flex flex-1 flex-col lg:flex-row">
                <Sidebar />
                <main className="flex-1 lg:ml-64">
                    <div className="container py-6 px-4 md:px-6 lg:px-8">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}