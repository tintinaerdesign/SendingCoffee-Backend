"use client"

import Image from "next/image";
import { Language } from '@/app/page';
import { useState, useRef } from "react";
import { Coffee } from 'lucide-react'

export type Coffee = {
    id: string;
    name: string;
    description?: string;
    image?: any;
}
type Props = {
    lang: Language;
    onClose: () => void;
};

export const coffees: Coffee[] = [
    {
        id: '1',
        name: 'Iced Americano',
        description: "โน่เย็นสักแก้ว บ่ ครับอ้าย",
        image: '/assets/coffee.jpg'
    },
    {
        id: '2',
        name: 'Iced Latte',
        description: "ไม่มีนมโอ้ต.. นะครับ",
        image: '/assets/bead-latte.jpg'
    },
    {
        id: '3',
        name: 'Orange Espresso',
        description: 'น้ำส้มคั้น เคี้ยวหนุบหนับ',
        image: '/assets/OS.jpg'
    },
    {
        id: '4',
        name: 'ชาไทย',
        description: 'มีฟองนมด้วยครับ',
        image: '/assets/Tea.jpg'
    },
    {
        id: '5',
        name: 'Premium Chocolate',
        description: 'Chocolate เจ้มจ้นครับ',
        image: '/assets/Chocolate.jpg'
    },
];

