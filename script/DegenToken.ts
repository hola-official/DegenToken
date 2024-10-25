const hre = require("hardhat");

async function main() {
  const myAccount = "0x429cB52eC6a7Fc28bC88431909Ae469977F6daCF";

  const deployer = await hre.ethers.getSigner(myAccount);
  // const [deployer] = await hre.ethers.getSigners();

  const DEPLOYED_CONTRACT = "0xD018054CaD63CAA0c1e0982d6c85c2e5A5CdaEC4";

  console.log("Deploying DegenToken contract...");
  const degenToken = await hre.ethers.getContractAt(
    "DegenToken",
    DEPLOYED_CONTRACT
  );
  // const degenToken = await DegenToken.deploy();
//  degenToken.wait();

  console.log("DegenToken deployed to:", degenToken);

  // Check the initial balance of the deployer
  let deployerBalance = await degenToken.balanceOf(deployer);
  console.log(
    "Deployer balance after minting:",
    hre.ethers.formatUnits(deployerBalance, 18)
  );

  // Retrieve all items available in the store
  const itemCount = await degenToken.items.length;
  console.log("Items available in the store:");

  for (let i = 0; i < itemCount; i++) {
    const item = await degenToken.items(i);
    console.log(
      `Item ${i + 1}:`,
      item.name,
      "-",
      hre.ethers.utils.formatUnits(item.cost, 18),
      "DEGEN"
    );
  }

  // Redeem two items from the store (example: items 0 and 1)
  console.log("Redeeming items...");
  await degenToken.redeemItem(0); // Redeem "Health"
  await degenToken.redeemItem(1); // Redeem "Skins"

  // Get the balance before and after redeeming items
  deployerBalance = await degenToken.balanceOf(deployer);
  console.log(
    "Deployer balance after redemption:",
    hre.ethers.utils.formatUnits(deployerBalance, 18)
  );

  console.log("Redemption complete. Events are logged on-chain.");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
