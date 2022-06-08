import { useMoralis } from 'react-moralis';

export default function ManualHeader() {
  const { enableWeb3, account } = useMoralis();
  return (
    <nav>
      <h1>Decentralized Lottery</h1>
      <div>
        {account ? (
          <div>
            Connected to {account.slice(0, 6)}...
            {account.slice(account.length - 4)}
          </div>
        ) : (
          <button onClick={async () => await enableWeb3()}>Connect</button>
        )}
      </div>
    </nav>
  );
}
