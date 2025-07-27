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
    const { isAuthenticated, isLoading, hasTriedRefresh } = useAuthStore();
    const router = useRouter();

    useEffect(() => {
        if (hasTriedRefresh && !isLoading && !isAuthenticated) {
            router.push(redirectTo);
        }
    }, [isAuthenticated, isLoading, router, redirectTo, hasTriedRefresh]);

    if (isLoading) {
        return (
           <div className="w-full h-screen flex flex-col items-center justify-center">
               <Loader className="h-10 w-10"/>
           </div>
        );
    }

    if (!isAuthenticated) {
        return null;
    }

    return <>{children}</>;
}