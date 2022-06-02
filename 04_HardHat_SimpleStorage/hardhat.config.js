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
    localhost: {
      //when we run  yarn harhdat node localhost
      url: 'http://127.0.0.1:8545/',
      chainId: 31337, // same chainid as hardhat
    },
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
