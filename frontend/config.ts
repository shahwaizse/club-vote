import { http, createConfig } from 'wagmi'
import { sepolia } from 'wagmi/chains'
import { metaMask } from 'wagmi/connectors'
// import { injected } from 'wagmi/connectors'
import dotenv from 'dotenv'

dotenv.config();

const alchemyApiKey = process.env.ALCHEMY_API_KEY;

export const config = createConfig({
  chains: [sepolia],
  ssr: true,
  connectors: [
    // injected(),
    metaMask(),
  ],
  transports: {
    [sepolia.id]: http(alchemyApiKey)
  }
})

export const contractAddress = "0x47d49B8DC77c69d8c34e8bFdF3037879fB0b708B";