require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");

const ALCHEMY_API_KEY_URL = process.env.ALCHEMY_API_KEY_URL;

const PRIVATE_KEY = process.env.PRIVATE_KEY;

const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;

module.exports = {
  solidity: "0.8.19",
  networks: {
    sepolia: {
      url: ALCHEMY_API_KEY_URL,
      accounts: [PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: {
      sepolia: ETHERSCAN_API_KEY,
    },
  },
};

// npx hardhat run scripts/deploy.js --network <<netowkr>>
// npx hardhat run scripts/deploy.js --network sepolia
//  npx hardhat verify --network sepolia 0xa7B6AE7004c7Ce070D92404a9e71b51c53d87dD7 "Chinasa" 23
