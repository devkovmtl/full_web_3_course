import { ethers } from 'ethers';
import * as fs from 'fs-extra';
import 'dotenv/config';

async function main() {
  const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL!);
  // get wallet and private key to // private key comes from ganache
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);
  // wallet need to be connected
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
  // wait 1 block to check if the contract is attached to the chain
  console.log('Contract deployed...');
  //   console.log(contract);
  const deploymentReceipt = await contract.deployTransaction.wait(1);
  console.log(`Contract Address: ${contract.address}`);

  // // INTERACT WITH CONTRACT
  // contract comes from contractFactory
  const currentFavoriteNumber = await contract.retrieve();
  console.log(`Current favorite number: ${currentFavoriteNumber.toString()}`);
  const transactionResponse = await contract.store('7'); // pass variable as string
  const transactionReceipt = await transactionResponse.wait(1);
  const updatedFavoriteNumber = await contract.retrieve();
  console.log(`Updated favorite number: ${updatedFavoriteNumber.toString()}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
