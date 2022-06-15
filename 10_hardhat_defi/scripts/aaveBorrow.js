const { getNamedAccounts, ethers } = require('hardhat');
const { getWeth, AMOUNT } = require('../scripts/getWeth');

async function main() {
  // protocol treats everything as an ERC20 token
  await getWeth();
  const { deployer } = await getNamedAccounts();
  // abi, address
  // Lending Pool Address Provider:
  // lending pool address Provider https://docs.aave.com/developers/v/2.0/deployed-contracts/deployed-contracts :
  // 0xb53c1a33016b2dc2ff3653530bff1848a515c8c5
  // lending pool
  const lendingPool = await getLendingPool(deployer);
  console.log(`Lending pool address ${lendingPool.address}`);

  // deposit
  // get weth token
  const wethTokenAddress = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2';
  // approve
  await approveERC20(wethTokenAddress, lendingPool.address, AMOUNT, deployer);
  console.log('Depositing...');
  await lendingPool.deposit(wethTokenAddress, AMOUNT, deployer, 0);
  console.log('Deposited...');
}

async function getLendingPool(account) {
  const lendingPoolAddressesProvider = await ethers.getContractAt(
    'ILendingPoolAddressesProvider',
    '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
    account
  );
  const lendingPoolAddress =
    await lendingPoolAddressesProvider.getLendingPool();

  // get contract
  const lendingPool = await ethers.getContractAt(
    'ILendingPool',
    lendingPoolAddress,
    account
  );
  return lendingPool;
}

async function approveERC20(
  erc20Address,
  spenderAddress,
  amountToSpend,
  account
) {
  const erc20Token = await ethers.getContractAt(
    'IERC20',
    erc20Address,
    account
  );
  const tx = await erc20Token.approve(spenderAddress, amountToSpend);
  await tx.wait(1);
  console.log(`Approved!`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
