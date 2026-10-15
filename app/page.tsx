'use client';
import { useState } from 'react';
import FirstPanel from "@/app/components/auth/FirstPanel";
import OrderCoffee from "@/app/components/OrderCoffee/OrderCoffee";

export type Language = 'th' | 'en' | 'zh'

export default function Home() {
  const [lang, setLang] = useState<Language>('th');

  return(
      <main>
          <OrderCoffee
            lang={lang}
          />

      </main>
  );
}