'use client';

import { LoginForm } from "@/components/auth/login-form"
import {useAuthStore} from "@/store/auth-store";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import Image from "next/image";
import {ForgotPassword} from "@/components/auth/forgot-password";
import { SignUpForm } from "@/components/auth/sign-up";

export const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function LoginPage() {
    const { isAuthenticated } = useAuthStore();
    const router = useRouter();

    const [loginPrincipal, setLoginPrincipal] = useState<string>("");
    const [isForgotPassword, setForgotPassword] = useState<boolean>(false);
    const [isSignUp, setIsSignUp] = useState<boolean>(false);

    const handleIsSignUp = (value: boolean) => {
        if (value) {
            setForgotPassword(false);
        }

        setIsSignUp(value);
    }

    const handleIsForgotPassword = (value: boolean) => {
        if (value) {
            setIsSignUp(false);
        }

        setForgotPassword(value);
    }

    useEffect(() => {
        if (isAuthenticated) {
            router.push('/');
        }
    }, [isAuthenticated, router]);

    if (isAuthenticated) {
        return null;
    }

    if(isForgotPassword){
        return (
            <div className="grid min-h-svh lg:grid-cols-2">
                <div className="flex flex-col gap-4 p-6 md:p-10">
                    <div className="flex flex-1 items-center justify-center">
                        <div className="w-full max-w-sm flex flex-col gap-12">
                            <div className="relative w-12 h-12">
                                <Image
                                    src="/logo.png"
                                    alt="Logo Extend"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <ForgotPassword loginPrincipal={loginPrincipal} setForgotPassword={setForgotPassword} />
                        </div>
                    </div>
                </div>
                <div className="bg-muted relative hidden lg:block">
                    <img
                        src="/login-side-pic.jpeg"
                        alt="Image"
                        className="absolute inset-0 h-full w-full object-cover"
                    />
                </div>
            </div>
        )
    }


    if(isSignUp) {
        return (
            <div className="grid min-h-svh lg:grid-cols-2">
                <div className="flex flex-col gap-4 p-6 md:p-10">
                    <div className="flex flex-1 items-center justify-center">
                        <div className="w-full max-w-sm flex flex-col gap-12">
                            <SignUpForm />
                        </div>
                    </div>
                </div>
                <div className="bg-muted relative hidden lg:block">
                    <img
                        src="/login-side-pic.jpeg"
                        alt="Image"
                        className="absolute inset-0 h-full w-full object-cover"
                    />
                </div>
            </div>
        )
    }

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-sm flex flex-col gap-12">
              <div className="relative w-12 h-12">
                  <Image
                      src="/logo.png"
                      alt="Logo Extend"
                      fill
                      className="object-contain"
                  />
              </div>
            <LoginForm
                setLoginPrincipal={setLoginPrincipal}
                setForgotPassword={handleIsForgotPassword}
                setIsSignUp={handleIsSignUp}
            />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <img
          src="/login-side-pic.jpeg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </div>
  )
}
