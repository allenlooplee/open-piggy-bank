// SPDX-License-Identifier: GPL-3.0
        
pragma solidity >=0.4.22 <0.9.0;

// This import is automatically injected by Remix
import "remix_tests.sol"; 

// This import is required to use custom transaction context
// Although it may fail compilation in 'Solidity Compiler' plugin
// But it will work fine in 'Solidity Unit Testing' plugin
import "remix_accounts.sol";
import "../contracts/PiggyBank.sol";

// File name has to end with '_test.sol', this file can contain more than one testSuite contracts
contract PiggyBankOwnerTest is PiggyBank {
    constructor() PiggyBank(100) {}

    /// 'beforeAll' runs before all other tests
    /// More special functions are: 'beforeEach', 'beforeAll', 'afterEach' & 'afterAll'
    function beforeAll() public {}

    function checkInitialValues() public {
        // Use 'Assert' methods: https://remix-ide.readthedocs.io/en/latest/assert_library.html
        Assert.equal(owner, TestsAccounts.getAccount(0), "owner should be account-0");
        Assert.equal(goal, 100, "goal should be 100");
        Assert.equal(balance, 0, "balance should be 0");
    }

    /// #sender: account-0
    /// #value: 20
    function testDeposit() public payable {
        Assert.equal(msg.value, 20, "value should be 20");
        Assert.equal(balance, 0, "balance should be 0 before deposit");
        deposit();
        Assert.equal(balance, 20, "balance should be 20 after deposit");
    }

    /// #sender: account-0
    /// #value: 80
    function testDepositToReachGoal() public payable {
        Assert.equal(msg.value, 80, "value should be 80");
        Assert.equal(balance, 20, "balance should be 20 before deposit");
        deposit();
        Assert.equal(balance, goal, "goal should be reached after deposit");
    }

    /// #sender: account-0
    function testWithdraw() public {
        Assert.equal(balance, goal, "goal should be reached");
        Assert.equal(balance, 100, "balance should be 100 before withdraw");
        withdraw();
        Assert.equal(balance, 0, "balance should be 0 after withdraw");
    }

    function testChangeGoal() public {
        Assert.equal(goal, 100, "goal should be 100 before changing it");
        changeGoal(150);
        Assert.equal(goal, 150, "goal should be 150 after changing it");
    }
}
    