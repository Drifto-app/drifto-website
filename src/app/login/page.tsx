import { Loader } from '@/components/ui/loader';
import { Suspense } from 'react';
import LoginPage from '@/components/auth/auth-page';

export default function AuthPage() {

    return (
      <Suspense fallback={
          <div className="w-full h-screen flex items-center justify-center">
              <Loader />
          </div>
      }>
          <LoginPage />
      </Suspense>
    )
}