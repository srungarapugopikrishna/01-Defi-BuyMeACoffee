require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const GOERLI_URL = process.env.GOERLI_URL;
const PRIVATE_KEY = process.env.ACC_PRIVATE_KEY;
console.log("GOERLI_URL::" + GOERLI_URL);
console.log("PRIVATE_KEY::" + PRIVATE_KEY);
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    hardhat: {
      chainId: 1337,
    },
    goerli: {
      // url: GOERLI_URL,
      // account: [PRIVATE_KEY],
      url: "https://eth-goerli.g.alchemy.com/v2/VjSnVmpD6gRO3EqVwps-TUbn2eLEtSn-",
      accounts: [
        "3a5f61e1340574cc80f2f9b4508dc4184529589376962273c23c1df24d52f1e7",
      ],
    },
  },
};
