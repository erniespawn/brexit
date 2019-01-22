pragma solidity ^0.5.0;

import "./Ownable.sol";

contract EmergencyStop is Ownable {

    bool isStopped = false;

    modifier stoppedInEmergency {
        require(!isStopped);
        _;
    }

    modifier onlyWhenStopped {
        require(isStopped);
        _;
    }

    modifier onlyAuthorized {
        // Check for authorization of msg.sender here
        _;
    }

    function stopContract() public onlyAuthorized {
        isStopped = true;
    }

    function resumeContract() public onlyAuthorized {
        isStopped = false;
    }

    function deposit() public payable stoppedInEmergency {
        // Deposit logic happening here
    }

    function emergencyWithdraw() public view onlyWhenStopped {
        // Emergency withdraw happening here
    }
    
    function kill() public {
        if (msg.sender == owner) selfdestruct(owner);
    }
}