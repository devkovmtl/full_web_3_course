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

  // Borrow
  /// how much we have borrowed and how much we have in collateral
  // how much we can borrow
  let { availableBorrowsETH, totalDebtETH } = await getBorrowUserData(
    lendingPool,
    deployer
  );
  // what the conversion range on DAI is?
  const daiPrice = await getDaiPrice();
  const amountDaiToBorrow =
    availableBorrowsETH.toString() * 0.95 * (1 / daiPrice.toNumber());

  console.log(`You can borrow ${amountDaiToBorrow} DAI`);
  const amountDaiToBorrowWei = ethers.utils.parseEther(
    amountDaiToBorrow.toString()
  );
  // https://etherscan.io/token/0x6b175474e89094c44da98b954eedeac495271d0f
  const daiTokenAddress = '0x6B175474E89094C44Da98b954EedeAC495271d0F';
  await borrowDai(daiTokenAddress, lendingPool, amountDaiToBorrowWei, deployer);

  await getBorrowUserData(lendingPool, deployer);
}

async function borrowDai(
  daiAddress,
  lendingPool,
  amountDaiToBorrowWei,
  account
) {
  const borrowTx = await lendingPool.borrow(
    daiAddress,
    amountDaiToBorrowWei,
    1,
    0,
    account
  );
  await borrowTx.wait(1);
  console.log(`You've borrowed!`);
}

async function getDaiPrice() {
  // https://docs.chain.link/docs/ethereum-addresses/
  const daiEthPriceFeed = await ethers.getContractAt(
    'AggregatorV3Interface',
    '0x773616E4d11A78F511299002da57A0a94577F1f4'
  );

  const price = (await daiEthPriceFeed.latestRoundData())[1];
  console.log(`The DAI/ETH price is ${price.toString()}`);
  return price;
}

async function getBorrowUserData(lendingPool, account) {
  const { totalCollateralETH, totalDebtETH, availableBorrowsETH } =
    await lendingPool.getUserAccountData(account);

  console.log(`You have ${totalCollateralETH} worth of ETH deposited.`);
  console.log(`You have ${totalDebtETH} worth of ETH borrowed.`);
  console.log(`You can borrow ${availableBorrowsETH} worth of ETH`);
  return { availableBorrowsETH, totalDebtETH };
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
