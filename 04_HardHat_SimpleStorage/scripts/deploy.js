// imports
const { ethers, run, network } = require('hardhat');

// async main
async function main() {
  // grab contract factory
  const SimpleStorageFactory = await ethers.getContractFactory('SimpleStorage');
  console.log('Deploying contract...');
  const simpleStorage = await SimpleStorageFactory.deploy();
  await simpleStorage.deployed();
  console.log(`Deployed contract to: ${simpleStorage.address}`);
  // what happens when we deploy to our hardhat network
  // console.log(network.config);
  // verify on testnat not default
  // 4 => rinkeby
  if (network.config.chainId === 4 && process.env.ETHERSCAN_API_KEY) {
    await simpleStorage.deployTransaction.wait(6); // wait 6 blocks
    await verify(simpleStorage.address, []);
  }

  // interact with contract
  const currentValue = await simpleStorage.retrieve(); // from sol
  console.log(`Current Value is ${currentValue}`);
  // update
  const transactionResponse = await simpleStorage.store(7);
  await transactionResponse.wait(1);
  const updatedValue = await simpleStorage.retrieve();
  console.log(`Updated Value is ${updatedValue}`);
}

async function verify(contractAddress, args) {
  // automatically verify contract we need to install plugins
  console.log('Verifyin contract ...');
  try {
    // run any hardhat task (verifyTsak:verifyParam)
    await run('verify:verify', {
      address: contractAddress,
      constructorArguments: args,
    });
  } catch (err) {
    if (err.message.toLowerCase().includes('already verified')) {
      console.log('Already Verified!');
    } else {
      console.log(err);
    }
  }
}

// main
main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
