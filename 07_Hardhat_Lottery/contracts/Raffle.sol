// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

// What do we want people to do?
// Enter - Participate in the raffle (buy a ticket)
// Pick a random winner (verifiable winner)
// Winner to be selected every X minutes -> completly automated

// use chainlink oracle for:
// -> Randomness, Automated Execution (Chainlink keeper)

error Raffle__NotEnoughETHEntered();

contract Raffle {
    // we are going to set minimum ETH price
    // immutable to save gas
    uint256 private immutable i_entranceFee;
    // keep tracks of all players
    address payable[] private s_players;
    /* event */
    event RaffleEnter(address indexed player);

    constructor(uint256 entranceFee) {
        i_entranceFee = entranceFee;
    }

    function enterRaffle() public payable {
        // require msg.value > i_entranceFee
        if (msg.value < i_entranceFee) {
            revert Raffle__NotEnoughETHEntered();
        }
        s_players.push(payable(msg.sender));
        // Emit an event when we update dynamic array or mapping
        emit RaffleEnter(msg.sender);
    }

    function getEntranceFee() public view returns (uint256) {
        return i_entranceFee;
    }

    function getPlayer(uint256 index) public view returns (address) {
        return s_players[index];
    }
}
