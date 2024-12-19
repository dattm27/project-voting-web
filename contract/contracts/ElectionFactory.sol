// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "./Election.sol";

contract ElectionFactory is Initializable, AccessControlUpgradeable {
    uint256 public electionCreated ;
    bytes32 public constant OPERATOR = keccak256("OPERATOR");

    mapping (uint256 => address) electionAddr;
    mapping (string title => bool) existingElection;
    event NewElection(uint256 id, string title, address indexed election, address owner,  uint duration );
    
       /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    
    function initialize(address _endpoint) public initializer {
        require(_endpoint != address(0)); 
        _grantRole(OPERATOR, _endpoint);
        electionCreated = 0 ;
    }

    function createElection  (string memory _title, uint duration) public {
        require(existingElection[_title] == false, "DUPLICATE");
        uint256 _electionId = ++ electionCreated;
        Election _election = new Election(_electionId ,msg.sender, duration);
        existingElection[_title] = true;
        electionAddr[_electionId] = address(_election);
        emit NewElection(_electionId, _title, address(_election), msg.sender, duration);
    
    }


    function getElectionAddr(uint256 _id) public view returns (address){
        require(_id > 0 && _id <= electionCreated, "invalid id");
        return electionAddr[_id];
    }
}