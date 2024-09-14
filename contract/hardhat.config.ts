import type { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";
import { configDotenv } from "dotenv";

configDotenv();

//the ! sign is type assertion. reading from a .env file returns string | undefined
//because the value might not be in the .env file
//typing a ! sign is me telling typescript that the variable will FOR SURE have a string in it.
//so typescript is like aight G bet, but if the thing empty imma crash and throw an error
//so MAKE SURE before doing type assertion, or suffer a crash :)

const privateKey = process.env.PRIVATE_KEY!;
const alchemyKey = process.env.ALCHEMY_KEY;

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  defaultNetwork: "sepolia",
  networks: {
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${alchemyKey}`,
      accounts: [privateKey],
    },
  },
};

export default config;
