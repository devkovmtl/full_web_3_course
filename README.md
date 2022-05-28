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

### How do blockchains work? (1:05)

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
