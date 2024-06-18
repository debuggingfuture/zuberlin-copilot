import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { AuthCoreContextProvider, PromptSettingType } from "@particle-network/auth-core-modal";
import { AuthType } from '@particle-network/auth-core';
import { Ethereum, MantleSepoliaTestnet } from '@particle-network/chains';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "ZuBerlin Copilot",
  description: "AI assistant for the community",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AuthCoreContextProvider
          options={{
            projectId: process.env.REACT_APP_PROJECT_ID!,
            clientKey: process.env.REACT_APP_CLIENT_KEY!,
            appId: process.env.REACT_APP_APP_ID!,
            authTypes: [AuthType.email, AuthType.google, AuthType.twitter],
            themeType: 'dark',
            fiatCoin: 'USD',
            language: 'en',
            erc4337: {
              name: 'SIMPLE',
              version: '1.0.0',
            },
            promptSettingConfig: {
              promptPaymentPasswordSettingWhenSign: PromptSettingType.first,
              promptMasterPasswordSettingWhenLogin: PromptSettingType.first,
            },
            wallet: {
              visible: true,
              customStyle: {
                supportChains: [MantleSepoliaTestnet],
              }
            },

          }}
        >

          {children}
        </AuthCoreContextProvider>
      </body>
    </html>
  );
}
