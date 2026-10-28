'use client';
import { useState } from 'react';
import FirstPanel from "@/app/FirstPanel/FirstPanel";
import OrderCoffee from "@/app/OrderCoffee/OrderCoffee";
import Navbar from "@/app/components/common/Navbar";

export type Language = 'th' | 'en' | 'zh'

export default function Home() {
  const [lang, setLang] = useState<Language>('th');

  return(
      <main>
          <Navbar
            lang={lang}
            setLang={setLang}
          />
          <OrderCoffee
                lang={lang}
          />

      </main>
  );
}