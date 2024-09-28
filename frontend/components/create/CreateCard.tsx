"use client"

import { Card } from "../ui/card";
import { useState, useEffect } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { useRouter } from "next/navigation";
import { LoaderIcon } from "lucide-react";
import { contractAddress } from "@/config";
import clubvotejson from '@/abi/ClubVote.json';

export default function CreateCard() {

    const router = useRouter();

    const { data: hash, isPending, writeContract } = useWriteContract();
    const { isLoading: isConfirming, isSuccess: isConfirmed } =
        useWaitForTransactionReceipt({
            hash,
        });

    useEffect(() => {
        if (isConfirmed) {
            router.push("/");
        }
    }, [isConfirmed]);

    const [options, setOptions] = useState<string[]>([]);
    const [voteName, setVoteName] = useState<string>("");
    const [newOptionState, setNewOptionState] = useState<boolean>(false);
    const [newOptionText, setNewOptionText] = useState<string>("");

    function addNewOption() {
        if (newOptionText.trim()) {
            setOptions(prevOptions => [...prevOptions, newOptionText]);
            setNewOptionState(false);
            setNewOptionText("");
        }
        else {
            alert("please enter option contents before adding it to the vote.")
        }
    }

    function createVote() {
        if (voteName.trim() && options.length > 0) {
            writeContract({
                address: contractAddress,
                abi: clubvotejson.abi,
                functionName: "createVote",
                args: [voteName, options]
            });
        }
        else {
            alert("please fill in vote name and atleast one option");
        }
    }

    return (
        <>
            {
                isConfirming ?
                    <LoaderIcon className="animate-spin" /> :
                    <Card className="flex flex-col dark p-5 min-w-[60vw] min-h-[80vh]">
                        <div className="flex flex-row justify-between">
                            <div className="text-3xl font-oswald pb-10">
                                <div>New</div>
                                <div className="text-salmon">Vote</div>
                            </div>
                            <div className="flex flex-row gap-5">
                                <Button disabled={isPending} className="bg-white font-oswald text-xl text-black hover:bg-salmon" onClick={() => { setNewOptionState(true) }}>
                                    Add option
                                </Button>
                                <Button disabled={isPending} className="bg-salmon font-oswald text-xl text-black hover:bg-white" onClick={createVote}>
                                    Submit
                                </Button>
                            </div>
                        </div>
                        <div className="flex flex-row items-center gap-5">
                            <Label className="font-oswald text-xl whitespace-nowrap" htmlFor="votename">
                                What do you want to call your vote?
                            </Label>
                            <Input className="w-fit text-lg bg-black mt-2" onChange={(e) => { setVoteName(e.target.value) }} id="votename" placeholder="Vote name" />
                        </div>
                        {
                            newOptionState ?
                                <div className="px-40 grow flex flex-row justify-center items-center gap-5">
                                    <Label className="font-oswald text-xl whitespace-nowrap" htmlFor="option">
                                        New option:
                                    </Label>
                                    <Input className="text-lg bg-black mt-2" onChange={(e) => { setNewOptionText(e.target.value) }} id="option" placeholder="Option text" />
                                    <Button className="bg-white font-oswald text-xl text-black hover:bg-salmon" onClick={addNewOption}>
                                        Add
                                    </Button>
                                    <div className="text-salmon cursor-pointer" onClick={() => { setNewOptionState(false) }}>
                                        X
                                    </div>
                                </div> :
                                <div className="grow flex flex-col pt-10 gap-5">
                                    {
                                        options.length > 0 ?
                                            options.map((option, index) => {
                                                return <Card key={index} className="text-xl font-oswald flex flex-row gap-5 dark p-5 bg-black">
                                                    <div className="text-salmon">{index + 1}-</div>
                                                    <div>{option}</div>
                                                </Card>
                                            }) :
                                            <div className="font-oswald text-xl grow flex justify-center items-center">
                                                You haven't added any options yet.
                                            </div>
                                    }
                                </div>
                        }
                    </Card>
            }
        </>
    );
} 