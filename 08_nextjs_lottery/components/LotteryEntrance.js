import { useEffect, useState } from 'react';
import { useWeb3Contract, useMoralis } from 'react-moralis';
import { ethers } from 'ethers';
import { useNotification } from 'web3uikit';
import { contractAddresses, abi } from '../constants';

export default function LotteryEntrance() {
  const [entranceFee, setEntranceFee] = useState('0');
  const [numPlayer, setNumPlayer] = useState();
  const [recentWinner, setRecentWinner] = useState();
  const { chainId: chainIdHex, isWeb3Enabled } = useMoralis(); // when connect moralis pass up info to provider
  const dispatch = useNotification();

  //   console.log();
  const chainId = parseInt(chainIdHex);

  const raffleAddress =
    chainId in contractAddresses ? contractAddresses[chainId][0] : null;

  const { runContractFunction: getEntranceFee } = useWeb3Contract({
    abi,
    contractAddress,
    functionName: 'getEntranceFee',
    params: {},
  });

  const { runContractFunction: getNumberOfPlayers } = useWeb3Contract({
    abi,
    contractAddress,
    functionName: 'getNumberOfPlayers',
    params: {},
  });

  const { runContractFunction: getRecentWinner } = useWeb3Contract({
    abi,
    contractAddress,
    functionName: 'getRecentWinner',
    params: {},
  });

  const { runContractFunction: enterRaffle } = useWeb3Contract({
    abi,
    contractAddress,
    functionName: 'enterRaffle',
    params: {},
    msgValue: entranceFee,
  });

  const handleSuccess = async (tx) => {
    await tx.wait(1);
    handleNewNotification(tx);
  };

  const handleNewNotification = (tx) => {
    dispatch({
      type: 'info',
      message: 'Transaction Complete!',
      title: 'Tx Notification',
      position: 'topR',
      icon: 'bell',
    });
  };

  useEffect(() => {
    if (isWeb3Enabled) {
      // try to read the raffle entrance fee
      async function updateUI() {
        const entranceFeeFromContract = (await getEntranceFee()).toString();
        const numPlayersFromCall = (await getNumberOfPlayers()).toString();
        const recentWinnerFromCall = (await getRecentWinner()).toString();
        // console.log(entranceFeeFromContract);
        setEntranceFee(entranceFeeFromContract);
        setRecentWinner(recentWinnerFromCall);
        setNumPlayer(numPlayersFromCall);
      }
      updateUI();
    }
  }, [isWeb3Enabled]);

  return (
    <div>
      <p>
        Hi from lottery Entrance!
        {raffleAddress ? (
          <div>
            <button
              onClick={async function () {
                await enterRaffle({
                  onSuccess: handleSuccess,
                  onError: (error) => console.log(error),
                });
              }}
            >
              Enter Raffle
            </button>
            Entrance Fee:
            {ethers.utils.formatUnits(entranceFee, 'ethers')}
            Players:{numPlayer}
            Recent Winner: {recentWinner}
          </div>
        ) : (
          <div>No Raffle address dectected</div>
        )}
      </p>
    </div>
  );
}
