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
                    <div className="grow flex flex-col justify-center items-center font-oswald text-2xl">
                        Connect your Metamask wallet to start using ClubVote 🦊
                    </div>
            }
        </>
    );
}