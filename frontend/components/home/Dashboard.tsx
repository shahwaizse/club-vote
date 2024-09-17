import { useAccount } from "wagmi";
import { Button } from "../ui/button";
import { Card } from "../ui/card";

export default function Dashboard() {

    const { address } = useAccount();

    return (
        <div className="w-screen flex flex-col items-center p-5 gap-10">
            <div className="flex flex-row gap-10">
                <Card className="rounded-lg w-[40vw] min-h-[50vh] dark p-5 text-center">
                </Card>
                <Card className="rounded-lg w-[40vw] min-h-[50vh] dark p-5">
                </Card>
            </div>
        </div>
    );
}