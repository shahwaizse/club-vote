"use client"

import { useAccount, useReadContracts } from "wagmi";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import clubvotejson from '@/abi/ClubVote.json';
import { contractAddress } from "@/config";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Dashboard() {

    const { address } = useAccount();
    const [username, setUsername] = useState<string>();
    const [voteIDs, setVoteIDs] = useState<Uint32Array>();

    const {data, error, isPending} = useReadContracts({
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
        setVoteIDs(data?.[0].result as Uint32Array);
        setUsername(data?.[1].result as string);
    }, [isPending]);

    useEffect(() => {
        voteIDs?.forEach((id) => {
            console.log(id);
        });
    }, [voteIDs])

    return (
        <div className="flex flex-col items-center p-5 gap-10">
            <div className="font-oswald text-4xl">What would you like to do, {username?.toString()}?</div>
            <div className="flex flex-row gap-5">
                <Button className="bg-white w-full font-oswald text-xl text-black hover:bg-salmon">
                    <Link href="/create">Create a Vote</Link>
                </Button>
                <Button className="bg-salmon w-full font-oswald text-xl text-black hover:bg-white">
                    Participate
                </Button>
            </div>
            <Card className="rounded-lg w-[80vw] min-h-[60vh] dark p-5">
                <div className="text-3xl font-oswald">
                    <div>Your</div>
                    <div className="text-salmon">Votes</div>
                </div>
            </Card>
        </div>
    );
}