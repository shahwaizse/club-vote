import { http, createConfig } from 'wagmi'
import { sepolia } from 'wagmi/chains'
import { injected, metaMask } from 'wagmi/connectors'

export const config = createConfig({
  chains: [sepolia],
  ssr: true,
  connectors: [
    injected(),
    metaMask(),
  ],
  transports: {
    [sepolia.id]: http("https://eth-sepolia.g.alchemy.com/v2/06jzFfahnS6bevMAVBM3Fn_TW5xM_EYL")
  }
})

export const contractAddress = "0x9321a45641AE41381167E9A6AD8Ab6Abf1f0D7Cf";