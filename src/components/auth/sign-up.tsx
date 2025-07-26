import * as React from "react";
import {cn} from "@/lib/utils";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {LoaderSmall} from "@/components/ui/loader";
import {toast} from "react-toastify";
import {api} from "@/components/axios";
import {InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot} from "@/components/ui/input-otp";
import {REGEXP_ONLY_DIGITS} from "input-otp";
import {useEffect, useState} from "react";
import {GoogleLogin} from "@react-oauth/google";
import {useAuthStore} from "@/store/auth-store";
import {useRouter} from "next/navigation";
import {FaEye, FaEyeSlash} from "react-icons/fa";
import {Calendar28} from "@/components/ui/date-input";

interface SignUpFormProps extends React.ComponentProps<"form"> {
}

export const SignUpForm = ({
    className,
    ...props
}: SignUpFormProps) => {
    const { googleLogin } = useAuthStore();
    const router = useRouter();

    const [isLoading, setLoading] = React.useState<boolean>(false);
    const [emailOtp, setEmailOtp] = React.useState<boolean>(false);
    const [isRegister, setIsRegister] = React.useState<boolean>(true);
    const [otpValue, setOtpValue] = React.useState<string>("");
    const [isResendVisible, setIsResendVisible] = useState(false);
    const [isPasswordShow, setIsPasswordShow] = useState<boolean>(false)

    const [email, setEmail] = React.useState<string>("");
    const [username, setUsername] = React.useState<string>("");
    const [firstName, setFirstName] = React.useState<string>("");
    const [lastName, setLastName] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");
    const [dob, setDob] = React.useState<Date>(new Date(Date.now()));
    const [city, setCity] = React.useState<string>("");
    const [isAgreed, setIsAgreed] = React.useState<boolean>(false);

    const delay: number = 5000

    useEffect(() => {
        if (!emailOtp || isResendVisible) return;

        const timer = setTimeout(() => {
            setIsResendVisible(true);
        }, delay);
        return () => clearTimeout(timer);

    }, [emailOtp, isResendVisible, delay]);

    useEffect(() => {
        if (!emailOtp) return;

        setIsResendVisible(false)

        if (otpValue.length === 6) {
            submitOtp();
        }
    }, [otpValue, emailOtp]);

    const handleResendOtp = async () => {
        setLoading(true);
        setIsResendVisible(false);

        try {
            const response = await api.post("/auth/register/email", {
                email,
            })

            setLoading(false);
            toast.success(response.data.message);
        }catch (err) {
            setLoading(false);
            toast.error(err.response?.data?.description || 'Email Request Failed');
        }
    }

    const handleShowPassword = () => {
        setIsPasswordShow(!isPasswordShow)
    }

    const handleEmailRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await api.post("/auth/register/email", {
                email,
            })

            setLoading(false);
            toast.success(response.data.message);
            setEmailOtp(true);
        }catch (err) {
            setLoading(false);
            toast.error(err.response?.data?.description || 'Email Request Failed');
        }
    }

    const submitOtp = async () => {
        setLoading(true);

        try {
            const response = await api.post("/auth/verify/email", {
                email, token: otpValue,
            })

            setLoading(false);
            toast.success(response.data.message);
            setEmailOtp(false);
            setOtpValue("");
            setIsRegister(true)
        }catch (err) {
            setLoading(false);
            toast.error(err.response?.data?.description || 'Email Request Failed');
            setOtpValue("");
        }
    }

    const handleOtpVerify = async (e: React.FormEvent) => {
        e.preventDefault();
        await submitOtp();
    }

    if (emailOtp) {
        return (
            <form className={cn("flex flex-col gap-6", className)} onSubmit={handleOtpVerify} {...props}>
                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl font-extrabold">Create Account</h1>
                    <p className="text-muted-foreground text-base text-balance">
                        Enter your OTP to continue
                    </p>
                </div>
                <div className="grid gap-4 justify-center">
                    <InputOTP
                        maxLength={6}
                        pattern={REGEXP_ONLY_DIGITS}
                        value={otpValue}
                        onChange={(value) => setOtpValue(value)}
                    >
                        <InputOTPGroup>
                            <InputOTPSlot index={0} />
                        </InputOTPGroup>
                        <InputOTPGroup>
                            <InputOTPSlot index={1} />
                        </InputOTPGroup>
                        <InputOTPGroup>
                            <InputOTPSlot index={2} />
                        </InputOTPGroup>
                        <InputOTPGroup>
                            <InputOTPSlot index={3} />
                        </InputOTPGroup>
                        <InputOTPGroup>
                            <InputOTPSlot index={4} />
                        </InputOTPGroup>
                        <InputOTPGroup>
                            <InputOTPSlot index={5} />
                        </InputOTPGroup>
                    </InputOTP>
                    <div className="text-center text-sm">
                        Enter your one-time password.
                    </div>
                </div>
                <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    disabled={isLoading}
                >
                    {!isLoading ? "Submit" : <LoaderSmall className=""/>}
                </Button>
                <div className="flex flex-row gap-2 justify-center text-sm">
                    <p className="text-neutral-500">OTP not received?</p>
                    {
                        isResendVisible
                            ? <div className="hover:underline cursor-pointer" onClick={handleResendOtp}>Resend</div>
                            : <div className="text-neutral-400">Resend</div>
                    }
                </div>
            </form>
        )
    }

    if(isRegister) {
        return (
            <form className={cn("flex flex-col gap-6", className)} onSubmit={handleOtpVerify} {...props}>
                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl font-extrabold">Create Account</h1>
                    <p className="text-muted-foreground text-base text-balance">
                        Create an accoount with your info.
                    </p>
                </div>
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="principal">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder={email}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled
                            required
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="fname">First Name</Label>
                        <Input
                            id="fname"
                            type="text"
                            placeholder="First Name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="lnane">Last Name</Label>
                        <Input
                            id="lnane"
                            type="text"
                            placeholder="Last Name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="username">Username</Label>
                        <Input
                            id="username"
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <div className="flex flex-row justify-start items-center border rounded-md">
                            <Input
                                id="password"
                                type={isPasswordShow ? 'text' : 'password'}
                                value={password}
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full border-none"/>
                            <div className="px-2 cursor-pointer" onClick={handleShowPassword}>
                                {isPasswordShow
                                    ?<FaEyeSlash />
                                    : <FaEye />}
                            </div>
                        </div>
                    </div>
                    <Calendar28 date={dob} setDate={setDob} />
                    <div className="grid gap-2">
                        <Label htmlFor="username">City</Label>
                        <Input
                            id="city"
                            type="text"
                            placeholder="City"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            required
                        />
                    </div>
                    <div className="w-full flex flex-row items-center gap-2">
                        <input
                            id="isAgreed"
                            type="checkbox"
                            checked={isAgreed}
                            onChange={(e) => setIsAgreed(e.target.checked)}
                            required
                            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <label htmlFor="isAgreed" className="text-sm">
                            Agree to{' '}
                            <a href="#" className="text-blue-600 hover:underline">
                                terms and conditions
                            </a>
                        </label>
                    </div>
                </div>
            </form>
        )
    }

    return(
        <form className={cn("flex flex-col gap-6", className)} onSubmit={handleEmailRegister} {...props}>
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-extrabold">Create Account</h1>
                <p className="text-muted-foreground text-base text-balance">
                    Enter your email for verification
                </p>
            </div>
            <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={isLoading}
            >
                {!isLoading ? "Submit" : <LoaderSmall className=""/>}
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

                            router.push("/");
                        } catch (err) {
                            toast.error(err.response?.data?.description || 'Google Auth failed');
                        }
                    }}
                    onError={() => {
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
        </form>
    )
}