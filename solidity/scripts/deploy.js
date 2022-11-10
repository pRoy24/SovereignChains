// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {

  const ScCommunityPlot = await hre.ethers.getContractFactory("SCCommunityPlot");
  const commPlot = await ScCommunityPlot.deploy("BNB Isles", "bnbisles", "https://sovereign-chains-meta.s3.amazonaws.com");

  await commPlot.deployed();

  console.log(
    `Community Plot deployed to ${commPlot.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
