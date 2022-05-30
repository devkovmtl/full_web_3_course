// SPDX-License-Identifier:MIT
pragma solidity ^0.8.8;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

// Get funds from users
// Withdraw fund from users
// set a minimum funding value in USD
contract FundMe {

    // minimum usd we want 
    uint256 public minimumUSD = 50 * 1e18; 

    constructor() {
       
    }

    // anybody can call it -> public
    // receive fund -> payable
    function fund() public payable {
        // we want to set a minimum fund amount
        // 1. How to send ETH to this contract
        require(msg.value >= minimumUSD, "Not enough found"); // 1e18 = 1 * 10 **18
    }

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

    // function withdraw() {}

}