// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Voting is Ownable {
    struct Candidate {
        uint id;
        string name;
        string party; 
        uint voteCount;
    }

    mapping (uint => Candidate) public candidates;
    mapping (address => bool) public voters;
 
    
    uint public countCandidates;
    bool public isActive;

    // Constructor to initialize the voting start and end dates
    constructor() Ownable(msg.sender) {
        isActive = false;
    }

    // Add a candidate to the list
    function addCandidate(string memory name, string memory party) public onlyOwner returns(uint) {
        countCandidates++;
        candidates[countCandidates] = Candidate(countCandidates, name, party, 0);
        return countCandidates;
    }

    function activateVote() public onlyOwner() {
        isActive = true;
    }

    // Vote for a candidate
    function vote(uint candidateID) public {
        require(isActive, "Voting is not active");
        require(candidateID > 0 && candidateID <= countCandidates, "Invalid candidate ID");
        require(!voters[msg.sender], "You have already voted");

        voters[msg.sender] = true;
        candidates[candidateID].voteCount++;
    }

    // Check if the caller has voted
    function checkVote() public view returns (bool) {
        return voters[msg.sender];
    }

    // Get total count of candidates
    function getCountCandidates() public view returns (uint) {
        return countCandidates;
    }

    // Get details of a specific candidate
    function getCandidate(uint candidateID) public view returns (uint, string memory, string memory, uint) {
        return (
            candidateID,
            candidates[candidateID].name,
            candidates[candidateID].party,
            candidates[candidateID].voteCount
        );
    }
  

     // Get the vote count of a specific candidate
    function getVoteCount(uint candidateID) public view returns (uint) {
        require(candidateID > 0 && candidateID <= countCandidates, "Invalid candidate ID");
        return candidates[candidateID].voteCount;
    }

}
