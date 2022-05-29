// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./SimpleStorage.sol";

// child contract inherit all the functionaliaty of
// simplestorage 
contract ExtraStorage is SimpleStorage {
    // override function 
    // virtual override
    // if we want to override we need to make sure the function in the parent has virtual
    function store(uint256 _favoriteNumber) public override {
        favoriteNumber = _favoriteNumber + 5;
    }
}