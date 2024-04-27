// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

contract PiggyBank {
    address public owner;
    uint256 public goal;
    uint256 public balance;

    event Deposit(address indexed depositor, uint256 amount);
    event Withdrawal(address indexed withdrawer, uint256 amount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Owner only.");
        _;
    }

    // Ether unit of goal is Wei
    constructor(uint256 goal_) {
        require(goal_ > 0, "Goal is not a positive number.");
        owner = msg.sender;
        goal = goal_;
    }

    function deposit() public payable onlyOwner {
        balance += msg.value;
        emit Deposit(msg.sender, msg.value);
    }

    function withdraw() public onlyOwner {
        require(balance >= goal, "Goal is not reached.");

        // Use Checks-Effects-Interactions pattern to preventing reentrancy
        uint256 amount = balance;
        balance = 0;
        (bool success, ) = owner.call{value: amount}("");
        require(success, "Withdrawal failed.");

        emit Withdrawal(owner, amount);
    }
}