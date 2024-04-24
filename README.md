# Open Piggy Bank

This smart contract simulates a traditional piggy bank, enabling users to save and manage their funds towards a specific goal in a secure way.

## Contract design ideas

1. **Owner**: The owner who deploys this contract is the only user of it. This cannot be changed after the deployment.
2. **Goal**: The goal of savings is set through the constructor during deployment and remains fixed; once deployed, the goal cannot be modified or updated.
3. **Deposit**: The owner can deposit any amount of funds to the piggy bank at any time. Only the owner allowed to make deposits.
4. **Withdraw**: After reaching the goal, the owner can withdraw their entire balance from the piggy bank. Partial withdrawals are not permitted.
5. **Balance**: The current balance can be viewed by anyone without incurring a gas cost.

## Workflows

### Source control

This repo was created with Remix IDE's basic template. When working with this repo in the Remix IDE, follow the below steps:

1. Make sure you open the Remix IDE at **https://remix.ethereum.org/** instead of [other scam URLs](https://medium.com/remix-ide/remix-in-youtube-crypto-scams-71c338da32d)
2. Make sure you have activated the DGIT plugin
3. Make sure you have filled in your name, your email and the GitHub token in the Settings page
4. Make sure you have added or selected the right git remote in the DGIT plugin
5. Clone this repo in the DGIT plugin, which will create a workspace for this repo in the DGIT plugin
6. Create a new branch in the DGIT plugin before you make any changes to the cloned repo in the DGIT plugin
7. Change the code
8. Make sure the remote branch matches the local branch in the DGIT plugin
9. Commit and push your changes to the remote branch in the DGIT plugin
