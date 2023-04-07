const { ethers } = require("hardhat");
const { expect } = require("chai");

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), "ether");
};

describe("Token", () => {
  let deployer, feeAccount, exchange;
  const feePercent = 10;

  beforeEach(async () => {
    accounts = await ethers.getSigners();
    deployer = accounts[0];
    feeAccount = accounts[1];

    const Exchange = await ethers.getContractFactory("Exchange");
    exchange = await Exchange.deploy(feeAccount.address, feePercent);
  });

  describe("Deployment", () => {
    it("tracks the fee account", async function () {
      expect(await exchange.feeAccount()).to.equal(feeAccount.address);
    });
    it("tracks the fee percent", async function () {
      expect(await exchange.feePercent()).to.equal(feePercent);
    });
  });
});
