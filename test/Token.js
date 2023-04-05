const { ethers } = require("hardhat");
const { expect } = require("chai");

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), "ether");
};

describe("Token", () => {
  let token, accounts, deployer;

  beforeEach(async () => {
    // Fetch Token from blockchain
    const Token = await ethers.getContractFactory("Token");
    token = await Token.deploy("Almighty", "ALM", "1000000");

    accounts = await ethers.getSigners();
    deployer = accounts[0];
  });

  describe("Deployment", () => {
    const name = "Almighty";
    const symbol = "ALM";
    const decimals = 18;
    const totalSupply = tokens("1000000");

    it("has correct name", async function () {
      expect(await token.name()).to.equal(name);
    });

    it("has correct symbol", async function () {
      expect(await token.symbol()).to.equal(symbol);
    });

    it("has correct decimals", async function () {
      expect(await token.decimals()).to.equal(decimals);
    });

    it("has correct totalSupply", async () => {
      expect(await token.totalSupply()).to.equal(totalSupply);
    });

    it("asigns totalSupply to deployer", async () => {
      expect(await token.balanceOf(deployer.address)).to.equal(totalSupply);
    });
  });
});
