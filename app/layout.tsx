import type { Metadata } from "next";
import { Cinzel, Alegreya_Sans } from 'next/font/google';
import { ReactNode } from "react";
import "./globals.css";
import styles from './RootLayout.module.css'
import './utilities.css'

import TopBar from "@/components/ui/TopBar/TopBar";
import SideMenu from "@/components/ui/SideMenu/SideMenu";

interface RootLayoutType {
  children: ReactNode
}

const cinzel = Cinzel({
  subsets: ['latin'],
  variable: '--font-cinzel',
  display: 'swap',
});

const alegreyaSans = Alegreya_Sans({
  weight: ['300', '400', '500', '700'], 
  subsets: ['latin'],
  variable: '--font-alegreya-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Ealemir",
  description: "A dark fantasy game",
}

export default function RootLayout({ children }: RootLayoutType) {
  return (
    <html lang="en" className={`${cinzel.variable} ${alegreyaSans.variable}`}>
      <body>
        <div className={styles.layoutWrapper}>
          <TopBar />
          <SideMenu />
          <main className={styles.mainWindow}>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
