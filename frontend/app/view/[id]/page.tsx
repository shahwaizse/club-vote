"use client"

import WalletCheck from "@/components/WalletCheck";
import Navbar from "@/components/Navbar";
import { useParams } from "next/navigation";
import { useReadContracts, useAccount } from "wagmi";
import clubvotejson from '@/abi/ClubVote.json';
import { contractAddress } from "@/config";
import { useEffect } from "react";
import { LoaderIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Users2Icon } from "lucide-react";

export default function View() {

    const { address } = useAccount();
    const { id } = useParams();

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

    useEffect(() => {
        // console.log(data);
    }, [data]);

    const [, voteName, , voteText, voteCount] = data?.[1].result as [string, string, number, string[], number[]] || [];

    const status = data?.[0].status;

    function getTotalVotes(): bigint {
        let count = BigInt(0);
        voteCount.forEach((num) => {
            count += BigInt(num);
        });
        return count;
    }

    return (
        <div className="min-h-screen flex flex-col justify-between bg-[url('../public/background.webp')] bg-cover bg-fixed">
            <Navbar />
            <WalletCheck>
                <div className="grow flex justify-center items-center">
                    {
                        isPending ?
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
                                                    <div>View</div>
                                                    <div className="text-salmon">Vote</div>
                                                </div>
                                                <div className="pb-2 font-oswald text-2xl border-b-2 border-salmon">
                                                    {voteName}
                                                </div>
                                                <div className="gap-2 flex flex-row items-center font-oswald text-xl bg-black border rounded-full py-2 px-5">
                                                    <div className="">Total votes:</div>
                                                    <div className="text-salmon">{getTotalVotes().toString()}</div>
                                                </div>
                                            </div>
                                            <div className="flex flex-col grow pt-10 gap-5">
                                                {
                                                    voteText.map((name, index) => {
                                                        return <Card key={index} className="bg-black dark p-5 rounded-md flex flex-row justify-between">
                                                            <div className="font-oswald text-xl">
                                                                {name}
                                                            </div>
                                                            <div className="flex flex-row justify-center gap-2 text-salmon font-oswald text-xl">
                                                                <Users2Icon className="m-1" />
                                                                <div className="text-white">
                                                                    {voteCount[index].toString()}
                                                                </div>
                                                            </div>
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