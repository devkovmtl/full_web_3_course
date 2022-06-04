const connectButton = document.getElementById('connectButton');
const fundButton = document.getElementById('fund');

connectButton.onclick = connect;
fundButton.onclick = fund;

async function connect() {
  // 1. check if window.ethereum exists // metammask is installed
  if (typeof window.ethereum !== 'undefined') {
    console.log('Metamask is installed');
    // 2. Try to connect to metamask
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
    } catch (error) {
      console.log(error);
    }
    console.log('Metamask connected');
    connectButton.innerHTML = 'Connected!';
    const accounts = await ethereum.request({ method: 'eth_accounts' }); // array of accounts
    console.log(accounts);
  } else {
    console.log('no metamask');
    connectButton.innerHTML = 'Please install Metamask';
  }
}

// fund function
async function fund() {
  const ethAmount = '0.1';
  console.log(`Funding with ${ethAmount}...`);
  if (typeof window.ethereum !== 'undefined') {
    // to fund we need a provider // connection to the blockchain // here metamask
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    // signer // wallet someone with some gas
    const signer = provider.getSigner(); // account connected
    console.log(signer);
    // contract to interact with
    // ABI & Address
    const contract = new ethers.Contract(contractAddress, abi, signer); // usually once deployed contract address dont change
    try {
      const transactionResponse = await contract.fund({
        value: ethers.utils.parseEther(ethAmount),
      });
    } catch (error) {
      console.log(error);
    }
  }
}
// withdraw
