import type { Metadata } from "next";
import { Cinzel, Alegreya_Sans } from 'next/font/google';
import { ReactNode } from "react";
import "./globals.css";
import styles from './RootLayout.module.css'

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
          <header className={styles.topBar}>
            <div>Resources: Gold 500 | Wood 200</div>
          </header>

          <nav className={styles.sideMenu}>
            <ul>
              <li>Overview</li>
              <li>Empire</li>
              <li>Military</li>
            </ul>
          </nav>

          <main className={styles.mainWindow}>
            <div className={styles.contentWrapper}>
              {children}
          </div>
      </main>
        </div>
      </body>
    </html>
  );
}
