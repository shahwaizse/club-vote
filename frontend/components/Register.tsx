import { useWriteContract } from "wagmi";
import clubvotejson from '@/abi/ClubVote.json'

export default function Register() {
    const { data: hash, isPending, writeContract } = useWriteContract();

    function newuser() {
        writeContract({
            address: '0xA7E9180AcA38E6f7da034d16C5c2ce5A694b2593',
            abi: clubvotejson.abi,
            functionName: 'newUser',
            args: ["shahwaiz", "firstClub"]
        });
    }

    return (
        <button disabled={isPending} className='ml-4 bg-salmon p-1 rounded-md text-black font-oswald text-lg' onClick={() => {newuser()}}>
            {isPending ? 'creating user...' : 'Register'}
        </button>
    );
}