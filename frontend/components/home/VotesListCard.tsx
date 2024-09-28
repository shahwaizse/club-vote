"use client"

import { useEffect, useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { useReadContract } from "wagmi";
import clubvotejson from "@/abi/ClubVote.json"
import { contractAddress } from "@/config";
import { CopyIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Skeleton } from "../ui/skeleton";

interface Props {
    voteID: number,
}

export default function VotesListCard(props: Props) {

    const router = useRouter();

    const [copyText, setCopyText] = useState<string>("");

    const voteID: string = props.voteID.toString();

    const { data, isPending } = useReadContract(
        {
            abi: clubvotejson.abi,
            address: contractAddress,
            functionName: "getInfoByID",
            args: [props.voteID],
        }
    );

    const [, name, , , ] = data as [string, string, number, string[], number[]] || [];

    useEffect(() => {
        console.log(data);
    }, [isPending]);

    useEffect(() => {
        if (copyText == "ID copied") {
            setTimeout(() => {
                setCopyText("");
            }, 3000);
        }
    }, [copyText]);

    function copyID() {
        navigator.clipboard.writeText(props.voteID.toString());
        setCopyText("ID copied")
    }

    return (
        <Card className="dark p-5 bg-black text-white flex flex-row justify-between">
            {
                isPending ? <Skeleton className="p-5 w-20" /> : <div className="text-xl font-oswald">{name}</div>
            }
            <div className="flex flex-row gap-5">
                <Button onClick={copyID} className="text-xl font-oswald text-white bg-black hover:bg-black">
                    {copyText == "ID copied" ? copyText : <CopyIcon className="ml-5" />}
                </Button>
                <Button onClick={() => {router.push(`/view/${voteID}`)}} className="bg-salmon font-oswald text-xl">
                    View
                </Button>
            </div>
        </Card>
    );
}