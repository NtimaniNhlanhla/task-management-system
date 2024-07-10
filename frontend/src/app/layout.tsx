"use client";

import { Inter } from "next/font/google";
import store from '../redux/store';
import "./globals.css";
import { Provider } from "react-redux";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <body>
      <Provider store={store}>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
      </Provider>
    </body>
  </html>
  );
}
