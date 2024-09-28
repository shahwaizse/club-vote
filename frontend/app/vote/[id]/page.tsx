"use client"

import WalletCheck from "@/components/WalletCheck";
import Navbar from "@/components/Navbar";
import { useParams } from "next/navigation";
import { useReadContracts, useWriteContract, useAccount, useWaitForTransactionReceipt } from "wagmi";
import clubvotejson from '@/abi/ClubVote.json';
import { contractAddress } from "@/config";
import { useEffect, useState } from "react";
import { LoaderIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { VoteIcon, Users2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Vote() {

    const router = useRouter();
    const { address } = useAccount();
    const { id } = useParams();
    const [hasVoted, setHasVoted] = useState<boolean>(true);
    const { data: hash, isPending: writing, writeContract } = useWriteContract();

    const { isLoading: isConfirming, isSuccess: isConfirmed } =
        useWaitForTransactionReceipt({
            hash,
        });

    const { data, isPending } = useReadContracts({
        contracts: [
            {
                address: contractAddress,
                abi: clubvotejson.abi,
                functionName: "voteCheck",
                args: [id, address]
            },
            {
                address: contractAddress,
                abi: clubvotejson.abi,
                functionName: "getInfoByID",
                args: [id]
            }
        ],
    });

    function vote(id: string, index: number) {
        writeContract({
            abi: clubvotejson.abi,
            functionName: "vote",
            args: [id, index],
            address: contractAddress,
            account: address,
        });
    }

    useEffect(() => {
        console.log(data);
        setHasVoted(data?.[0].result as boolean);
    }, [data]);

    useEffect(() => {
        if (isConfirmed) {
            router.push('/user');
        }
    }, [isConfirmed]);

    const [, voteName, , voteText, voteCount] = data?.[1].result as [string, string, number, string[], number[]] || [];

    const status = data?.[0].status;

    return (
        <div className="min-h-screen flex flex-col justify-between bg-[url('../public/background.webp')] bg-cover">
            <Navbar />
            <WalletCheck>
                <div className="grow flex justify-center items-center">
                    {
                        isPending || isConfirming ?
                            <LoaderIcon className="animate-spin" /> :
                            <div>
                                {
                                    status == 'failure' ?
                                        <Card className="rounded-lg dark p-5 flex flex-col gap-5">
                                            <div className="flex flex-row justify-between items-center">
                                                <div className="flex flex-col font-oswald text-3xl">
                                                    <div>Catastrophic</div>
                                                    <div className="text-salmon">Failure</div>
                                                </div>
                                            </div>
                                            <div className="font-oswald text-2xl grow flex justify-center items-center">
                                                No vote exists on that id. (Nice try buckaroo 🤡)
                                            </div>
                                        </Card> :
                                        <Card className="rounded-lg w-[80vw] min-h-[60vh] dark p-5 flex flex-col">
                                            <div className="flex flex-row justify-between items-center">
                                                <div className="flex flex-col font-oswald text-3xl">
                                                    <div>Vote</div>
                                                    <div className="text-salmon">Time</div>
                                                </div>
                                                <div className="pb-2 font-oswald text-2xl border-b-2 border-salmon">
                                                    {voteName}
                                                </div>
                                                <div></div>
                                            </div>
                                            <div className="flex flex-col grow pt-10 gap-5">
                                                {
                                                    voteText.map((name, index) => {
                                                        return <Card key={index} className="bg-black dark p-5 rounded-md flex flex-row justify-between">
                                                            <div className="font-oswald text-xl">
                                                                {name}
                                                            </div>
                                                            {
                                                                !hasVoted ?
                                                                    <Button onClick={() => { vote(id as string, index + 1) }} disabled={writing} className="gap-2 font-oswald text-xl bg-salmon">
                                                                        Vote
                                                                        <VoteIcon />
                                                                    </Button> :
                                                                    <div className="text-salmon flex flex-row justify-center gap-2 font-oswald text-xl">
                                                                        <Users2Icon className="m-1" />
                                                                        <div className="text-white">
                                                                            {voteCount[index].toString()}
                                                                        </div>
                                                                    </div>
                                                            }
                                                        </Card>
                                                    })
                                                }
                                            </div>
                                        </Card>
                                }
                            </div>
                    }
                </div>
            </WalletCheck>
        </div>
    );
}