"use client";

import { Phone } from 'lucide-react';
import { useState } from 'react';
import type { Language } from '@/app/page';
import useOtpInput from "@/app/hooks/useOtpInput";
import e from "express";

interface Props {
    lang: Language;
    onClose: () => void;
};

export default function RegisterModal({ lang, onClose }: Props){
    const [phoneNumber, setPhoneNumber] = useState('');
    const [error, setError] = useState('');
    const handleClose = () => {
        onClose();
    }

    const { otp, otpRefs, handleChange, handleKeyDown, otpValue } = useOtpInput(6);
    const handleTypePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPhoneNumber(e.target.value.replace(/\D/g, "").slice(0, 10));
        if(error) setError(error);
    }

    return(
        <div onClick={() => handleClose()}
            className="fixed z-50 flex items-center justify-center inset-0 bg-black/40 backdrop-blur-xl">
            <div onClick={(e) => e.stopPropagation()}
                className="relative flex flex-col items-center justify-center
                max-w-md mx-auto bg-[#121212] font-lineseed
                border border-white/20 rounded-2xl py-10 px-10">
                <div>
                    <h3 className="text-white text-4xl text-center">สมัครสมาชิก</h3>
                    <p className="text-zinc-400 text-center mt-6">สมัครสมาชิกสำหรับบุคคลทั่วไป หรือ เป็นส่วนหนึ่งการให้บริการกับ Bitcoin Member</p>
                </div>

                <div className="relative flex w-full bg-black/80 rounded-[14px]
                    border border-white/20 mt-10
                    hover:border-amber-600 overflow-hidden px-4 py-2">
                    <Phone size={36} className="text-amber-600" />

                    <input
                        value={phoneNumber}
                        required
                        onChange={handleTypePhone}
                        maxLength={10}
                        type="tel"
                        inputMode="numeric"
                        placeholder="กรอกเบอร์โทรศัพท์ 08x-xxx-xxxx"
                        className="text-white placeholder-zinc-400 w-full pl-4
                            focus:outline-none"
                    />
                </div>

                <div className="flex w-full gap-2 mt-10">
                    <button type="button"
                        className="w-full px-4 py-2 bg-amber-600
                        hover:bg-amber-500 rounded-lg cursor-pointer">
                        <p className="text-black">ยีนยัน</p>
                    </button>
                        <button type="button" onClick={() => onClose()}
                                className="w-full px-4 py-2 bg-zinc-400 hover:bg-zinc-200
                                cursor-pointer rounded-lg">
                            <p className="text-black">ย้อนกลับ</p>
                        </button>
                </div>
            </div>
        </div>
    );
}