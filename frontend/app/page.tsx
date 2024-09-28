"use client"

import Navbar from "@/components/Navbar"
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="h-[100vh] bg-[url('../public/background.webp')] bg-fixed bg-cover flex justify-center items-center">
        <div className="flex flex-col items-center justify-center">
          <div className="mb-5 text-lg w-fit rounded-full bg-black shadow-[0_0_5px_rgba(255,255,255,0.8)] antialiased py-1 px-3">Alpha v0.1</div>
          <Image src='/clubvote-transparent.png' alt="logo" width={500} height={500} />
          <div className="text-xl pl-7">a voting platform powered by web3</div>
          <Link href="/user">
            <Button className="ml-3 mt-20 rounded-sm bg-white text-black font-oswald text-2xl py-1 px-3 hover:bg-salmon">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
      <div className="font-bold p-5 bg-darkgrey font-oswald text-white text-2xl flex flex-row justify-around items-center">
        <div className="flex flex-row gap-2">
          <div>Created by</div>
          <a className="underline text-salmon" href="https://www.github.com/shahwaizse">github.com/shahwaizse</a>
        </div>
        <div>
          <Image className="transform -scale-x-100" src='/dev_pfp.jpeg' alt="dev_pfp" width={60} height={60} />
        </div>
      </div>
    </>
  );
}
