// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";


contract Election is Ownable {
    struct Candidate {
        uint id;
        string name;
        string party; 
        uint voteCount;
    }

    mapping (uint => Candidate) public candidates;
    mapping (address => bool) public voters;
    mapping (string => bool) public isCandidate;

    event NewVote(uint256 electionId, address indexed voter, uint256 candidateId, uint256 timestamp);
    event NewCandidate(uint256 electionId, uint256 candidateId, string name, string patry);
    event Pause(uint256 electionId);
    event Unpause(uint256 electionId);

    uint public electionId;
    uint public countCandidates;
    bool public isActive;
    uint public endElectionTime;

    // Constructor to initialize the voting start and end dates
    constructor(uint256 _electionId ,address _owner, uint _duration) Ownable(_owner) {
        electionId = _electionId;
        isActive = true;
        endElectionTime = block.timestamp +  _duration;
    }

    // Add a candidate to the list
    function addCandidate(string memory name, string memory party) public onlyOwner returns(uint) {
        require(isCandidate[name] == false, "DUPLICATE");
        countCandidates++;
        candidates[countCandidates] = Candidate(countCandidates, name, party, 0);
        isCandidate[name] = true;
        emit NewCandidate(electionId, countCandidates, name, party);

        return countCandidates;
    }

    function activateVote() public onlyOwner() {
        isActive = true;
    }
    
    function pause () public onlyOwner() {
        require(isActive == true, "Election is already paused");
        isActive = false;
        emit Pause(electionId);

    }

    function unpause () public onlyOwner() {
        require(isActive == false && block.timestamp <= endElectionTime, "Unable to unpaused");
        isActive = true;
        emit Unpause(electionId);
    }

    // Vote for a candidate
    function vote(uint _candidateId) public {
        require(isActive, "Election is not active");
        require(block.timestamp <= endElectionTime, "Election is ended");
        require(_candidateId > 0 && _candidateId <= countCandidates, "Invalid candidate ID");
        require(!voters[msg.sender], "You have already voted");
        voters[msg.sender] = true;
        candidates[_candidateId].voteCount++;

        emit NewVote(electionId, msg.sender, _candidateId, block.timestamp);
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
