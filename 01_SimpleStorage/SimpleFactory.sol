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
}

