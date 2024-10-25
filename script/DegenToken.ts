import hre from "hardhat";
import { ethers } from "hardhat";

async function main() {
  const myAccount = "0x429cB52eC6a7Fc28bC88431909Ae469977F6daCF";
  const deployer = await ethers.getSigner(myAccount);
  const DEPLOYED_CONTRACT = "0xD018054CaD63CAA0c1e0982d6c85c2e5A5CdaEC4";
  const amt = ethers.parseUnits("100", 18);

  console.log("Deploying DegenToken contract...");
  const degenToken = await ethers.getContractAt(
    "DegenToken",
    DEPLOYED_CONTRACT
  );

  console.log("DegenToken deployed to:", degenToken.target);

  let deployerBalance = await degenToken.balanceOf(deployer.address);
  const mint = await degenToken.mint(deployer.address,amt)
  mint.wait();

  console.log(
    "Deployer balance after minting:",
    ethers.formatUnits(deployerBalance, 18)
  );

  console.log("Redeeming items...");
  await degenToken.redeemItem(0);
  await degenToken.redeemItem(1);

  deployerBalance = await degenToken.balanceOf(deployer.address);
  console.log(
    "Deployer balance after redemption:",
    ethers.formatUnits(deployerBalance, 18)
  );

  console.log("Redemption complete. Events are logged on-chain.");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Error:", error);
    process.exit(1);
  });
