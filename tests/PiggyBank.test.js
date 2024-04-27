const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("PiggyBank", function() {
    it("should deploy and set the state correctly", async function () {
        const PiggyBank = await ethers.getContractFactory("PiggyBank");
        const piggyBank = await PiggyBank.deploy(100);
        const [owner] = await ethers.getSigners();

        expect(await piggyBank.owner()).to.equal(owner.address);
        expect(await piggyBank.goal()).to.equal(100);
        expect(await piggyBank.balance()).to.equal(0);
    });

    it("should accept deposit from the owner", async function () {
        const PiggyBank = await ethers.getContractFactory("PiggyBank");
        const piggyBank = await PiggyBank.deploy(100);
        const [owner] = await ethers.getSigners();

        expect(await piggyBank.balance()).to.equal(0);
        await piggyBank.deposit({value: 20});
        expect(await piggyBank.balance()).to.equal(20);
    });

    it("should accept withdrawal from the owner when goal is reached", async function () {
        const PiggyBank = await ethers.getContractFactory("PiggyBank");
        const piggyBank = await PiggyBank.deploy(100);
        const [owner] = await ethers.getSigners();

        expect(await piggyBank.balance()).to.equal(0);
        await piggyBank.deposit({value: 100});
        expect(await piggyBank.balance()).to.equal(100);
        await piggyBank.withdraw();
        expect(await piggyBank.balance()).to.equal(0);
    });

    it('should reject withdrawal from the owner when goal is not reached', async function () {
        const PiggyBank = await ethers.getContractFactory('PiggyBank');
        const piggyBank = await PiggyBank.deploy(100);
        const [owner] = await ethers.getSigners();

        await expect(piggyBank.withdraw()).to.be.reverted;
    });

    it("should reject deposit from non-owner", async function () {
        const PiggyBank = await ethers.getContractFactory("PiggyBank");
        const piggyBank = await PiggyBank.deploy(20);
        const [owner, addr1] = await ethers.getSigners();

        await expect(piggyBank.connect(addr1).deposit({value: 20})).to.be.reverted;
    });

    it("should reject withdrawal from non-owner", async function () {
        const PiggyBank = await ethers.getContractFactory("PiggyBank");
        const piggyBank = await PiggyBank.deploy(20);
        const [owner, addr1] = await ethers.getSigners();

        await expect(piggyBank.connect(addr1).withdraw()).to.be.reverted;
    });
});