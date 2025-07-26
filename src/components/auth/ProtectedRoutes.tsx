'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {useAuthStore} from '@/store/auth-store';
import {Loader} from "@/components/ui/loader";

interface ProtectedRouteProps {
    children: React.ReactNode;
    redirectTo?: string;
}

export function ProtectedRoute({ children, redirectTo = '/login' }: ProtectedRouteProps) {
    const { isAuthenticated, isLoading } = useAuthStore();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.push(redirectTo);
        }
    }, [isAuthenticated, isLoading, router, redirectTo]);

    if (isLoading) {
        return (
            <Loader className="h-8 w-8"/>
        );
    }

    if (!isAuthenticated) {
        return null;
    }

    return <>{children}</>;
}