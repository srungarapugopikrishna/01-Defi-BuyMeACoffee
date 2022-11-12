// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

// Returns the ether balance of a given address.
async function getBalance(addrss) {
  const balanceBIgInt = await hre.ethers.provider.getBalance(addrss);
  return hre.ethers.utils.formatEther(balanceBIgInt);
}

// Logs the Ether balances for a list of addresses.
async function printBalances(addresses) {
  let idx = 0;
  for (const addrss of addresses) {
    // console.log("addrss::", addrss);
    console.log(`Address ${idx} balance: `, await getBalance(addrss));
    idx++;
  }
}

// Logs the memos stored on-chain from coffee purchases.
async function printMemos(memos) {
  for (const memo of memos) {
    const timestamp = memo.timestamp;
    const tipper = memo.name;
    const tipperAddress = memo.from;
    const message = memo.message;
    console.log(
      `At ${timestamp}, ${tipper} (${tipperAddress}) said: "${message}"`
    );
  }
}

async function main() {
  // Get example accounts.
  const [owner, tipper1, tipper2, tipper3] = await ethers.getSigners();

  // Get the contract to deploy.
  const BuyMeACoffee = await hre.ethers.getContractFactory("BuyMeACoffee");
  const buyMeCoffee = await BuyMeACoffee.deploy();

  // Deploy Contract
  await buyMeCoffee.deployed();
  console.log("BuyMeACoffee deployed to ", buyMeCoffee.address);

  // Check balances before the coffee purchase.
  const addresses = [
    owner.address,
    tipper1.address,
    tipper2.address,
    tipper3.address,
    buyMeCoffee.address,
  ];
  console.log("== start ==");
  await printBalances(addresses);

  // Buy the owner a few coffees.
  const tip = { value: hre.ethers.utils.parseEther("1") };
  await buyMeCoffee.connect(tipper1).buyCoffee("Krishna", "Drink Tea", tip);
  await buyMeCoffee.connect(tipper2).buyCoffee("SGK", "Coffeee is here", tip);
  await buyMeCoffee.connect(tipper3).buyCoffee("Mr.Bruno", "Sniper man", tip);

  // Check the balances after the purchase.
  console.log("=== Bought Coffee ===");
  await printBalances(addresses);

  // Withdra funds.
  console.log("=== Withdrawing Tips===");
  await buyMeCoffee.connect(owner).withdrawTips();

  // Check balances after withdraw.
  await printBalances(addresses);

  // Read all the memos left for the owner.
  console.log("===Memos ===");
  const memos = await buyMeCoffee.getMemos();
  printMemos(memos);

  console.log(``);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
