// SPDX-License-Identifier: MIT

pragma solidity ^0.8.8;

// EVM, Ethereum Virtual Machine
// Avalanche, Fantom, Polygon

// define contract
contract SimpleStorage {
    uint256 public favoriteNumber; // default 0

    mapping(string => uint256) public nameToFavoriteNumber;

    // struct of people 
    struct People {
        uint256 favoriteNumber;
        string name;
    }

    People[] public peoples;

    function store(uint256 _favoriteNumber) public  {
        favoriteNumber = _favoriteNumber;
    }

    function retrieve() public view returns(uint256) {
        return favoriteNumber;
    }

    function addPerson(string calldata _name, uint256 _favoriteNumber) public {
        peoples.push(People({favoriteNumber:_favoriteNumber,name: _name}));
        nameToFavoriteNumber[_name] = _favoriteNumber;
    } 

}