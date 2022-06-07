// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol";
import "@chainlink/contracts/src/v0.8/KeeperCompatible.sol";

// What do we want people to do?
// Enter - Participate in the raffle (buy a ticket)
// Pick a random winner (verifiable winner)
// Winner to be selected every X minutes -> completly automated

// use chainlink oracle for:
// -> Randomness, Automated Execution (Chainlink keeper)

error Raffle__NotEnoughETHEntered();
error Raffle__TransferFailed();
error Raffle__NotOpen();
error Raffle_UpkeepNotNeeded(
    uint256 currentBalance,
    uint256 numPlayers,
    uint256 raffleState
);

/** @title sample raffle contract
 *  @notice This contract is for creating an untamperable decentralized
 * smart contract
 *  @dev implements chainlink VRF V2 and chainlink keeper
 */
contract Raffle is VRFConsumerBaseV2, KeeperCompatibleInterface {
    /* Type declarations */
    enum RaffleState {
        OPEN,
        CALCULATING
    }

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
    RaffleState private s_raffleState;
    uint256 private s_lastTimeStamp;
    uint256 private i_interval; // how long the lottery go on

    /* event */
    event RaffleEnter(address indexed player);
    event RequestRaffleWinner(uint256 indexed requestId);
    event WinnerPicked(address indexed winner);

    constructor(
        address vrfCoordinatorV2, // contract address // need to deploy somes mock
        uint256 entranceFee, //
        bytes32 gasLane,
        uint64 subscriptionId,
        uint32 callbackGasLimit,
        uint256 interval
    ) VRFConsumerBaseV2(vrfCoordinatorV2) {
        i_entranceFee = entranceFee;
        i_vrfCoordinator = VRFCoordinatorV2Interface(vrfCoordinatorV2);
        i_gasLane = gasLane;
        i_subscriptionId = subscriptionId;
        i_callbackGasLimit = callbackGasLimit;
        s_raffleState = RaffleState.OPEN;
        s_lastTimeStamp = block.timestamp; // currenttimestamp
        i_interval = interval;
    }

    function enterRaffle() public payable {
        // require msg.value > i_entranceFee
        if (msg.value < i_entranceFee) {
            revert Raffle__NotEnoughETHEntered();
        }
        if (s_raffleState != RaffleState.OPEN) {
            revert Raffle__NotOpen();
        }
        s_players.push(payable(msg.sender));
        // Emit an event when we update dynamic array or mapping
        emit RaffleEnter(msg.sender);
    }

    // check if it is time to get random number
    /**
     * @dev function called by Chainlink keeper nodes call they look
     * for the 'upkeepneeded' to be true
     * The following should be true in order to return true:
     *  1 - Our time interval should have passed
     *  2 - The lottery should have at least 1 player, and have some ETH
     *  3 - Subscription is funded with Link
     *  4 - The lottery should be open state
     */
    function checkUpkeep(
        bytes memory /* checkData */
    )
        public
        override
        returns (
            bool upkeepNeeded,
            bytes memory /* performData */
        )
    {
        // 4.
        bool isOpen = RaffleState.OPEN == s_raffleState;
        // 1.
        bool timePassed = (block.timestamp - s_lastTimeStamp) > i_interval;
        // 2.
        bool hasPlayers = (s_players.length > 0);
        bool hasBalance = address(this).balance > 0;

        upkeepNeeded = isOpen && timePassed && hasBalance && hasPlayers;
    }

    // performupkeep get called when checkUpKeep is true
    // function requestRandomWinner() external {
    function performUpkeep(
        bytes calldata /*performData*/
    ) external override {
        (bool upkeepNeeded, ) = checkUpkeep("");
        if (!upkeepNeeded) {
            revert Raffle_UpkeepNotNeeded(
                address(this).balance,
                s_players.length,
                uint256(s_raffleState)
            );
        }
        // Chainlink Vrf is a 2 transaction process
        // request random number
        // once we get the random number do something
        s_raffleState = RaffleState.CALCULATING;
        // Will revert if subscription is not set and funded.
        // return request id uin32
        uint256 requestId = i_vrfCoordinator.requestRandomWords(
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
        // reset player array
        s_players = new address payable[](0);
        s_raffleState = RaffleState.OPEN;
        // reset timestamp
        s_lastTimeStamp = block.timestamp;
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

    function getRaffleState() public view returns (RaffleState) {
        return s_raffleState;
    }

    function getNumWords() public view returns (uint256) {
        return NUM_WORDS;
    }

    function getNumberOfPlayers() public view returns (uint256) {
        return s_players.length;
    }

    function getLatestTimeStamp() public view returns (uint256) {
        return s_lastTimeStamp;
    }

    function getRequestConfirmations() public pure returns (uint256) {
        return REQUEST_CONFIRMATIONS;
    }

    function getInterval() public view returns (uint256) {
        return i_interval;
    }
}
