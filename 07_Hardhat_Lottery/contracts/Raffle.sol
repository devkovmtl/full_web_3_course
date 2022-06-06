// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol";

// What do we want people to do?
// Enter - Participate in the raffle (buy a ticket)
// Pick a random winner (verifiable winner)
// Winner to be selected every X minutes -> completly automated

// use chainlink oracle for:
// -> Randomness, Automated Execution (Chainlink keeper)

error Raffle__NotEnoughETHEntered();
error Raffle__TransferFailed();

contract Raffle is VRFConsumerBaseV2 {
    // we are going to set minimum ETH price
    // immutable to save gas
    uint256 private immutable i_entranceFee;
    // keep tracks of all players
    address payable[] private s_players;

    // coordinartor to get the random num
    VRFCoordinatorV2Interface private immutable i_vrfCoordinator;
    // variable for our coordinator requestRandomWords() methods
    bytes32 private immutable i_gasLane;
    uint64 private immutable i_subscriptionId;
    uint32 private immutable i_callbackGasLimit;
    uint16 private constant REQUEST_CONFIRMATIONS = 3;
    uint32 private constant NUM_WORDS = 1;

    // Lottery variable
    address private s_recentWinner;

    /* event */
    event RaffleEnter(address indexed player);
    event RequestRaffleWinner(uint256 indexed requestId);
    event WinnerPicked(address indexed winner);

    constructor(
        address vrfCoordinatorV2,
        uint256 entranceFee,
        bytes32 gasLane,
        uint64 subscriptionId,
        uint32 callbackGasLimit
    ) VRFConsumerBaseV2(vrfCoordinatorV2) {
        i_entranceFee = entranceFee;
        i_vrfCoordinator = VRFCoordinatorV2Interface(vrfCoordinatorV2);
        i_gasLane = gasLane;
        i_subscriptionId = subscriptionId;
        i_callbackGasLimit = callbackGasLimit;
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

    function requestRandomWinner() external {
        // Chainlink Vrf is a 2 transaction process
        // request random number
        // once we get the random number do something

        // Will revert if subscription is not set and funded.
        // return request id uin32
        uint256 requestId = i_entranceFee.requestRandomWords(
            i_gasLane, //gasLane // https://docs.chain.link/docs/vrf-contracts/
            i_subscriptionId, // subscription to fund our contract //https://vrf.chain.link/
            REQUEST_CONFIRMATIONS,
            i_callbackGasLimit,
            NUM_WORDS // how many random number we want to get
        );
        emit RequestRaffleWinner(requestId);
    }

    function fulfillRandomWords(uint256 requestId, uint256[] memory randomWords)
        internal
        override
    {
        // pick random winner using modulo
        uint256 indexOfWinner = randomWords[0] % s_players.length;
        address payable recentWinner = s_players[indexOfWinner];
        s_recentWinner = recentWinner;
        // send the money
        (bool success, ) = recentWinner.call{value: address(this).balance}("");
        if (!success) {
            revert Raffle__TransferFailed();
        }
        emit WinnerPicked(recentWinner);
    }

    /* View / Pure Functions */
    function getEntranceFee() public view returns (uint256) {
        return i_entranceFee;
    }

    function getPlayer(uint256 index) public view returns (address) {
        return s_players[index];
    }

    function getRecentWinner() public view returns (address) {
        return s_recentWinner;
    }
}