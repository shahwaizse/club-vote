"use client"

import Navbar from "@/components/Navbar";
import { useAccount, useReadContract } from "wagmi";
import clubvotejson from '@/abi/ClubVote.json';
import { contractAddress } from "@/config";
import WalletCheck from "@/components/WalletCheck";
import Create from "@/components/create/Create";

export default function create() {

    const { address } = useAccount();

    const { data: username, error, isPending } = useReadContract({
        abi: clubvotejson.abi,
        account: address,
        address: contractAddress,
        functionName: 'getUsername',
        args: [address]
    });

    return (
        <div className="min-h-screen flex flex-col justify-between bg-[url('../public/background.webp')] bg-cover">
            <Navbar />
            <WalletCheck>
                <div className="grow flex justify-center items-center">
                    <Create />
                </div>
            </WalletCheck>
        </div>
    );
}