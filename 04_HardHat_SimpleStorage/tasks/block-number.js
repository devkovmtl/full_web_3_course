// get current block number of blockchain
const { task } = require('hardhat/config');

task('blockNumber', 'Prints the current block number').setAction(
  async (taskArgs, hre) => {
    // hre harhdat runtime enviromement
    const blockNumber = await hre.ethers.provider.getBlockNumber();
    console.log(`Current Block Number: ${blockNumber}`);
  }
);

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
// task('accounts', 'Prints the list of accounts', async (taskArgs, hre) => {
//     const accounts = await hre.ethers.getSigners();

//     for (const account of accounts) {
//       console.log(account.address);
//     }
//   });

module.exports = {};
