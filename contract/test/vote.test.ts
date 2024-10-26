import { expect } from "chai";
import { Signer, Contract, parseEther } from "ethers";

import hre from "hardhat";
import { ethers } from "hardhat";
import {Election} from  "../typechain-types";

describe("Voting", function () {
    let owner: Signer, addr1: Signer, addr2: Signer, addr3: Signer, addr4: Signer;
    let election: Election;
    beforeEach(async function () {
        [owner, addr1, addr2, addr3, addr4] = await hre.ethers.getSigners();
        election =  await hre.ethers.deployContract("Election", [1, owner]);
        

    });
     // Test adding a candidate and checking for duplicate IDs
     it("should add new candidate successfully", async function () {
        await election.addCandidate("Candidate 1", "Party A");
        expect ( await election.getCountCandidates()).to.equal(1);
    });

    // Test getting vote count for a candidate
    it("should vote a candidate successfully", async function () {
       
        await election.addCandidate("Candidate 1", "Party A");
        await election.activateVote();
        const voteCount = await election.getVoteCount(1);
        expect(voteCount).to.equal(0); // Initially vote count should be 0

        await election.connect(addr1).vote(1);

        const updatedVoteCount = await election.getVoteCount(1);
        expect(updatedVoteCount).to.equal(1); // Vote count should now be 1
    });
});