# Blockchain, Solidity, FullStack Web 3 Development in JavaScript

## Blockchain basics:

<strong>Smart Contract</strong>: set of instruction between parties, written in code. Executed on the blockchain.
Blockchain by themself can't interact with data from realworld. The Oracle problem.
Blockchain need external data, and external computation this is where oracle comes in.

<strong>Oracle</strong>: any device that deliver data to this decentralize blockchain or run external computation.

To be decentralized we need Decentralized Oracle Network.

Combinning Offchain decentralize logic + Onchain:
Hybrid Smart Contracts: On-Chain + Off-Chain Agreements

<strong>Chainlink</strong>: Decentralized Oracle Network, bring external data and external computation into smart contract
to make sure they are decentralize end to end while giving them the richness that we need.

<strong>Dapp = Decentralized Application = Decentralized Protocol = Smart Contract</strong>
Decentralized Application combination of many smart contract

<strong>Web3</strong> = The permissionless web, with dynamic content. Where decentralized censorship resistant networks run
your agreement and code. It generally is accompanied by the idea of user owned ecosystems, where the protocols your interact with you also own a portion of, instead of solely being the product.

<strong>What is the value of smart contracts ?</strong>
Create trust minimized agreements - Gives rise to <strong>Unbreakable Promises</strong>
Everyhing you do, or interact is some form of agreement or contract in some aspect.
<strong>Agreements / Contracts = Promise</strong>
A smart contract is an agreement, contract or set of instructions that is deployed on a decentralized blockchain.

- Cannot be altered (immutable)
- Automatically executes
- Everyone sees the terms of the agreement

Typically smart contract are in decentralized blockchain and used in combination with a decentralized
oracle network to get real world asset and information.

Smart Contract values:
1 - Decentralized: no centralized intermediary many node operators run blockchains.
2 - Transparency & Flexibility: every body can see what's happening on chain.
Blockchain is pseudoannonymus
3 - Speed & Efficiency: all transaction happen instantially
4 - Security & Immutability: can't be changed.
5 - Counterparty Risk Removal: remove the centralize intermediary
6 - Trust minimized agreements: look at the code and know what's the code will do

#### TestScan Overview:

Transaction Hash: unique identifier that identify the transaction
Status: status of the transaction
Block: block number
Timestamp: When the transaction occured
From: account that initiate the transaction
To: account that receive the transaction
Value: how much amount we send
Transaction Fee: amount paid to the miner for processing the transaction
Gas Price: cost per unit of gas

### GAS: Introduction to Gas (59:00)

All transaction get paid for all the transaction that happened on the blockchain.
Whenever you make a transaction, the 'miners' or 'validators' make a small fee.

<strong>Gas</strong>: unit of computational measurement. The more complex your transaction is the more
gas you have to pay.

### How do blockchains work? (01:05:00)

