import { expect } from "chai";
import { Signer, Contract, parseEther } from "ethers";
import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";

import hre from "hardhat";
import { ethers } from "hardhat";
import { Election } from "../typechain-types";

describe("Election", function () {
    let owner: Signer, addr1: Signer, addr2: Signer, addr3: Signer, addr4: Signer;
    const electionEndTime = 60 * 60; // end after 1 hour 
    beforeEach(async function () {
        [owner, addr1, addr2, addr3, addr4] = await hre.ethers.getSigners();


    });

    async function deployFixture() {
        let election = await hre.ethers.deployContract("Election", [1, owner, electionEndTime]);
        return { election }
    }

    describe("Add election", function () {

        it("should add new candidate successfully", async function () {
            const { election } = await loadFixture(deployFixture);
            await election.addCandidate("Candidate 1", "Party A");
            expect(await election.getCountCandidates()).to.equal(1);
        });

        it("non-owner can not add candidaye", async function () {
            const { election } = await loadFixture(deployFixture);
            await expect(election.connect(addr1).addCandidate("Candidate 1", "Party A")).to.reverted;
        })

        it("can not add new candidate with exsiting name", async function () {
            const { election } = await loadFixture(deployFixture);
            await election.addCandidate("Candidate 1", "Party A");
            await expect(election.addCandidate("Candidate 1", "Party A")).to.revertedWith("DUPLICATE");
        })
    })
    describe("Pause an unpause", function () {

        it("should pause and unpause election", async function () {
            const { election } = await loadFixture(deployFixture);

            expect(await election.isActive()).to.equal(true);

            await election.pause();
            expect(await election.isActive()).to.equal(false);

            await expect(election.connect(addr1).vote(1)).to.be.revertedWith("Election is not active");

            await election.unpause();
            expect(await election.isActive()).to.equal(true);

        });

        it("should not allow unpausing after election end time", async function () {
            const { election } = await loadFixture(deployFixture); 
            await election.pause();
            await ethers.provider.send("evm_increaseTime", [60 * 60 - 1 ]);
            await ethers.provider.send("evm_mine", []);

            await expect(election.unpause()).to.be.revertedWith("Unable to unpaused");
        });
    })
    describe("Voting", function () {
        // Test getting vote count for a candidate
        it("should vote a candidate successfully", async function () {
            const { election } = await loadFixture(deployFixture);

            await election.addCandidate("Candidate 1", "Party A");
            await election.activateVote();
            const voteCount = await election.getVoteCount(1);
            expect(voteCount).to.equal(0); // Initially vote count should be 0

            await election.connect(addr1).vote(1);

            const updatedVoteCount = await election.getVoteCount(1);
            expect(updatedVoteCount).to.equal(1); // Vote count should now be 1
        });

        it("should revert vote after electionEndTime", async function () {
            const { election } = await loadFixture(deployFixture);

            await election.addCandidate("Candidate 1", "Party A");
            await ethers.provider.send("evm_increaseTime", [60 * 60 - 1]);
            await ethers.provider.send("evm_mine", []);
            await expect(election.connect(addr1).vote(1)).to.be.revertedWith("Election is ended");

        })

        it("should reject onwer vote", async function () {
            const { election } = await loadFixture(deployFixture);
            await election.addCandidate("Candidate 1", "Party A");
            await election.activateVote();
            const voteCount = await election.getVoteCount(1);
            expect(voteCount).to.equal(0); // Initially vote count should be 0

            await expect(election.vote(1)).to.be.reverted;
            await election.connect(addr1).vote(1);
            const updatedVoteCount = await election.getVoteCount(1);
            expect(updatedVoteCount).to.equal(1); // Vote count should now be 1
        })
    })
});