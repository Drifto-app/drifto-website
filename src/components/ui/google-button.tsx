import { useEffect, useRef, useState } from "react";
import {CredentialResponse, GoogleLogin} from "@react-oauth/google";
import {showTopToast} from "@/components/toast/toast-util";

interface GoogleButtonProps {
    onSuccess: (credentialResponse: CredentialResponse) => Promise<void>;
}

export default function GoogleButton({onSuccess}: GoogleButtonProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [width, setWidth] = useState(0);

    useEffect(() => {
        function handleResize() {
            if (containerRef.current) {
                setWidth(containerRef.current.offsetWidth);
            }
        }
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div ref={containerRef} className="w-full flex justify-center items-center">
            {width > 0 && (
                <GoogleLogin
                    onSuccess={onSuccess}
                    onError={() => showTopToast("error", 'Google Auth failed')}
                    useOneTap={false}
                    theme="outline"
                    width={width}
                    size="large"
                    text="continue_with"
                    shape="rectangular"
                    logo_alignment="center"
                />
            )}
        </div>
    );
}