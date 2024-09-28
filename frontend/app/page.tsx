"use client"

import Navbar from "@/components/Navbar";
import Register from "@/components/Register";
import WalletCheck from "@/components/WalletCheck";
import Dashboard from "@/components/home/Dashboard";
import { LoaderIcon } from "lucide-react";
import { useReadContract, useAccount } from "wagmi";
import clubvotejson from '@/abi/ClubVote.json';
import { contractAddress } from "@/config";
import { useState, useEffect } from "react";

export default function Home() {

  const [onboard, setOnboard] = useState<boolean>(true);

  const { address, isConnected } = useAccount();

  const { data, isPending } = useReadContract({
    abi: clubvotejson.abi,
    account: address,
    address: contractAddress,
    functionName: 'checkUser',
  });

  // useEffect(() => {
  //   console.log(error);
  // }, [error]);

  useEffect(() => {
    if (data == true) {
      setOnboard(false);
    }
  }, [data]);

  useEffect(() => {
    if(isConnected == true && onboard == false) {
      window.location.reload();
    }
  }, [isConnected]);

  return (
    <>
      <div className="flex flex-col justify-between min-h-screen bg-[url('../public/background.webp')] bg-fixed bg-cover">
        <Navbar />
        <WalletCheck>
          <div className="grow flex justify-center items-center">
            {
              isPending ?
                <LoaderIcon className="animate-spin" /> :
                <div>
                  {
                    onboard ? <Register /> : <Dashboard />
                  }
                </div>
            }
          </div>
        </WalletCheck>
      </div>
    </>
  );
}
