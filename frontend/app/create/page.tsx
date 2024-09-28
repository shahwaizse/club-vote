"use client"

import Navbar from "@/components/Navbar";
import WalletCheck from "@/components/WalletCheck";
import CreateCard from "@/components/create/CreateCard";

export default function Create() {
    return (
        <div className="min-h-screen flex flex-col justify-between bg-[url('../public/background.webp')] bg-cover bg-fixed">
            <Navbar />
            <WalletCheck>
                <div className="grow flex justify-center items-center">
                    <CreateCard />
                </div>
            </WalletCheck>
        </div>
    );
}