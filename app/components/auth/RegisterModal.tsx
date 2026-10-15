'use client';
import { Language } from '@/app/page';
import {useEffect, useRef, useState} from 'react';
import { Phone, } from 'lucide-react';

type Props = {
    lang: Language;
    onClose: () => void;
}

export default function RegisterModal({lang, onClose }: Props ) {

    const [loading, setLoading] = useState<boolean>(false);
    const [step, setStep] = useState<1 | 2>(1);
    const [userType, setUserType] = useState<'General' | 'Merchant'>('General');
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState('');

    const isReady = phoneNumber.length > 0;

    const { otp, inputRefs, handleKeyDown, handleChange } = useOtpInput(6);
    const handleVerifyOtp = () => {
        const finalOtp = otp.join('');
        if(finalOtp.length < 6){
            return (
                <p className="text-md text-zinc-400">กรุณากรอกรหัส OTP ให้ครบ 6 หลัก</p>
            );
        }
        onClose();
    }

    const handleClose = () => {
        onClose();
    }

    const handleSetPhoneNumber = (value: string) => {
        const numeric = value.replace(/\D/g, "").slice(0,10);
        setPhoneNumber(numeric);
    }

    const handleSubmitError = () => {
        setErrorMessage('');
        if(phoneNumber.length !== 10 || !phoneNumber.startsWith('0')){
            setErrorMessage('กรุณากรอกหมายแลขโทรศัพท์ให้ถูกต้อง');
            return;
        }
        setLoading(true);
        setTimeout(()=> {
            setLoading(false);
            setStep(2);
        },1000);
    }

    // สั่่งให้โฟกัสช่องอินพุตแรก อัติโนมัติ
    useEffect(() => {
        if(step === 2){
            const timer = setTimeout(() =>{
                inputRefs.current[0]?.focus();
            }, 50);
            return () => {
                clearTimeout(timer);
            };
        }

    }, [inputRefs, step])

    return(
        <div
            className="fixed inset-0 z-50 overflow-hidden overscroll-contain
             bg-black/40 py-4 backdrop-blur-md font-lineseed sm:py-6"
            onClick={handleClose}
        >
            <div className="flex min-h-full items-start justify-center sm:items-center">
                {step === 1 && (
                <div className="relative my-auto flex max-w-md max-h-[calc(100dvh-2rem)] flex-col overflow-hidden
                    rounded-[28px] border border-white/20 bg-[#171717] text-white shadow-2xl px-8"
                         onClick={(e) => e.stopPropagation()}
                    >
                    <div className="relative py-10">
                        {/* header */}
                        <div className="flex flex-col gap-4 items-center justify-center">
                            <h3 className="text-3xl leading-tight">
                                    สมัครสมาชิก
                            </h3>
                            <p className="text-zinc-400 leading-tight">
                                    สมัครสมาชิกเพื่อสะสมแต้ม พร้อมรับสิทธิพิเศษ

                            </p>
                        </div>

                            {/* Member or Merchant */}
                        <div className="flex flex-row items-center justify-center mt-6 p-1 h-14
                    w-full bg-black/80 border border-white/20 rounded-[14px] overflow-hidden">
                            <button type="button" onClick={() => setUserType('General')}
                                        className={`flex w-full h-full items-center justify-center overflow-hidden rounded-[14px] 
                                ${userType === 'General' ? 'bg-amber-600' : 'bg-black/80'}`}
                            >
                                    ลงทะเบียนสมาชิก
                            </button>
                            <button type="button" onClick={() => setUserType('Merchant')}
                                        className={`flex w-full h-full items-center justify-center overflow-hidden rounded-[14px]
                            ${userType === 'Merchant' ? 'bg-amber-600' : 'bg-black/80'}`}>
                                    ลงทะเบียนร้านค้า
                            </button>

                        </div>

                        {/* Add Number*/}
                        <div className="relative w-full flex flex-col
                         overflow-hidden mt-6 gap-1">
                            <p>เบอร์โทรศัพท์</p>
                            <div className="flex items-center w-full h-12 rounded-[14px] overflow-hidden
                                            border border-white/20 bg-black/80 px-4 gap-3"
                            >
                                <Phone size={22} className="text-amber-600 shrink-0" />
                                <input type="tel"
                                           value={phoneNumber}
                                           onChange={(e) => {
                                               handleSetPhoneNumber(e.target.value);
                                               if(errorMessage) setErrorMessage('');
                                           }}
                                           placeholder="กรอกเบอร์โทรศัพท์ เช่น 08X-XXX-XXXX"
                                           className="w-full h-full text-white placeholder-gray-400 bg-transparent outline-none"
                                />

                            </div>

                                {errorMessage && (
                                    <p className='text-red-500 fone-lineseed text-sm mt-2'>{errorMessage}</p>
                                )}
                            </div>

                            {/* register BTN */}

                            <button type="button" onClick={() => handleSubmitError()}
                                    disabled={!isReady}
                                className={`flex items-center justify-center w-full py-4 rounded-2xl
                                overflow-hidden mt-14 active:scale-[0.95] duration-300 transition-all
                               
                                ${isReady
                                    ? `${loading? 'bg-amber-100' : 'bg-amber-600 hover:bg-amber-500'}` 
                                    : 'bg-zinc-700 cursor-not-allowed'}`}>
                                <p className={`${loading ? 'text-2xl text-zinc-500' : 'text-2xl text-black'}`}>{loading ? 'กำลังส่งรหัส ...' : 'สมัครสมาชิก'}</p>
                            </button>

                            <p className="text-zinc-400 text-sm mt-4 text-center">หากสมัครสมาชิกแล้ว ถือว่าได้ตกลงตามกฎระเบียบของทางผู้ให้บริการทุกประการ</p>
                        </div>
                    </div>
            )}

            {/*  Step 2 หน้ากรอกเบอร์ OTP  */}
            {step === 2 && (
                <div className="relative flex flex-col my-auto w-full max-w-md max-h-[calc(100vh-2rem)]
                    overflow-hidden bg-[#171717] border border-white/20 rounded-2xl p-10"
                onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex flex-col items-center justify-center w-full gap-4">
                        <h3 className="whitespace-nowrap font-lineseed text-3xl text-white">ยืนยันรหัส OTP</h3>
                        <p className="text-sm text-zinc-300">
                            รหัสถูกส่งไปยังเบอร์<span> {phoneNumber} </span>
                            เรียบร้อยแล้ว
                        </p>
                    </div>
                    {/* พื้นที่สำหรับกรอกหรัส OTP */}
                    <div className="flex gap-2 justify-center mt-6">
                        {otp.map((digit, index) => (
                            <input
                                value={digit}
                                key={index}
                                ref={(el) => {inputRefs.current[index] = el;}}
                                type="text"
                                inputMode="numeric"
                                maxLength={1}
                                onChange={(e) => handleChange(e.target.value, index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                className="h-14 w-14 border border-white/20 bg-black/80 text-2xl
                                rounded-xl text-amber-500 text-center"
                            />
                        ))}
                    </div>

                    {/* ปุ่มย้อนกลับไปแก้ไขเบอร์โทร */}
                    <button type="button" onClick={() => setStep(1)}
                        className="flex w-full rounded-[14px] bg-zinc-700 vitems-center
                        cursor-pointer hover:bg-zinc-500 justify-center py-4 mt-6"
                    >
                        <p className="text-xl text-white font-lineseed">ย้อนกลับ</p>
                    </button>
                </div>

            )}
            </div>
        </div>
    );
}

{/* Hooks ของช่องกรอก OTP */}
export function useOtpInput(length: number = 6){
    const [otp, setOtp] = useState<string[]>(Array(length).fill(''));
    const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

    const handleChange = (value:string, index: number) => {

        const numeric = value.replace(/\D/g, ""); //string ที่เข้ามาจะเป็นได้แค่ตัวเลข หรือไม่ก็ string ว่างเท่านั้น
        const firstEmptyIndex = otp.findIndex((val) => val === '');

        if(firstEmptyIndex !== -1 && index > firstEmptyIndex){
            inputRefs.current[firstEmptyIndex]?.focus();
            return;
        }
        if(!numeric){
            const next = [...otp];
            next[index] = "";
            setOtp(next);
            return;
        }
        const next = [...otp]; // สร้าง input ฉบับสำเนาขึ้นมา
        next[index] = numeric.slice(-1);
        setOtp(next);

        if(index < length - 1){
            inputRefs.current[index + 1]?.focus(); // focus ที่ช่องถัดไปอัติโนมัติ
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if(e.key === 'Backspace' && !otp[index] && index > 0){
            inputRefs.current[index - 1]?.focus();
        }
    }

    return { otp, inputRefs, handleChange, handleKeyDown };
}