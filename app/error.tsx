'use client';

import { Button } from '@/components/ui/button';
import { useEffect } from 'react';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <div className="flex h-screen flex-col items-center justify-center">
            <div className="space-y-4 text-center">
                <h1 className="text-4xl font-bold">Something went wrong!</h1>
                <p className="text-lg text-muted-foreground">
                    We apologize for the inconvenience. Please try again.
                </p>
                <Button onClick={() => reset()}>Try again</Button>
            </div>
        </div>
    );
}