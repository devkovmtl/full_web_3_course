import { useWeb3Contract } from 'react-moralis';
import { contractAddresses, abi } from '../constants';
export default function LotteryEntrance() {
  const { runContractFunction: enterRaffle } = useWeb3Contract({
    abi,
    contractAddress,
    functionName: '',
    params: {},
    msgValue: {},
  });
  return <div></div>;
}
