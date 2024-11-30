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

export const contractAddress = "0x31B0A3388c2201801ece761cAb7C26f44FA78Fb1";