- [Blockchain Demo](https://andersbrownworth.com/blockchain/)

<strong>Hash</strong>: A unique fixed length string, meant to identify a piece of data.
They are created by placing said data into a "hash function".
<strong>Hash Algorithm</strong>: Function that computes data into a unique hash

<strong>Mining</strong>: The process of finding the "solution" to the blockchain "problem".
Nodes get paid for mining blocks.

<strong>Block</strong>: A list of transaction mined together
Block
<strong>Nonce</strong>: "number used once" to find the "solution" to the blockchain problem.
Data
Hash all 3 of piece of data together to get the hash
(example: Find a value of nonce at block number with the data so that hash start with zero)

<strong>Nonce</strong>: "number used once" to find the "solution" to the blockchain problem.
Also used to define the transaction number for an account/address.

<strong>Blockchain</strong>: combination of block, with prev piece of data, which point at the
previous hash of blockchain.
<strong>Genesis Block</strong>: The first block in a blockchain.
<strong>Decentralized</strong>: Having no single point of authority

### Signin the transaction (01:22:00)

<strong>Private Key</strong>: Only known to the key holder, it's used to 'sign' transactions.
Keep this key secret
With the private key we generate a public key.
<strong>Public key</strong>: derived from private key. Anyone can "see" it, and use it to verify that
a transaction came from you.

We are going to use private key has a password, to digitaly sign transaction. People can verify them with
the public key.
We can use the private key to sign the data.
Using the public key everybody can verify the signature is ours.

To get our address we can take our public key hashwith keccak and take last 20 bytes

<strong>Signing a transaction</strong>
A one way process. Someone with pricate key signs a transaction by their private key being hashaed with
their transaction data.

Anyone can verify this new transaction hash with your public key.

### GAS: Block Rewards & EIP 1559 (01:30:00)

The more people use a chain the more expensive it is to send transactions.
We can set a limit on how much gas we want to spend.
Every transaction on ethereum comes with a base fee.

<strong>Base Fee</strong>: The minium "gas price" to send your transaction.
Priced in Gwei.

[eth-converter](https://eth-converter.com/)

1 ETH = 1000000000 GWEI = 1000000000000000000 WEI

When we send a transaction a little bit of Ethereum is removed for ever (Burnt)

### High-Level Blockchain Fundamentals (01:38:00)

<strong>Node</strong>: single instance in a decentralized network
Anyone can join the network.
Blockchains are resilient, if one node, or several go down, since there several of them it doesn't matter.
Blockchain nodes keep a lists of the transactions that occur.
We can think of a blockchain as a decentralized database.

Consensus: Proof of work vs Proof of stake.
Proof of work and proof of stake fall under consensus umbrella.
<strong>Consensus</strong> mechanism used to agree on the state of blockchain. Specially on a decentralized
system.

Consensus can be breakdown into 2 pieces:
1- Chain Selection algorithm
2- Sybil Resistance mechanism (proof of work mechanism)

Proof of work is known as a sybil resistance mechanism define a way who is the block author.
Sybil resistance protect against user creating a large number of pseudo identities to gain a disproportionally
advantegous influence over the system.

Block Time: How long it takes between block publish.
Block confirmations: number of additional block added on after our transaction when through a block.

Proof of work uses a lot of energy

Gas fees are paid by whoever makes the transaction

Proof of Stake: different sybil resistance mechanism, proof of stake nodes put up collateral as a sybil
resistance mechanism.
In this system miners are called validators, they are just validate other node.

Proof of stake uses much less energy

Layer 1: Base layer blockchain implementation
Layer 2: Any Application built on top of layer 1

## Remix

[remix](https://remix.ethereum.org/)

#### Basic Solidity Types

Create a contract in solidity like a class in javascript:

```solidity
contract Example {

}
```

[Solidity types](https://docs.soliditylang.org/en/latest/types.html)
Most basic types: boolean, uint, int, address, bytes

```solidity
bool hasFavoriteNumber = true;
uint favoriteNumber = 123; // only positive
int anotherNumber = -1; // negative
string favoriteNumberInText  = "Five";
address  myAddress = address(0);
bytes32 favoriteBytes = "cat";
```

Function or methods are self contain module that will execute some specific set of instruction.

```solidity
function store(uint256 _favoriteNumber) public  {
    favoriteNumber = _favoriteNumber;
}
```

Smart contracts have addresses just like our wallet accounts do. Any time you change something on-chain
including making a new contract, it happens in a transaction.

`public`: visibile externally and internally anybody can call
`private`: only visible in the current contract
`external`: only visible externally somebody outside of contract can call
`internal`: only visible internally

The default visibility is internal.

view and pure functions, when called alone don't spend gas, pure functions disallow to read
from blockchain state.

```solidity
function add() public pure returns(uint256) {
    return (1 + 1)
}
```

#### Arrays and Structs

Struct create a new type of varible

```solidity
People public person = People({favoriteNumber: 2, name: "John"});

// struct of people
struct People {
    uint256 favoriteNumber;
    string name;
}
```

Array is data structure that holds a list of other types.

```solidity
struct People {
    uint256 favoriteNumber;
    string name;
}

People[] public peoples;
```

Dynamic array size is not given at the initialisation

#### Memory, Storage and CallData

calldata, and memory means that the variable will only exist temporarly
storage exist even outside of just the function executing

struct, array, mapping need to be given memory or calldata keyword when adding them to different parameter

#### Mapping

mapping: data structure where a key is "mapped" to a single value, like a dictionary

```solidity
mapping(string => uint256) public nameToFavortiteNumber;

...

function addPerson(string calldata _name, uint256 _favoriteNumber) public {
    peoples.push(People({favoriteNumber:_favoriteNumber,name: _name}));
    nameToFavoriteNumber[_name] = _favoriteNumber;
}
```

### Remix Storage Factory (03:05:00)

We can have contract that deploy other contract for us, and we can interact with those contract from other contract.
<strong>composability</strong> ability for smart contract to interact with each other

How does the factory contract know how the contract we want to deploy look like?

```solidity
// SPDX-License-Identifier:MIT
pragma solidity ^0.8.0;

import "./SimpleStorage.sol";

contract StorageFactory {
    // hold other storage
    SimpleStorage[] public simpleStorageArray;

    // function to deploy our simplestorage contract and save it to a global variable
    function createSimpleStorageContract() public {
       SimpleStorage simpleStorage = new SimpleStorage();
       simpleStorageArray.push(simpleStorage);
    }
}
```

Create the contract then save to SimpleStorage array and we can then call function on.

In order to interact with a contract you always going to need 2 things:

- Address of contract
- ABI - Application Binary Interface of contract

```solidity
// interact with simplestorage
// store a favorite number in simple storage
function sfStore(uint256 _simpleStorageIndex, uint256 _simpleStorageNumber) public {
    // - Address of contract
    // - ABI - Application Binary Interface of contract
    // first we pass the address,
    SimpleStorage simpleStorage  = simpleStorageArray[_simpleStorageIndex];
    simpleStorage.store(_simpleStorageNumber);
}

// get favorite number in simple storage
function sfGet(uint256 _simpleStorageIndex) public view returns (uint256) {
    SimpleStorage simpleStorage  = simpleStorageArray[_simpleStorageIndex];
    return simpleStorage.retrieve();
}
```

### Remix Fund Me (03:31:00)

We are going to work with a contract to which we can send some token, and then the owner of contract can withdraw the fund.

#### Sending ETH Through A function and Reverts

Every transaction that we send to a contract will have these fields:

- Nonce: tx count for the account
- Gas Price: price per unit of gas (in wei)
- Gas Limit: max gas that this tx can use
- To: address that the tx is sent to
- Value: amount of wei to send
- Data: what to send to the To address
- v, r, s: components of tx signature

In order to make a function payable we need to use payable keyword

```solidity
function fund() public payable {}
```

<strong>Smart contracts can hold funds just like how wallets can</strong>
Money math done in terms of wei so 1ETH needs to be set as 1e18 value

```solidity
function fund() public payable {
    require(msg.value > 1e18, "Not enough ETH");
}
```

Reverting ? undo any action before, and send remaining gas back.

#### Chainlink & Oracles (03:41)

We want to check that msg.value is greather than 50USD not ETH.
In order to get the value of eth in usd we need to use a decentralize oracles network to get 1ETH in USD

<strong>Blockchain Oracle</strong>: Any device that interacts with the off-chain world to provide external data or computation to smart contracts.

#### Interfaces & Price Feeds (04:01)

[Price Feeds](https://docs.chain.link/docs/get-the-latest-price/)
In order to be able to check if we receive the right amount we need to convert msg.value in usd.
We need to get the price of ETH, for that we can use chainlink data feed.

Since we need to interact outside of our project we need address and ABI of outside contract.
We can get the address easily:
[Ethereum data feed](https://docs.chain.link/docs/ethereum-addresses/)

Instead of the ABI we can use interface.

```solidity
@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol

...

// get the price of ETH/USD
function getPrice() public view returns (uint256){
    AggregatorV3Interface priceFeed = AggregatorV3Interface(0x8A753747A1Fa494EC906cE90E9f37563A8AF630e);
    (
        /*uint80 roundID*/,
        int price,
        /*uint startedAt*/,
        /*uint timeStamp*/,
        /*uint80 answeredInRound*/
    ) = priceFeed.latestRoundData();
    // price -> ETH in terms of USD // 8 decimals associate with price feed
    // 3000.00000000
    // msg.value will 18 decimals value because 1 eth = 1 * 10 ** 18 wei
    return uint256(price * 1e10); // 1 ** 10 = 10000000000
}


// convert the eth in usd to check agains msg.value
function getConversionRate(uint256 ethAmount) public view returns (uint256) {
    uint256 ethPrice = getPrice();
    uint256 ethAmountInUsd = (ethPrice * ethAmount) / 1e18;
    return ethAmountInUsd;
}
```

#### Arrays & Struct II (04:21:58)

We want to keep track of all the people that send us money.
msg.value: how much currency is send
msg.sender: who send the currency address

```solidity
// keep track of anyone who fund us
address[] public funders;
// how much each funders has given
mapping(address =>  uint256) public addressToAmountFunded;
...
function fund() public payable {
    // we want to set a minimum fund amount
    // 1. How to send ETH to this contract
    require(msg.value >= minimumUSD, "Not enough fund"); // 1e18 = 1 * 10 **18
    funders.push(msg.sender);
    addressToAmountFunded[msg.sender] = msg.value;
}
```

#### Libraries

We can use library to add more functionnality to different values.

#### Constructor

We want to make sure that only the owner of the contract can withdraw the fund.

```solidity
address public owner;

constructor() {
    owner = msg.sender;
}
```

#### Modifier

```solidity
modifier onlyOwner() {
    require(msg.sender == owner, "Sender is not owner");
    _; // doing the rest of code
}
```

### Ether.js Simple Storage (05:30:44)

EtherJS allow us to interact with blockchain [etherJs](https://docs.ethers.io/v5/)
We will use javascript to deploy our contract.
Before deploying our code we need to compile it.
To compile our code we are going to use [solc-js](https://github.com/ethereum/solc-js)

```bash
yarn add ethers solc
```

To compile the code:

```bash
yarn solcjs --bin --abi --include-path node_modules/ --base-path . -o . SimpleStorage.sol
```

Will produce 2 files SimpleStorage.bin and SimpleStorage.abi

#### Ganache & Networks

In order to deploy to Javascript Virtual Environment, fake blockchain.
We need to have a fake blockchain we are going to use Ganache.
[Ganache](https://trufflesuite.com/ganache/)

In our code we need to connect to a blockchain

```javascript
const ethers = require('ether');

async function main() {
  // compile them in code
  // compile them separately
  // connect to ganache
  // http://0.0.0.0:8545
  // connect to the url
  const provider = new ethers.providers.JsonRpcProvider('http://0.0.0.0:8545');
  // get wallet and private key to // private key comes from ganache
  const wallet = new ethers.Wallet(
    '3b323b5395678a4089420a5ea1e85e3e37f56e18631db10532a429d0cab34c5e',
    provider
  );

  // use to deploy contract
  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  console.log('Deploying wait...');
  const contract = await contractFactory.deploy();
  console.log('Contract deployed...');
  console.log(contract);
}
```

With provider and wallet we are set, we can interact with smart contract.
provider: connection to the blockchain
wallet and private key so we can sign the transaction.

We can wait confirmation that our contract is attached to the chain.

```javascript
const deploymentReceipt = await contract.deployTransaction.wait(1);
```

#### Interacting with Contract in EthersJs

```javascript
// // INTERACT WITH CONTRACT
// contract comes from contractFactory
const currentFavoriteNumber = await contract.retrieve();
```

1 - connect to ganache
2 - connect a wallet with a private key
3 - grab the abi and binary of contract
4 - connect abi and binary to new contract factory object
5 - deploy the contract
6 - wait one block for transaction to finish
7 - interact with contract (here retrieve the fav number)

#### Deploying to a TestNet or Mainnet (07:57:52)

In order to deploy to testnet we need an RPC_URL and a private key and we can begin to make transaction to blockchain.

[Alchemy](https://www.alchemy.com/) as a node as service, allow us to connect to any blockchain that they have
support for.
Some alternative:
[Quicknode](https://www.quicknode.com/)
[Moralis](https://moralis.io/)
[Infura](https://infura.io/)

Once we create our App in Alchemy we can grab the Http Key endpoint, that will be RPC_URL

For the private key we can use our metamask private key.

(typescript code - 08:17:05)

### HardHat SimpleStorage (08:20:18)

HardHat smart contract developer framework. Development Environment.

```bash
yarn init

yarn add --dev hardhat
```

```bash
yarn hardhat
```

To print fake accounts that we can use we hardhat:

```bash
npx hardhat accounts
```

Compile our contract

```bash
yarn harhat compile
```

Deploy contract with hardhat

```javascript
// async main
async function main() {
  // grab contract factory
  const SimpleStorageFactory = await ethers.getContractFactory(
    'SimpleStoragew'
  );
  console.log('Deploying contract...');
  const simpleStorage = await SimpleStorageFactory.deploy();
  await simpleStorage.deployed();
}
```

We do no provide RPC-URL or private key because hard hat has Harhat Network, local Ethereum network node designed for develpment.
If we want to choose the network

```bash
yarn hardhat run scripts/deploy.js --network hardhat
```

[ChainListId](https://chainlist.org/)

If we want to automatically verify our contract we can use plugins

```bash
npm i --save-dev @nomiclabs/hardhat-etherscan
```

```bash
npx hardhat verify --network ...
```

##### Hardhat localhost node

hardhat.config.js can be used to modify the entire project, to give our project more functionality.
We can run run hardhat network like we run a ganache network with user interface.

```bash
yarn harhdat node
```

Spin up a node in local network extacly the same as gananche in our terminal.

##### Running Test (09:26:13)

To delete the artifact anf caches folder :

```bash
yarn hardhat clean
```

##### Hardhat Gas Reporter (09:38:10)

We can start testing how much gas each one of our function cost.
[hardhat-gas-reporter](https://www.npmjs.com/package/hardhat-gas-reporter)

##### Hardhat Gas Reporter (09:44:40)

[solidity-coverage](https://github.com/sc-forks/solidity-coverage)

### HardHat Fund ME (10:00:49)

To deploy our contract we are going to use hardhat-deploy
[hardhat-deploy](https://www.npmjs.com/package/hardhat-deploy)
add `require("hardhat-deploy")` to our hardhat.config.js
We don't the scripts/deploy.js
install: `npm install --save-dev @nomiclabs/hardhat-ethers@npm:hardhat-deploy-ethers ethers` because
we work on ethereum blockchain.

To be able to test our aggregtor price we are going to use mocks.
mocking is creating objects that simulate the behavior or real objects.

(Utils folder 10:52:50)

#### Solidity Style Guide (11:00:10)

(testing - 11:18:10)

(storage in solidity - 11:44:33)

### HTML / JavaScript (12:32:57)

Wallet allow to have a connection with a blockchain
We are going to use window.ethereum to connect if metamask is installed.
We need to check if window.ethereum exist if doesn't exist can't connect to blockchain.
Try to connect to metamask with eth_requestAccounts

window.ethereum.request({ method: 'eth_requestAccounts' });

```javascript
// fund function
async function fund(ethAmount) {
  console.log(`Funding with ${ethAmount}...`);
  if (typeof window.ethereum !== 'undefined') {
    // to fund we need a provider // connection to the blockchain // here metamask
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    // signer // wallet someone with some gas
    const signer = provider.getSigner(); // account connected
    console.log(signer);
    // contract to interact with
    // ABI & Address
    const contract = new ethers.Contract(contractAddress, abi, signer); // usually once deployed contract address dont change
    const transactionResponse = await contract.fund({
      value: ethers.utils.parseEther(ethAmount),
    });
  }
}
```

To interact with blockchain while we are developing we need to spin up blockchain

```bash
yarn hardhat node
```

grab the address be sure to connect the metamask to the right blockchain, localhot, rinkeby...

### HardHat SmartContract Lottery/Raffle (13:41:03)

Allow user to engage in a fair and decentralize lottery
To get a pure verifiable number we'll use ChainLink VRF then will use Chainlink keeper to automate
one of the winner getting picked.

1 - create new folder
2 - `yarn init -y`
3 - `yarn add --dev hardhat`
4 - `yarn hardhat` - to get started with a new project
5 - create an empty hardhat.config.js
6 - Install dependencies:

```bash
yarn add --dev @nomiclabs/hardhat-ethers@npm:hardhat-deploy-ethers ethers @nomiclabs/hardhat-etherscan @nomiclabs/hardhat-waffle chai ethereum-waffle hardhat hardhat-contract-sizer hardhat-deploy hardhat-gas-reporter prettier prettier-plugin-solidity solhint solidity-coverage dotenv
```

#### Introduction to Events (13:54:03)

Whenever we update a dynamic object like array or map we want to emit an event
Events allow to "print" stuff to logging structure
Smart contract can't access the log, event are cheaper.

Each event are tied to smart contract or address that emit the event in transaction.

```solidity
event storeNumber(uint256 indexed oldNumber, uint256 indexed newNumber, address sender);
```

We can have up to 3 indexed parameter they are also known as topics, indexed paramaters are much easier
to search for.

```solidity
emit storedNumber(
    favoriteNumber,
    _favoriteNumber,
    msg.sender
);
```
