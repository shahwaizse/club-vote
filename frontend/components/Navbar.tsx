"use client"

import { useAccount, useConnect } from 'wagmi'
// import { useDisconnect } from 'wagmi'
import { injected } from 'wagmi/connectors'
import { Button } from './ui/button'
import Image from 'next/image'
import Link from 'next/link'

export default function Navbar() {
    const { connect } = useConnect()
    const { address } = useAccount()
    // const { disconnect } = useDisconnect()

    function connectMetamask() {
        console.log("function called.");
        connect({ connector: injected() });
        console.log("connector called.");
    }

    return (
        <>
            <div className='flex flex-row justify-between items-center py-1 px-2 bg-darkgrey'>
                <div>
                    <Link href="/">
                        <Image
                            className='rounded-xl'
                            src="/nav.png"
                            width={50}
                            height={50}
                            alt='Nav Icon'
                        />
                    </Link>
                </div>
                {
                    address ?
                        <div className='flex flex-row gap-8 mr-2'>
                            <Link href="/">
                                <div className='font-oswald text-2xl'>Home</div>
                            </Link>
                            <Link href="/user">
                                <div className='font-oswald text-2xl'>Votes</div>
                            </Link>
                            <div className='font-oswald text-2xl text-green-500'>Connected</div>
                        </div> :
                        <Button className='bg-salmon font-normal font-oswald text-black text-2xl hover:bg-white' onClick={connectMetamask}>
                            Connect Wallet
                        </Button>
                }
            </div>
        </>
    );
}