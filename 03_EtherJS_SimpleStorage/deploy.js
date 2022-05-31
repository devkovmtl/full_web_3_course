require('dotenv').config();
const fs = require('fs');
const { ethers } = require('ethers');

async function main() {
  // compile them in code
  // compile them separately
  // connect to ganache
  // http://0.0.0.0:7545
  // connect to the url

  const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
  // get wallet and private key to // private key comes from ganache
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
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
  //   console.log('Deployment transaction: ');
  //   console.log(contract.deployTransaction);
  //   console.log('Deployment receipt: ');
  //   console.log(deploymentReceipt);

  //// SEND RAW TRANSACTION
  //   console.log('Deploy with only transaction data ');
  //   // to get the nonce
  //   const txCount = await wallet.getTransactionCount();
  //   const tx = {
  //     nonce: txCount, // nmbr of txCount +1 on ganache
  //     gasPrice: 20000000000, // ganache gas price
  //     gasLimit: 1000000,
  //     to: null,
  //     value: 0, // create contract
  //     data: '0x608060405234801561001057600080fd5b5061079f806100206000396000f3fe608060405234801561001057600080fd5b50600436106100625760003560e01c80631f1094e7146100675780632e64cec114610098578063471f7cdf146100b65780636057361d146100d45780636f760f41146100f05780638bab8dd51461010c575b600080fd5b610081600480360381019061007c91906103bc565b61013c565b60405161008f929190610491565b60405180910390f35b6100a06101f8565b6040516100ad91906104c1565b60405180910390f35b6100be610201565b6040516100cb91906104c1565b60405180910390f35b6100ee60048036038101906100e991906103bc565b610207565b005b61010a60048036038101906101059190610611565b610211565b005b6101266004803603810190610121919061066d565b6102a1565b60405161013391906104c1565b60405180910390f35b6002818154811061014c57600080fd5b9060005260206000209060020201600091509050806000015490806001018054610175906106e5565b80601f01602080910402602001604051908101604052809291908181526020018280546101a1906106e5565b80156101ee5780601f106101c3576101008083540402835291602001916101ee565b820191906000526020600020905b8154815290600101906020018083116101d157829003601f168201915b5050505050905082565b60008054905090565b60005481565b8060008190555050565b600260405180604001604052808381526020018481525090806001815401808255809150506001900390600052602060002090600202016000909190919091506000820151816000015560208201518160010190805190602001906102779291906102cf565b5050508060018360405161028b9190610752565b9081526020016040518091039020819055505050565b6001818051602081018201805184825260208301602085012081835280955050505050506000915090505481565b8280546102db906106e5565b90600052602060002090601f0160209004810192826102fd5760008555610344565b82601f1061031657805160ff1916838001178555610344565b82800160010185558215610344579182015b82811115610343578251825591602001919060010190610328565b5b5090506103519190610355565b5090565b5b8082111561036e576000816000905550600101610356565b5090565b6000604051905090565b600080fd5b600080fd5b6000819050919050565b61039981610386565b81146103a457600080fd5b50565b6000813590506103b681610390565b92915050565b6000602082840312156103d2576103d161037c565b5b60006103e0848285016103a7565b91505092915050565b6103f281610386565b82525050565b600081519050919050565b600082825260208201905092915050565b60005b83811015610432578082015181840152602081019050610417565b83811115610441576000848401525b50505050565b6000601f19601f8301169050919050565b6000610463826103f8565b61046d8185610403565b935061047d818560208601610414565b61048681610447565b840191505092915050565b60006040820190506104a660008301856103e9565b81810360208301526104b88184610458565b90509392505050565b60006020820190506104d660008301846103e9565b92915050565b600080fd5b600080fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b61051e82610447565b810181811067ffffffffffffffff8211171561053d5761053c6104e6565b5b80604052505050565b6000610550610372565b905061055c8282610515565b919050565b600067ffffffffffffffff82111561057c5761057b6104e6565b5b61058582610447565b9050602081019050919050565b82818337600083830152505050565b60006105b46105af84610561565b610546565b9050828152602081018484840111156105d0576105cf6104e1565b5b6105db848285610592565b509392505050565b600082601f8301126105f8576105f76104dc565b5b81356106088482602086016105a1565b91505092915050565b600080604083850312156106285761062761037c565b5b600083013567ffffffffffffffff81111561064657610645610381565b5b610652858286016105e3565b9250506020610663858286016103a7565b9150509250929050565b6000602082840312156106835761068261037c565b5b600082013567ffffffffffffffff8111156106a1576106a0610381565b5b6106ad848285016105e3565b91505092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600060028204905060018216806106fd57607f821691505b6020821081036107105761070f6106b6565b5b50919050565b600081905092915050565b600061072c826103f8565b6107368185610716565b9350610746818560208601610414565b80840191505092915050565b600061075e8284610721565b91508190509291505056fea2646970667358221220d6d3d58d39d325f5b81e66c983ea7de5fac6f89ebca9b0852504c989d265774964736f6c634300080e0033', // binary contract
  //     chainId: 1337, // network id on ganache 31337
  //   };
  //   // we need to sent our transaction
  //   const sentTxResponse = await wallet.sendTransaction(tx);
  //   await sentTxResponse.wait(1);
  //   console.log(sentTxResponse);

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