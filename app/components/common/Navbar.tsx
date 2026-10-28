"use client"

import { useState, useEffect } from "react";
import Image from "next/image";
import type { Language } from '@/app/page';
import { motion } from 'framer-motion';
import Link from "next/link";

interface Props {
    lang: Language;
    setLang: (lang: Language) => void;
}

export default function Navbar({ lang, setLang }: Props) {
    const [isScrolled, setIsScrolled] = useState<boolean>(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        }
        handleScroll();
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    return(
        <motion.nav     initial={{ opacity: 0, y: -60 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
            className={`fixed z-45 inset-x-0 mx-auto backdrop-blur-2xl bg-black/50 border-amber-500/30 
                        transition-all duration-500 font-lineseed
                        ${isScrolled ? 'w-11/12 top-4 rounded-2xl border'  
                                        : 'w-full border-b'}`}>
            <div className="relative flex mx-auto px-4">
                <div className="relative h-9 w-24 md:h-12 md:w-36 py-10">
                    <Image
                        src="/assets/logo.png"
                        alt="Logo"
                        fill
                        className="object-contain object-left"
                    />
                </div>
                <div className="absolute hidden md:flex items-center justify-center w-full h-full gap-10">
                    <Link href="/FirstPanel"
                    >
                        <p className="text-white text-xl">สมัครสมาชิก</p>
                    </Link>
                    <Link href="/OrderCoffee">
                        <p className="text-white text-xl">ออเดอร์เครื่องดื่ม</p>
                    </Link>
                </div>
            </div>

        </motion.nav>
    );
}
