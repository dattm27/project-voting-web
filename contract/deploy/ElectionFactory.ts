import { DeployFunction } from "hardhat-deploy/dist/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import Web3 from "web3";
import { saveContract } from "../scripts/utils";
import * as dotenv from "dotenv";
import * as fs from "fs";
const addresses = JSON.parse(fs.readFileSync("./contract-addresses.json", "utf-8"));
dotenv.config();

const deploy: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
    const { deployments, getNamedAccounts, network } = hre;
    const { deploy, execute } = deployments;
    const { deployer } = await getNamedAccounts();
    const web3 = new Web3(process.env.RPC!);


    const data = await deploy("ElectionFactory", {
        from: deployer,
        args: [],
        log: true,
        deterministicDeployment: false,
        gasPrice: (await web3.eth.getGasPrice()).toString(),
        proxy: {
            proxyContract: "OptimizedTransparentProxy",
            owner: deployer,
            execute: {
                methodName: "initialize",
                args: ["0x944A402a91c3D6663f5520bFe23c1c1eE77BCa92"],
            },
        }
    });

    console.log("ElectionFactory deployed to:", data.address);

    // Lưu địa chỉ contract
    await saveContract(network.name, "ElectionFactory", data.address, data.implementation!);

    // verify proxy contract
    try {
        // verify
        await hre.run("verify:verify", {
            address: data.address,
            constructorArguments: [],
        });
    } catch (e) {
        console.log(e);
    }

    // verify impl contract
    try {
        // verify
        await hre.run("verify:verify", {
            address: data.implementation,
            constructorArguments: [],
        });
    } catch (e) {
        console.log(e);
    }

    // Sử dụng execute để upgrade proxy lên implementation mới
    await execute(
        "DefaultProxyAdmin", // tên proxy bạn đã triển khai
        { 
            from: deployer, 
            log: true,  
            gasPrice: (await web3.eth.getGasPrice()).toString() ,
            gasLimit: 5000000, // Thêm gasLimit vào đây
        },
        "upgrade", // gọi hàm upgradeTo trên proxy
        data.address, data.implementation!
    );
};

// Gán tag cho deploy script
deploy.tags = ["ElectionFactory"];
export default deploy;
