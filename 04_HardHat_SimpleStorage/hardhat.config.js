require('@nomiclabs/hardhat-waffle');
require('@nomiclabs/hardhat-etherscan');
require('dotenv').config();
require('./tasks/block-number');
// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

const RINKEBY_RPC_URL = process.env.RINKEBY_RPC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY; //meta
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;

module.exports = {
  defaultNetwork: 'hardhat',
  networks: {
    rinkeby: {
      // gives the rpc url to connect to rinkbe
      url: RINKEBY_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 4, //https://chainlist.org/
    },
  },
  solidity: '0.8.8',
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
};
