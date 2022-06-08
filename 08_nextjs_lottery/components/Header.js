import { ConnectButton } from 'web3uikit';

export default function Header() {
  return (
    <nav>
      <h1>hDecentralized Lottery</h1>
      <div>
        <ConnectButton moralisAuth={false} />
      </div>
    </nav>
  );
}
