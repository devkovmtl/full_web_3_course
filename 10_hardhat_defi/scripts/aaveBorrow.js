const { getNamedAccounts, ethers } = require('hardhat');
const { getWeth } = require('../scripts/getWeth');

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

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
