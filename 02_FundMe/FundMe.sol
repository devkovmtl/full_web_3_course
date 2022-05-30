// SPDX-License-Identifier:MIT
pragma solidity ^0.8.8;

// Get funds from users
// Withdraw fund from users
// set a minimum funding value in USD
contract FundMe {

    // anybody can call it -> public
    // receive fund -> payable
    function fund() public payable {
        // we want to set a minimum fund amount
        // 1. How to send ETH to this contract
        require(msg.value > 1e18, "Not enough found"); // 1e18 = 1 * 10 **18
    }

    // function withdraw() {}

}