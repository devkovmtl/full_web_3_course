// https://rinkeby.etherscan.io/token/0xc778417e063141139fce010982780140aa0cd5ab#writeContract
// 0xc778417E063141139Fce010982780140Aa0cD5Ab
// https://etherscan.io/token/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2
// 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2
const { getNamedAccounts, ethers } = require('hardhat');

const AMOUNT = ethers.utils.parseEther('0.02');

async function getWeth() {
  // to interact we need a contract
  const { deployer } = await getNamedAccounts();
  // call deposit function on the weth contract
  // abi and contract address
  const iWeth = await ethers.getContractAt(
    'IWeth',
    '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    deployer
  );
  const tx = await iWeth.deposit({ value: AMOUNT });
  await tx.wait(1);

  const wethBalance = await iWeth.balanceOf(deployer);

  console.log(`Got ${wethBalance.toString()} WETH`);
}

module.exports = { getWeth, AMOUNT };
