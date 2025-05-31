import { Metadata } from 'next';
import { LoginForm } from '@/components/login-form';

export const metadata: Metadata = {
    title: 'Login | Pizza Dashboard',
    description: 'Login to access your pizza dashboard',
};

export default function LoginPage() {
    return (
        <div className="flex h-screen w-full items-center justify-center bg-gradient-to-br from-background to-secondary/20">
            <div className="w-full max-w-md p-8">
                <LoginForm />
            </div>
        </div>
    );
}