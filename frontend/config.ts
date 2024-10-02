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

export const contractAddress = "0xb0E2B2f1f405d95b66EB52c433c1d003211344fD";