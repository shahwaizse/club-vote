"use client"

import { useAccount, useReadContracts } from "wagmi";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import clubvotejson from '@/abi/ClubVote.json';
import { contractAddress } from "@/config";
import Link from "next/link";
import { useEffect, useState } from "react";
import { LoaderIcon } from "lucide-react";
import VotesListCard from "./VotesListCard";
import { Toaster } from "../ui/sonner";

export default function Dashboard() {

    const { address } = useAccount();
    const [username, setUsername] = useState<string>("");
    const [voteIDs, setVoteIDs] = useState<number[]>([]);

    const { data, error, isPending } = useReadContracts({
        contracts: [
            {
                abi: clubvotejson.abi,
                address: contractAddress,
                functionName: 'getCreatedVoteIDs',
                args: [address],
            },
            {
                abi: clubvotejson.abi,
                address: contractAddress,
                functionName: 'getUserName',
                args: [address],
            }
        ],
    });

    useEffect(() => {
        setVoteIDs(data?.[0].result as number[]);
        setUsername(data?.[1].result as string);
    }, [isPending]);

    return (
        <div className="flex flex-col items-center p-5 gap-10">
            <div className="font-oswald text-4xl">What would you like to do, {username?.toString()}?</div>
            <div className="flex flex-row gap-5">
                <Link href="/create">
                    <Button className="bg-white w-full font-oswald text-xl text-black hover:bg-salmon">
                        Create Vote
                    </Button>
                </Link>
                <Link href="/vote">
                    <Button className="bg-salmon w-full font-oswald text-xl text-black hover:bg-white">
                        Participate
                    </Button>
                </Link>
            </div>
            <Card className="rounded-lg w-[80vw] min-h-[60vh] dark p-5 flex flex-col">
                <div className="font-oswald text-3xl">
                    <div>Your</div>
                    <div className="text-salmon">Votes</div>
                </div>
                {
                    isPending ?
                        <div className="grow flex flex-col items-center justify-center">
                            <LoaderIcon className="animate-spin" />
                        </div> :
                        <div className="grow flex flex-col gap-5 pt-10">
                            {
                                voteIDs?.length > 0 ?
                                    voteIDs.map((id, index) => {
                                        return <VotesListCard voteID={id} key={id} />
                                    }) :
                                    <div className="grow flex justify-center items-center font-oswald text-xl">
                                        You haven't created any votes yet.
                                    </div>
                            }
                        </div>
                }
            </Card>
        </div>
    );
}