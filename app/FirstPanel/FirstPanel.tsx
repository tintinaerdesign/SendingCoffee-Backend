"use client";

import type { Language } from '@/app/page';
import { FaApple, FaAndroid } from 'react-icons/fa6';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import RegisterModal from '../components/auth/RegisterModal';

interface Props {
    lang: Language;
    onClose: () => void;
}

export default function FirstPanel({lang, onClose}: Props ) {
    const [isOpenModal, setIsOpenModal] = useState(false);

    return(
        <>
        <section className="min-h-screen relative bg-black">
                <Image
                    src="/assets/BitcoinMember.png"
                    alt="background"
                    fill
                    quality={100}
                    className="object-cover"
                />
            <div className="pt-30 md:pt-40 px-6 md:pl-20 max-w-4xl">
                <div className="relative w-100 h-44">
                    <Image
                        src="/assets/Logo.png"
                        alt="header"
                        fill
                        className="object-contain object-left"
                    />
                </div>
                <div className="relative w-11/12 md:w-8/12 pl-3 ">
                    <h3 className="text-2xl font-lineseed text-white">สะสมแต้ม เมื่อซื้อสินค้าและบริการกับร้านค้าที่เข้าร่วมรายการกับ Bitcoin Member พร้อมรับสิทธิพิเศษมากมาย</h3>
                </div>
                <button type="button" onClick={() => setIsOpenModal(true)}
                    className="relative bg-amber-600 hover:bg-amber-500 cursor-pointer
                        rounded-2xl py-4 px-2 w-full md:w-7/12 flex justify-center mt-6">
                    <p className="font-lineseed text-xl font-black">สมัครสมาชิก</p>
                </button>

                <div className="relative flex items-center w-full md:w-7/12 bg-white/10
                    border border-white/20 rounded-2xl mt-6 text-white overflow-hidden">

                    <div className="flex justify-center gap-2 py-2 cursor-pointer w-full h-full hover:bg-white/30">
                        <button type="button">
                            <FaApple size={26} color="#fff" />
                        </button>
                        <p>iOS</p>
                    </div>

                    <div className="relative z-10 w-0.5 h-8 bg-white/30"></div>

                    <div className="flex w-full h-full justify-center py-2 gap-2 cursor-pointer hover:bg-white/30">
                        <button type="button">
                            <FaAndroid size={26} color="#fff" />
                        </button>
                        <p>Android</p>
                    </div>
                </div>
            </div>
        </section>
            {isOpenModal && (
                <RegisterModal
                    lang={lang}
                    onClose={() => setIsOpenModal(false)}
                />
            )}
        </>
    );
}