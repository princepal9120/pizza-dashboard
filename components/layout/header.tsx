'use client';

import { signOut, useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/mode-toggle';
import { useToast } from '@/hooks/use-toast';
import { LogoutIcon } from '@/components/icons';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function Header() {
    const { data: session } = useSession();
    const { toast } = useToast();

    const handleSignOut = async () => {
        try {
            await signOut({ callbackUrl: '/login' });
        } catch (error) {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'Failed to sign out. Please try again.',
            });
        }
    };

    const userInitials = session?.user?.name
        ? session.user.name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase()
        : '?';

    return (
        <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
            <div className="container flex h-14 items-center">
                <div className="lg:hidden mr-2">
                    {/* Mobile menu button would go here */}
                </div>
                <div className="flex flex-1 items-center justify-between">
                    <div className="lg:hidden flex items-center text-sm font-medium">
                        Pizza Dashboard
                    </div>
                    <nav className="flex flex-1 items-center justify-end space-x-4">
                        <ModeToggle />
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src={session?.user?.image || ''} alt={session?.user?.name || 'User'} />
                                        <AvatarFallback>{userInitials}</AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" forceMount>
                                <div className="flex items-center justify-start gap-2 p-2">
                                    <div className="flex flex-col space-y-1 leading-none">
                                        {session?.user?.name && (
                                            <p className="font-medium">{session.user.name}</p>
                                        )}
                                        {session?.user?.email && (
                                            <p className="w-[200px] truncate text-sm text-muted-foreground">
                                                {session.user.email}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    onClick={handleSignOut}
                                    className="text-destructive cursor-pointer"
                                >
                                    <LogoutIcon className="mr-2 h-4 w-4" />
                                    <span>Log out</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </nav>
                </div>
            </div>
        </header>
    );
}