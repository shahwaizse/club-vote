"use client"

import { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { useReadContract, useAccount } from "wagmi";
import clubvotejson from "@/abi/ClubVote.json"
import { contractAddress } from "@/config";

export default function VotesList() {

    const { address } = useAccount();

    const {data, error, isPending} = useReadContract(
        {
            abi: clubvotejson.abi,
            address: contractAddress,
            functionName: "getPollInfo",
            
        }
    );

    return (
        <>
            <div>hello</div>
        </>
    );
}