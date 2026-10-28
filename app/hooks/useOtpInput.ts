"use client";

import { useRef, useState } from "react";

export default function useOtpInput() {
    const [otp, setOtp] = useState<string[]>(Array(length).fill(''));
    const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

    const handleChange = (index: number, value: string) => {
        const digit = value.replace(/\D/g, "").slice(-1);
        const newOtp = [...otp];
        newOtp[index] = digit;
        setOtp(newOtp);
        if(digit && index < length - 1){
            otpRefs.current[index + 1]?.focus();
        }
    }

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === "Backspace" && !otp[index] && index > 0){
            otpRefs.current[index - 1]?.focus();
        }
    }

    return { otp, otpRefs, handleChange, handleKeyDown, otpValue: otp.join('') };
}