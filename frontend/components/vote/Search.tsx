import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Search() {

    const router = useRouter();

    const [voteID, setVoteID] = useState<string>("");

    function redirect() {
        if(voteID.trim()) {
            router.push(`/vote/${voteID}`)
        }
        else {
            alert("field is empty")
        }
    }

    return (
        <Card className="flex flex-col dark gap-5 p-5">
            <div className="font-oswald text-3xl">
                <div>Search</div>
                <div className="text-salmon">Vote</div>
            </div>
            <div className="pt-10 flex items-center gap-5">
                <Input onChange={(e) => {setVoteID(e.target.value)}} placeholder="Enter vote ID" className="p-6 bg-black border-none text-xl" />
                <Button onClick={redirect} className="rounded-lg bg-salmon font-oswald text-2xl">
                    Search <SearchIcon className="ml-2" />
                </Button>
            </div>
        </Card>
    );
}