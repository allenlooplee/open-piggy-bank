# Open Piggy Bank

This smart contract simulates a traditional piggy bank, enabling users to save and manage their funds towards a specific goal in a secure way. This smart contract, as well as its tests, was developed with Remix IDE.

## Contract Design

### Members

1. **owner variable**: The owner who deploys this contract is the only user of it. This cannot be changed after the deployment.
2. **goal variable**: The goal of savings is set through the constructor during deployment and can be modified through the changeGoal function.
3. **balance variable**: The current balance can be viewed by anyone without incurring a gas cost.
4. **deposit payable function**: The owner can deposit any amount of funds to the piggy bank at any time. Only the owner allowed to make deposits.
5. **withdraw function**: After reaching the goal, the owner can withdraw their entire balance from the piggy bank. Partial withdrawals are not permitted.
6. **changeGoal function**: The goal can only be changed by the owner before any deposit or after withdrawal.

### Implementation Considerations

1. [Prefer call function with Checks-Effects-Interactions pattern](https://consensys.io/diligence/blog/2019/09/stop-using-soliditys-transfer-now/) ([Updated syntax of call function](https://ethereum.stackexchange.com/questions/19341/address-send-vs-address-transfer-best-practice-usage))
2. [Use uint256 instead of uint](https://ethereum.stackexchange.com/questions/43241/why-write-uint256-instead-of-uint-if-theyre-the-same-thing)
3. [Solidity style guide](https://docs.soliditylang.org/en/latest/style-guide.html)

## Unit Testing

### Scenarios

1. When caller is owner
   - Goal is a positive number
   - Goal is zero
   - Test deposit
   - Test withdraw when goal is reached
   - Test withdraw when goal is not reached
   - [Test changeGoal for a couple of owner scenarios](https://github.com/allenlooplee/open-piggy-bank/issues/8)
2. When caller is not owner
   - Test deposit
   - Test withdraw
   - [Test changeGoal](https://github.com/allenlooplee/open-piggy-bank/issues/8)

### Side Notes

1. Unit tests can be written in both Solidity and JavaScript.
2. It's simple to write unit tests in Solidity with Remix ID's Solidity Unit Testing plugin. But it seems limitted when I want to test withdraw when goal is not reached.
3. It's powerful to write unit tests in JavaScript with Chai, Mocha and Hardhat-ethers. But you need to equip yourself with a bunch of knowledge and skills.

### Useful Guides

1. [Testing using Chai & Mocha](https://remix-ide.readthedocs.io/en/latest/testing_using_Chai_%26_Mocha.html)
2. [How to Unit Test a Smart Contract](https://docs.alchemy.com/docs/how-to-unit-test-a-smart-contract)
3. [Testing contracts](https://hardhat.org/tutorial/testing-contracts)
4. [Chai matchers](https://ethereum-waffle.readthedocs.io/en/latest/matchers.html)
5. [Unit Testing a Solidity Smart Contract using Chai & Mocha with TypeScript](https://dev.to/carlomigueldy/unit-testing-a-solidity-smart-contract-using-chai-mocha-with-typescript-3gcj)
6. [Chai Expect/Should](https://www.chaijs.com/api/bdd/)

## Workflows

### Source Control

This repo was created with Remix IDE's basic template. When working with this repo in the Remix IDE, follow the below steps:

1. Make sure you open the Remix IDE at **https://remix.ethereum.org/** instead of [other scam URLs](https://medium.com/remix-ide/remix-in-youtube-crypto-scams-71c338da32d)
2. Make sure you have activated the DGIT plugin
3. Make sure you have filled in your name, your email and the GitHub token in the Settings page
4. Make sure you have added or selected the right git remote in the DGIT plugin
5. Clone this repo in the DGIT plugin, which will create a workspace for this repo in the DGIT plugin
6. Create a new branch in the DGIT plugin before you make any changes to the cloned repo in the DGIT plugin (normally make sure the current branch is master before creating a new branch)
7. Create or modify, and test the code
8. Make sure the remote branch matches the local branch in the DGIT plugin
9. Commit and push your changes to the remote branch in the DGIT plugin

### Deployment

When deploying the PiggyBank contract in the Remix IDE with MetaMask, follow the below steps:

1. Make sure MetaMask is installed and configured in the browser
2. Make sure you have enough funds in your account on the target chain/network
3. Make sure PiggyBank is up to date by fetching it from GitHub in the DGIT plugin
4. Make sure PiggyBank is compiled in the Solidity compiler view
5. Open the Deploy & run transactions view in the Icon Panel
6. Select *Injected Provided - MetaMask* in the Environment
7. Select your account in the Account. You can double check your account balance right next to your account address.
8. Select the compiled PiggyBank in the Contract
9. Type the desired goal (the unit is Wei) in the textfield right next to the Deploy button, and then press Deploy button. MetaMask will be opened for your confirmation.
10. When PiggyBank is deployed, you find a *view on etherscan* link and a log entry in the Remix IDE's Terminal, and an item in the Deployed/Unpinned Contracts of the Deploy & run transactions view.
11. Expand the item and you'll find the deployed PiggyBank is ready for your interaction.

