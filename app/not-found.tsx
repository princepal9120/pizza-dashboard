import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
    return (
        <div className="flex h-screen flex-col items-center justify-center">
            <div className="space-y-4 text-center">
                <h1 className="text-6xl font-bold">404</h1>
                <h2 className="text-2xl font-semibold">Page Not Found</h2>
                <p className="text-muted-foreground">
                    We couldn't find the page you were looking for.
                </p>
                <Button asChild>
                    <Link href="/dashboard">Return to Dashboard</Link>
                </Button>
            </div>
        </div>
    );
}