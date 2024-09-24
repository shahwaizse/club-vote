import { useAccount } from "wagmi";
import { Card } from "./ui/card";

interface Props {
    children: React.ReactNode;
}

export default function WalletCheck({ children }: Props) {

    const { address } = useAccount();

    return (
        <>
            {
                address ?
                    children :
                    <div className="dark grow flex flex-col justify-center items-center font-oswald text-2xl">
                        Connect your Metamask wallet to start using ClubVote 🦊
                    </div>
            }
        </>
    );
}