import { expect } from "chai";
import { Contract, Signer } from "ethers";
import hre, { ethers } from "hardhat";
import { ElectionFactory, Election, ElectionFactory__factory } from "../typechain-types";

describe("ElectionFactory", function () {
  let owner: Signer;
  let operator: Signer;
  let nonOperator: Signer;
  var electionFactory: ElectionFactory;
  let electionAddress: string;
  let election: Election;

  beforeEach(async function () {
    [owner, operator, nonOperator] = await hre.ethers.getSigners();

    // Triển khai ElectionFactory
    const ElectionFactoryFactory:  ElectionFactory__factory = await hre.ethers.getContractFactory("ElectionFactory");
    electionFactory = await hre.upgrades.deployProxy(
      ElectionFactoryFactory,
      [await operator.getAddress()],
      { initializer: "initialize", kind: "transparent" }
    );
  });

  it("should grant OPERATOR role to the specified address", async function () {
    const isOperator = await electionFactory.hasRole(
      await electionFactory.OPERATOR(),
      await operator.getAddress()
    );
    expect(isOperator).to.be.true;
  });

  it("should create a new Election contract with specified title", async function () {
    // Kết nối với operator để gọi hàm createVote
    const electionTx = await electionFactory
      .connect(operator)
      .createElection("Election 1",60*60);
    expect( await  electionFactory.electionCreated()).to.equal(1);
  });

  it ("can not create a new Election with an existing title", async function () {
    const electionTx = await electionFactory.createElection("Election 1",60*60);
    await expect(electionFactory.createElection("Election 1",60*64)).to.be.revertedWith("DUPLICATE");
  })
});
