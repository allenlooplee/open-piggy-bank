// SPDX-License-Identifier: MIT

pragma solidity >=0.8.2 <0.9.0;

contract PiggyBank {
    address public owner;
    uint public withdrawalThreshold;

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action.");
        _;
    }

    constructor(uint _withdrawalThreshold) {
        owner = msg.sender;
        withdrawalThreshold = _withdrawalThreshold;
    }
}