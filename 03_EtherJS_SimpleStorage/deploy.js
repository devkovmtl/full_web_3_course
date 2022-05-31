const fs = require('fs');
const { ethers } = require('ethers');

async function main() {
  // compile them in code
  // compile them separately
  // connect to ganache
  // http://0.0.0.0:7545
  // connect to the url

  const provider = new ethers.providers.JsonRpcProvider('http://0.0.0.0:7545');
  // get wallet and private key to // private key comes from ganache
  const wallet = new ethers.Wallet(
    '31fc8e7b15bafd0d1c2e05e58a3865a12f0bdf093de496a85f4e07255df0927c',
    provider
  );
  // read the ABI
  const abi = fs.readFileSync('./SimpleStorage_sol_SimpleStorage.abi', 'utf8');
  const binary = fs.readFileSync(
    './SimpleStorage_sol_SimpleStorage.bin',
    'utf8'
  );

  // use to deploy contract
  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  console.log('Deploying wait...');
  const contract = await contractFactory.deploy();
  console.log('Contract deployed...');
  console.log(contract);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
