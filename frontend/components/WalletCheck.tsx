import { useAccount } from "wagmi";

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
                    <div className="dark grow flex justify-center items-center font-oswald text-2xl gap-2">
                        Connect your Metamask wallet to start using ClubVote <div className="text-3xl animate-bounce">🦊</div>
                    </div>
            }
        </>
    );
}