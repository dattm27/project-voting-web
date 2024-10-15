import { expect } from "chai";
import { Signer, Contract, parseEther } from "ethers";

import hre from "hardhat";
import { ethers } from "hardhat";
import {Voting} from  "../typechain-types";

describe("Voting", function () {
    let owner: Signer, addr1: Signer, addr2: Signer, addr3: Signer, addr4: Signer;
    let voting: Voting;
    beforeEach(async function () {
        [owner, addr1, addr2, addr3, addr4] = await hre.ethers.getSigners();
        voting =  await hre.ethers.deployContract("Voting");
    });
     // Test adding a candidate and checking for duplicate IDs
     it("should add new candidate successfully", async function () {
        await voting.addCandidate("Candidate 1", "Party A");
        expect ( await voting.getCountCandidates()).to.equal(1);
    });

    // Test getting vote count for a candidate
    it("should vote a candidate successfully", async function () {
       
        await voting.addCandidate("Candidate 1", "Party A");
        await voting.activateVote();
        const voteCount = await voting.getVoteCount(1);
        expect(voteCount).to.equal(0); // Initially vote count should be 0

        await voting.connect(addr1).vote(1);

        const updatedVoteCount = await voting.getVoteCount(1);
        expect(updatedVoteCount).to.equal(1); // Vote count should now be 1
    });
});