"use client";

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {useState} from "react";
import {FaEye, FaEyeSlash} from "react-icons/fa";
import {useAuthStore} from "@/store/auth-store";
import {useRouter} from "next/navigation";
import {LoaderSmall} from "@/components/ui/loader";
import {toast} from "react-toastify";
import * as React from "react";
import {emailRegex} from "@/lib/utils";
import {GoogleLogin} from "@react-oauth/google";

interface LoginFormProps extends React.ComponentProps<"form"> {
  setLoginPrincipal: (value: string) => void;
  setForgotPassword: (val: boolean) => void;
  setIsSignUp: (val: boolean) => void;
}

export function LoginForm({
    className,
    setLoginPrincipal,
    setForgotPassword,
    setIsSignUp,
    ...props
}: LoginFormProps) {
  const { login, googleLogin, isLoading } = useAuthStore();
  const router = useRouter();

  const [isPasswordShow, setIsPasswordShow] = useState<boolean>(false)
  const [principal, setPrincipal] = useState<string>("");
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleShowPassword = () => {
    setIsPasswordShow(!isPasswordShow)
  }

  const handlePrincipalChange= (data: string) => {
    setPrincipal(data);
    setLoginPrincipal(data)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      if(emailRegex.test(principal)) {
        await login({ email: principal, password });
      }else {
        await login({ username: principal, password });
      }

      router.push('/');
    } catch (err: any) {
      setError(err.response?.data?.description || 'Login failed');
      toast.error(err.response?.data?.description || 'Login failed');
    }
  };

  return (
      <form className={cn("flex flex-col gap-6", className)} onSubmit={handleSubmit} {...props}>
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-extrabold">Login</h1>
          <p className="text-muted-foreground text-base text-balance">
            Enter your email & password below to login
          </p>
        </div>
        <div className="grid gap-6">
          <div className="grid gap-2">
            <Label htmlFor="email">Email or Username</Label>
            <Input
                id="email"
                type="text"
                placeholder="Email or Username"
                value={principal}
                onChange={(e) => handlePrincipalChange(e.target.value)}
                required
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <span
                  onClick={() => setForgotPassword(true)}
                  className="ml-auto text-sm hover:underline cursor-pointer"
              >
                Forgot your password?
              </span>
            </div>
            <div className="flex flex-row justify-start items-center border rounded-md">
              <Input
                  id="password"
                  type={isPasswordShow ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full border-none shadow-none"/>
              <div className="px-2 cursor-pointer" onClick={handleShowPassword}>
                {isPasswordShow
                    ?<FaEyeSlash />
                    : <FaEye />}
              </div>
            </div>
          </div>
          <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
            {!isLoading ? "Login" : <LoaderSmall className=""/>}
          </Button>
          <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
              <span className="bg-background text-muted-foreground relative z-10 px-2">
                Or
              </span>
          </div>
          <div>
            <GoogleLogin
                onSuccess={async (credentialResponse) => {
                  try {
                    const idToken = credentialResponse.credential;
                    await googleLogin(idToken!);
                  } catch (err: any) {
                    setError(err.response?.data?.description || 'Google Auth failed');
                    toast.error(err.response?.data?.description || 'Google Auth failed');
                  }
                }}
                onError={() => {
                  setError('Google Auth failed');
                  toast.error('Google Auth failed');
                }}
                useOneTap={false}
                theme="outline"
                width="100%"
                size="large"
                text="continue_with"
                shape="rectangular"
                logo_alignment="center"
            />
          </div>
        </div>
        <div className="text-center text-sm flex flex-row justify-center gap-2">
          Don&apos;t have an account?{" "}
          <p onClick={() => setIsSignUp(true)} className="hover:underline cursor-pointer">
            Sign up
          </p>
        </div>
      </form>
  )
}
