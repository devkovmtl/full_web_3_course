// SPDX-License-Identifier:MIT
pragma solidity ^0.8.8;

// import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "./PriceConverter.sol";

// Get funds from users
// Withdraw fund from users
// set a minimum funding value in USD

// custom error to save gas
error NotOwner();

contract FundMe {
    // now we can use the function of priceconverter on uint256
    using PriceConverter for uint256; 

    // minimum usd we want 
    // uint256 public minimumUSD = 50 * 1e18; 
    uint256 public constant MINIMUM_USD = 50 * 1e18; 
    // keep track of anyone who fund us
    address[] public funders;
    // how much each funders has given
    mapping(address =>  uint256) public addressToAmountFunded;

    address public immutable i_owner;

    constructor() {
        i_owner = msg.sender;
    }

    // anybody can call it -> public
    // receive fund -> payable
    function fund() public payable {
        // we want to set a minimum fund amount
        // 1. How to send ETH to this contract
        // require(getConversionRate(msg.value )>= minimumUSD, "Not enough found"); // 1e18 = 1 * 10 **18
        require(msg.value.getConversionRate() >= MINIMUM_USD, "Not enough money");
        funders.push(msg.sender);
        addressToAmountFunded[msg.sender] += msg.value;
    }

    // we want to withdraw all the fund from contract
    // reset the funders[] and addressToAmountFunded
    function withdraw() public onlyOwner {
        for (uint256 funderIndex = 0; funderIndex < funders.length; funderIndex++) {
            address funder = funders[funderIndex]; // we get the funder address
            addressToAmountFunded[funder] = 0;
        }

        // reset the array
        funders = new address[](0);
        // withdraw the funds
        
        // transfer
        // payable(msg.sender).transfer(address(this).balance);
        // send
        // bool sendSuccess = payable(msg.sender).send(address(this).balance);
        // require(sendSuccess, "Send failed"); // if failed will revert
        // call // lower level command
        // call any function in all of all eth without abi
        (bool callSuccess, bytes memory dataReturned) = payable(msg.sender).call{value:address(this).balance}("");
        require(callSuccess, "Call failed");
    }

    modifier onlyOwner() {
        // require(msg.sender == i_owner, "Sender is not owner");
        if(msg.sender != i_owner){
            revert NotOwner();
        }
        _; // doing the rest of code
    }

    // we can add receive() and fallback() just in case somebody 
    // send money instead of calling the fund() method
    receive() external payable {
        fund();
    }

    fallback() external payable {
        fund();
    }
 
}