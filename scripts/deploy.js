const hre = require("hardhat");

async function main() {
  const BuyMeACoffee = await hre.ethers.getContractFactory("BuyMeACoffee");
  const buyMeCoffee = await BuyMeACoffee.deploy();

  // Deploy Contract
  await buyMeCoffee.deployed();
  console.log("BuyMeACoffee deployed to ", buyMeCoffee.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
