'use client';

import { useEffect, useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Pizza } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function LoginForm() {
    const router = useRouter();
    const { data: session, status } = useSession();
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (status === 'authenticated' && session) {
            router.push('/dashboard');
        }
    }, [session, status, router]);

    const handleGoogleSignIn = async () => {
        try {
            setIsLoading(true);
            await signIn('google', { callbackUrl: '/dashboard' });
        } catch (error) {
            toast({
                variant: 'destructive',
                title: 'Authentication Error',
                description: 'Failed to sign in with Google. Please try again.',
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card className="w-full shadow-lg">
            <CardHeader className="space-y-1">
                <div className="flex items-center justify-center mb-2">
                    <Pizza className="h-10 w-10 text-primary" />
                </div>
                <CardTitle className="text-2xl text-center">Pizza Dashboard</CardTitle>
                <CardDescription className="text-center">
                    Sign in to access your dashboard
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                <Button
                    variant="outline"
                    onClick={handleGoogleSignIn}
                    disabled={isLoading || status === 'loading'}
                    className="w-full"
                >
                    {isLoading ? (
                        <div className="flex items-center gap-2">
                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
                            <span>Signing in...</span>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <svg viewBox="0 0 24 24" width="16" height="16">
                                <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                                    <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z" />
                                    <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z" />
                                    <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z" />
                                    <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z" />
                                </g>
                            </svg>
                            <span>Sign in with Google</span>
                        </div>
                    )}
                </Button>
            </CardContent>
            <CardFooter className="flex flex-col">
                <p className="text-xs text-muted-foreground text-center">
                    By signing in, you agree to our Terms of Service and Privacy Policy.
                </p>
            </CardFooter>
        </Card>
    );
}