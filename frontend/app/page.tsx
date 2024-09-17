"use client"

import Navbar from "@/components/Navbar";
import Register from "@/components/Register";
import WalletCheck from "@/components/WalletCheck";
import { LoaderIcon } from "lucide-react";
import { useReadContract, useAccount } from "wagmi";
import clubvotejson from '@/abi/ClubVote.json'
import { contractAddress } from "./config";
import { useState, useEffect } from "react";

export default function Home() {

  const [onboard, setOnboard] = useState<boolean>(true);

  const { address } = useAccount();

  const { data: userInfo, error, isPending } = useReadContract({
    abi: clubvotejson.abi,
    account: address,
    address: contractAddress,
    functionName: 'getUserInfo',
  });

  useEffect(() => {
    if (userInfo?.toString() == ',') {
      setOnboard(true);
    }
    else {
      setOnboard(false);
    }
  }, [userInfo]);

  return (
    <>
      <div className="flex flex-col justify-between min-h-screen">
        <Navbar />
        <WalletCheck>
          <div className="grow flex justify-center items-center">
            {
              isPending ?
                <LoaderIcon className="animate-spin" /> :
                <div>
                  {
                    onboard ? <Register /> : <div>Registered user, display dashboard thingie</div>
                  }
                </div>
            }
          </div>
        </WalletCheck>
      </div>
    </>
  );
}
