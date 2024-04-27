const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("PiggyBank", function() {
    let piggyBank;
    let owner;
    let addr1;

    beforeEach(async () => {
        const PiggyBank = await ethers.getContractFactory("PiggyBank");
        piggyBank = await PiggyBank.deploy(100);

        const [signer1, signer2] = await ethers.getSigners();
        owner = signer1;
        addr1 = signer2;
    });

    it("should deploy and set the state correctly", async function () {
        // Note the usage of checking public variables with await
        expect(await piggyBank.owner()).to.equal(owner.address);
        expect(await piggyBank.goal()).to.equal(100);
        expect(await piggyBank.balance()).to.equal(0);
    });

    it("should reject deploy if goal is 0", async function () {
        const PiggyBank = await ethers.getContractFactory("PiggyBank");

        await expect(PiggyBank.deploy(0)).to.be.reverted;
    });

    it("should accept deposit from the owner", async function () {
        expect(await piggyBank.balance()).to.equal(0);
        // Note the usage of sending ethers by calling parameterless payable function
        await piggyBank.deposit({value: 20});
        expect(await piggyBank.balance()).to.equal(20);
    });

    it("should accept withdrawal from the owner when goal is reached", async function () {
        expect(await piggyBank.balance()).to.equal(0);
        await piggyBank.deposit({value: 100});
        expect(await piggyBank.balance()).to.equal(100);
        await piggyBank.withdraw();
        expect(await piggyBank.balance()).to.equal(0);
    });

    it("should reject withdrawal from the owner when goal is not reached", async function () {
        // Note the usage of detecting error with "to.be.reverted"
        await expect(piggyBank.withdraw()).to.be.reverted;
    });

    it("should reject deposit from non-owner", async function () {
        // Note the usage of calling a function with a different account
        await expect(piggyBank.connect(addr1).deposit({value: 20})).to.be.reverted;
    });

    it("should reject withdrawal from non-owner", async function () {
        await expect(piggyBank.connect(addr1).withdraw()).to.be.reverted;
    });
});