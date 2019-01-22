pragma solidity ^0.5.0;

//import "./Ownable.sol";
import "./EmergencyStop.sol";

contract Referendum is EmergencyStop {
    
    struct Candidate {
        string name;
        uint voteCount;
    }
    
    struct Voter {
        bool voted;
        uint voteIndex;
        uint candidatesID;
    }
    
    address public owner;
    string public name;
    mapping(address => Voter) public voters;
    Candidate[] public candidates;
    
    event ReferendumResult(string name, uint voteCount);
    
    constructor (string memory _name,string memory candidate1, string memory candidate2) public {
        owner = msg.sender;
        name = _name;
            
        candidates.push(Candidate(candidate1, 0));
        candidates.push(Candidate(candidate2, 0));
    }
    
    function vote(uint voteIndex, uint candidatesID) public stoppedInEmergency {
        require(!voters[msg.sender].voted);
        
        voters[msg.sender].voted = true;
        voters[msg.sender].voteIndex = voteIndex;
        voters[msg.sender].candidatesID = candidatesID;
    }
}
