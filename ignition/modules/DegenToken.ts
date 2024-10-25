import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { ethers } from "hardhat";
import { Signer } from "ethers";

const DegenTokenModule = buildModule("DegenTokenModule", (m) => {
  const DegenToken = m.contract("DegenToken");

  return { DegenToken };
});

export default DegenTokenModule;
