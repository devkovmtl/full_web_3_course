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

  const {
    runContractFunction: enterRaffle,
    isFetching,
    isLoading,
  } = useWeb3Contract({
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
    <div className='p-5'>
      <h1 className='py-4 px-4 font-bold text-3xl'>Lottery</h1>
      {raffleAddress ? (
        <>
          <button
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-auto'
            onClick={async function () {
              await enterRaffle({
                onSuccess: handleSuccess,
                onError: (error) => console.log(error),
              });
            }}
            disabled={isLoading || isFetching}
          >
            Enter Raffle
          </button>
          <div>
            Entrance Fee: {ethers.utils.formatUnits(entranceFee, 'ether')} ETH
          </div>
          <div>The current number of players is: {numberOfPlayers}</div>
          <div>The most previous winner was: {recentWinner}</div>
        </>
      ) : (
        <div>Please connect to a supported chain </div>
      )}
    </div>
  );
}
