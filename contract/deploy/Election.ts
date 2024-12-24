import { DeployFunction } from "hardhat-deploy/dist/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { saveContract } from "../scripts/utils";
import * as dotenv from "dotenv";
dotenv.config();

const deploy: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
    const { deployments, getNamedAccounts, network } = hre;
    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();

    const electionId = 0;
    const owner = "0x944A402a91c3D6663f5520bFe23c1c1eE77BCa92";
    const duration = 60*60*24*365;
    const data = await deploy("Election", {
        from: deployer,
        args: [electionId , owner, duration], 
        log: true,
        deterministicDeployment: false,
    });

    console.log("Election deployed to:", data.address);
    

    await saveContract(network.name, "Election", data.address, data.implementation!);


    try {
        await hre.run("verify:verify", {
            address: data.address,
            constructorArguments: [electionId , owner, duration],
        });
    } catch (e) {
        console.log("Verification failed:", e);
    }
};


deploy.tags = ["Election"];
export default deploy;
