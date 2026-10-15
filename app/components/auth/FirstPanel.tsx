'use client';

import Image from 'next/image';
import { FaApple, FaAndroid } from 'react-icons/fa6';
import { useState } from 'react';
import { Language } from "@/app/page";
import RegisterModal from "@/app/components/auth/RegisterModal";

type Language = 'th' | 'en';

type Props = {
    lang: Language;
};

const content = {
  th:{
      title: 'เข้าร่วมรายการกับ Bitcoin Member รับสิทธิพิเศษมากมาย เมื่อชำระสินค้ากับร้านค้าที่เข้าร่วมรายการ',
      register: 'สมัครสมาชิก',
  },
  en:{
    title: 'Join with the Bitcoin Member and get more benefits when purchasing with the merchants included',
    register: 'register now',
  },
};

export default function FirstPanel({ lang }: Props){
    const [isOpenModal, setIsOpenModal] = useState(false);

    const t= content[lang];
    return (
        <section className="relative min-h-screen">
            {/* Background */}
            <Image
                src="/assets/BitcoinMember.png"
                alt="Panel Background"
                fill
                priority
                quality={100}
                className="object-cover"
            />

            {/* Overlay z-10 */}
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/85 via-black/15 to-transparent"
            />

            <div className="relative max-w-4xl pt-36 md:pt-46 px-12 md:px-36">

            {/* content */}
            <div className="relative z-30">
                <div className="relative w-80 md:w-120 h-36 md:h-46 shrink-0">
                    <Image
                    src="/assets/Logo.png"
                    alt="logo"
                    fill
                    priority
                    className="object-contain"

                    />

                </div>

                <div className="pl-2">
                    <h2 className="text-2xl text-white font-lineseed">
                        {t.title}
                    </h2>
                </div>

                <div className="relative w-full">
                <button type="button"
                        className="w-full sm:w-9/12 cursor-pointer rounded-2xl bg-amber-500 py-4 mt-6
                        transition-all duration-300 hover:bg-amber-400
                        hover:shadow-lg hover:shadow-amber-500/20 active:scale-[0.98]"
                    onClick={() => setIsOpenModal(true)}>
                    <p className="font-lineseed text-black font-bold text-xl ">{t.register}</p>
                </button>
                </div>

                {/* Split Button */}
                <div className="relative flex mt-6 w-full sm:w-9/12 rounded-2xl overflow-hidden border border-white/20 bg-white/5">
                    <a href="#" className="flex flex-row w-full items-center justify-center py-1 text-white gap-3 hover:bg-white/30">
                        <FaApple size={26} />
                            <span className="font-lineseed">iOS</span>
                    </a>
                    <div className="relative h-12 w-[1px] bg-white/20" />
                    <a href="#" className="flex flex-row w-full items-center justify-center py-1 text-white gap-3 hover:bg-white/30">
                        <FaAndroid  size={26} />
                            <span className="font-lineseed">android</span>
                    </a>
                </div>

            </div>

            </div>
            {isOpenModal && (
                <RegisterModal
                    lang={lang}
                    onClose={() => setIsOpenModal(false)}
                />
            )}
        </section>
    );
}