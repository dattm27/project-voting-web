// scripts/updateImplementation.ts

import { ethers, upgrades } from "hardhat";
import * as fs from "fs";
const addresses = JSON.parse(fs.readFileSync("./contract-addresses.json", "utf-8"));
async function main() {
    const NewContractName = "ElectionFactory";

    // Get the factory for the new contract version
    // available if a new ConntractName
    const NewContract = await ethers.getContractFactory(NewContractName);

    // Address of the current Proxy (replace with your actual proxy address)
    const proxyAddress = addresses.fuji.ElectionFactory.address;

    console.log("Upgrading contract...");
    // Register the existing proxy for upgrading using forceImport
    const existingProxy = await upgrades.forceImport(proxyAddress, NewContract);

    // Perform the upgrade of the contract via Proxy
    const upgradedContract = await upgrades.upgradeProxy(proxyAddress, NewContract);

    console.log("Contract has been successfully upgraded!");
    console.log(`New contract deployed at address: ${upgradedContract.address}`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
