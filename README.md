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
