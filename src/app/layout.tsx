"use client"

import { useEffect, useState } from 'react';
import { IntlProvider } from 'react-intl';
import esMessages from './locales/es.json';
import enMessages from './locales/en.json';

import "./globals.css";

type SupportedLanguages = 'es' | 'en';

const messages: Record<SupportedLanguages, Record<string, string>> = {
  es: esMessages,
  en: enMessages,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [browserLanguage, setBrowserLanguage] = useState<SupportedLanguages>('en');

  useEffect(() => {
    const lang = navigator.language.startsWith('es') ? 'es' : 'en';
    setBrowserLanguage(lang);
  }, []);

  return (
    <IntlProvider locale={browserLanguage} messages={messages[browserLanguage]}>
      <html lang={browserLanguage}>
        <head>
          <meta charSet="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, user-scalable=no"
          />
          <title>{browserLanguage === 'es' ? 'Tour Virtual 360°' : '360° Virtual Tour'}</title>
          
          <link rel="icon" type="image/svg+xml" href="images/favicon.svg"></link>
        </head>

        {children}
      </html>
    </IntlProvider>
  );
}
