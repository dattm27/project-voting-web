// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "./Election.sol";

contract ElectionFactory is Initializable, AccessControlUpgradeable {
    uint256 public electionCreated ;
    bytes32 public constant OPERATOR = keccak256("OPERATOR");

    mapping (uint256 => address) electionAddr;

    event NewElection(uint256 id,address indexed election, address owner );
    
       /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    
    function initialize(address _endpoint) public initializer {
        require(_endpoint != address(0)); 
        _grantRole(OPERATOR, _endpoint);
        electionCreated = 0 ;
    }

    function createElection  (address _owner) public  onlyRole(OPERATOR)  {
        uint256 _electionId = ++ electionCreated;
        Election _election = new Election(_electionId ,_owner);
        electionAddr[_electionId] = address(_election);
        emit NewElection(_electionId, address(_election), _owner);
    
    }

    function getElectionAddr(uint256 _id) public view returns (address){
        require(_id > 0 && _id <= electionCreated, "invalid id");
        return electionAddr[_id];
    }
}