export default function OrderCoffee({ lang }: Props) {
    // 1. แก้ไข Type ให้เป็น Coffee | null (เพราะเลือกทีละแก้ว)
    const [selectedCoffee, setSelectedCoffee] = useState<Coffee | null>(null);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleSelectedProduct = (item: Coffee) => {
        setSelectedCoffee(item);
        setIsOpen(true);
    };

    return(
        <section className="relative min-h-screen bg-[#121212] pb-40 font-lineseed">
            <div className="relative flex flex-col max-w-7xl mx-auto items-center justify-center bg-[#121212] px-12 pt-16 md:pt-24
                overflow-hidden border-white/20 rounded-xl">
                <div className="relative flex items-center justify-center w-[320px] h-[320px]
                    border border-white/20 rounded-2xl overflow-hidden">
                    <Image
                        alt="Bit cartoon"
                        src='/assets/learn-bitcoin-coin.png'
                        fill
                        priority
                        quality={100}
                        className="object-cover"
                    />
                </div>

                <p className="text-3xl text-zinc-200 mt-4 text-center">สั่งกาแฟกับน้องบิตแล้ว "อย่าลืม ออม Bitcoin นะคร้าบ . ."</p>

                <div className="w-full flex flex-col gap-6 mt-6">
                    {coffees.map((item, index) => (
                        <button key={index} onClick={() => handleSelectedProduct(item)}
                                className="relative flex flex-col gap-2 p-6 bg-black/80 border border-white/20
                            rounded-2xl py-2 cursor-pointer hover:bg-[#121212] overflow-hidden">

                            <div className="w-full h-full overflow-hidden">
                                <Image
                                    src={item.image}
                                    alt={item.name}
                                    fill
                                    quality={100}
                                    className="object-cover"
                                />
                            </div>

                            <div className="z-20 absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/20"></div>

                            <div className="h-20 z-30">
                                <h3 className="text-white text-2xl text-start">{item.name}</h3>
                                <p className="text-md text-zinc-400 text-start">{item.description}</p>
                            </div>

                        </button>
                    ))}
                </div>
            </div>

            {isOpen && (
                <ConfirmOrder
                    lang={lang}
                    onClose={() => setIsOpen(false)}
                    coffee={selectedCoffee}
                />
            )}
        </section>
    );
}

type ConfirmOrderProps = {
    lang: Language;
    onClose: () => void;
    coffee: Coffee | null;
};

export type Sweetness ={
    id: string;
    level: string;
};

export const sweetnessList: Sweetness[] = [
    { id: '1', level: 'ไม่หวาน' },
    { id: '2', level: 'หวาน 25%' },
    { id: '3', level: 'หวาน 50%' },
    { id: '4', level: 'หวาน 75%' },
    { id: '5', level: 'หวานปกติ' },
];

export function ConfirmOrder({lang, onClose, coffee }: ConfirmOrderProps) {
    const nameRef = useRef<HTMLInputElement | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [sweetnessIndex, setSweetnessIndex] = useState<number>(0);
    const [nickname, setNickname] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');

    if(!coffee) return null;

    const isReady = nickname.trim() !== '';

    const handleConfirmed = async () => {
        // เช็คว่าถ้ายังไม่กรอกชื่อ ให้แสดง Error แล้วหยุดการทำงาน (ไม่ปิด Modal)
        if (!isReady) {
            setErrorMessage('โปรดระบุชื่อเล่น . . . .');
            return;
        }

        setErrorMessage('');
        const note = inputRef.current?.value || '';
        const currentSweetness = sweetnessList[sweetnessIndex].level;

        // เตรียม Payload ที่จะส่งไปหา backend
        const orderData = {
            name: nickname.trim(),
            menuName: coffee.name,
            sweetness: currentSweetness,
            note: note,
            timestamp: new Date().toISOString()
        };

        try {
            const SERVER_IP = 'localhost' //เปลี่ยน ipconfig ตามข้อมูลจริงภายหลัง
            const PORT = 5000;
            const response = await fetch(`http://${SERVER_IP}:${PORT}/api/orders/printer`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(orderData)
            });
            const result = await response.json();

            if (result.success) {
                alert(`ส่งออเดอร์ของคุณ ${nickname} เรียบร้อยครับ`);
                onClose();
            } else {
                alert('เกิดข้อผิดพลาดในการส่งออเดอร์');
            }
        } catch (error) {
                console.log('ERROR: ');
                alert('ไม่สามารถเชื่อมต่อกับระบบพิมพ์ออเดอร์ได้');
            }

    };

    const handleToggleSweetness = () => {
        setSweetnessIndex((prevIndex) => (prevIndex + 1) % sweetnessList.length);
    };

    const currentSweetness = sweetnessList[sweetnessIndex].level;

    return(
        <div className="z-47 fixed inset-0 backdrop-blur-md bg-black/70 flex items-center justify-center p-4"
             onClick={onClose}>
            <div className="relative max-w-md w-full mx-auto bg-[#121212] border border-white/20 rounded-2xl overflow-hidden shadow-2xl"
                 onClick={(e) => e.stopPropagation()}>

                <button className="z-50 absolute top-5 right-5 rounded-xl
                 border border-black bg-zinc-300/70 hover:bg-white/20 px-4 py-2 transition-all cursor-pointer"
                        onClick={() => onClose()}>
                    <p className="text-black text-md font-bold">ยกเลิก</p>
                </button>

                <div className="relative flex flex-col items-center w-full">
                    {coffee.image && (
                        <>
                            <div className="relative flex flex-col w-full h-60">
                                <Image
                                    src={coffee.image}
                                    alt={coffee.name}
                                    fill
                                    priority
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
                            </div>

                            <div className="z-50 flex flex-col px-6 py-6 gap-3 w-full">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-3xl text-white font-lineseed">{coffee.name}</h3>
                                    <h2 className="text-3xl text-amber-500 font-bold">x1</h2>
                                </div>

                                <div className="flex flex-row items-center gap-3">
                                    <button type="button"
                                            className="w-28 py-2 mb-1 bg-yellow-500 hover:bg-yellow-400 active:scale-[0.95] text-black font-bold rounded-xl transition-all cursor-pointer"
                                            onClick={handleToggleSweetness}>
                                        {currentSweetness}
                                    </button>
                                    <Coffee size={22} color="#E8E8E8" />
                                    <h3 className="text-lg font-lineseed text-zinc-300">เลือกระดับความหวาน</h3>
                                </div>


                                <input
                                    ref={inputRef}
                                    type="text"
                                    placeholder="หมายเหตุเพิ่มเติม..."
                                    className="w-full px-4 py-3 bg-black/60 border border-white/20 rounded-xl text-white outline-none focus:border-amber-500 transition-colors"
                                />

                                <input
                                    type="text"
                                    value={nickname}
                                    onChange={(e) => {
                                        setNickname(e.target.value);
                                        if (e.target.value.trim() !== '') setErrorMessage(''); // พิมพ์แล้วลบ Error ทันที
                                    }}
                                    placeholder="ระบุชื่อเล่น . . "
                                    className={`w-full px-4 py-3 bg-black/60 text-white border rounded-xl outline-none transition-colors ${
                                        nickname.trim() !== '' ? 'border-green-600' : 'border-red-500'
                                    }`}
                                />

                                {errorMessage && (
                                    <p className="text-sm text-red-500 font-lineseed animate-pulse">{errorMessage}</p>
                                )}

                                <button
                                    type="button"
                                    onClick={handleConfirmed}
                                    className="w-full rounded-xl py-3 mt-2 overflow-hidden bg-amber-600 hover:bg-amber-500 active:scale-[0.95] transition-all cursor-pointer"
                                >
                                    <p className="text-xl text-black font-bold">ยืนยันออเดอร์</p>
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}