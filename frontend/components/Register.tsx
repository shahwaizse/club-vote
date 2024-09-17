import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import clubvotejson from '@/abi/ClubVote.json';
import { Card } from "@/components/ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useEffect, useState } from "react";
import Image from "next/image";
import { LoaderIcon } from "lucide-react";
import { contractAddress } from "@/app/config";

export default function Register() {

    const { data: hash, isPending, writeContract } = useWriteContract();
    const { isLoading: isConfirming, isSuccess: isConfirmed } =
        useWaitForTransactionReceipt({
            hash,
        });

    useEffect(() => {
        if (isConfirmed) {
            window.location.reload();
        }
    }, [isConfirmed]);

    const [username, setUsername] = useState<string | null>(null);
    const [clubname, setClubname] = useState<string | null>(null);

    function newuser() {
        if (username?.trim() && clubname?.trim()) {
            writeContract({
                address: contractAddress,
                abi: clubvotejson.abi,
                functionName: 'newUser',
                args: [username, clubname]
            });
        }
        else {
            alert("please fill in the fields before pressing the register button");
        }
    }

    return (
        <>
            {
                isConfirming ?
                    <LoaderIcon className="animate-spin" /> :
                    <Card className="dark flex flex-row p-5 gap-10 min-h-[40vh] min-w-[40vw]">
                        <div className="flex flex-col items-center justify-center">
                            <div className="font-oswald text-3xl">Welcome To</div>
                            <Image
                                src="/clubvote-transparent.png"
                                width={400}
                                height={400}
                                alt="onboard"
                            />
                        </div>
                        <div className="flex flex-col justify-center gap-10">
                            <div className="flex flex-col gap-5">
                                <div>
                                    <Label className="font-oswald text-xl" htmlFor="username">What's your user name?</Label>
                                    <Input className='text-lg bg-black mt-2' id="username" placeholder="Username" onChange={(e) => { setUsername(e.target.value) }} />
                                </div>
                                <div>
                                    <Label className="font-oswald text-xl " htmlFor="clubname">What's your club name?</Label>
                                    <Input className='text-lg bg-black mt-2' id="clubname" placeholder="Clubname" onChange={(e) => { setClubname(e.target.value) }} />
                                </div>
                            </div>
                            <Button disabled={isPending} onClick={newuser} className="bg-salmon w-full font-oswald text-xl text-black hover:bg-white">
                                Register
                            </Button>
                        </div>
                    </Card>
            }
        </>
    );
}