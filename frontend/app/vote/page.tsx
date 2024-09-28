"use client"

import WalletCheck from "@/components/WalletCheck";
import Navbar from "@/components/Navbar";
import Search from "@/components/vote/Search";

export default function Vote() {

    return (
        <div className="min-h-screen flex flex-col justify-between bg-[url('../public/background.webp')] bg-cover bg-fixed">
            <Navbar />
            <WalletCheck>
                <div className="grow flex justify-center items-center">
                    <Search />
                </div>
            </WalletCheck>
        </div>
    );
}