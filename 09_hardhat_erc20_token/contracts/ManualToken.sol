// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

// Pseudo Code
contract ManualToken {
    uint256 initialSupply;

    // main reason smart contract work
    // is that balances mapping
    mapping(address => uint256) public balanceOf;

    // who is allowed to take and how token from who
    mapping(address => mapping(address => uint256)) public allowance;

    // transfer tokens
    // subtract from address amount and add to address
    function _transfer(
        address from,
        address to,
        uint256 amount
    ) public {
        balanceOf[from] -= amount;
        balanceOf[to] += amount;
    }

    function transferFrom(
        address _from,
        address _to,
        uint256 _value
    ) public returns (bool success) {
        // taking funds from user
        require(_value <= allowance[_from][msg.sender]);
        allowance[_from][msg.sender] -= _value;
        _transfer(_from, _to, _value);
        return true;
    }
}
