const connectButton = document.getElementById('connectButton');
const fundButton = document.getElementById('fund');
const balanceButton = document.getElementById('balanceButton');
const withdrawButton = document.getElementById('withdraw');
connectButton.onclick = connect;
fundButton.onclick = fund;
balanceButton.onclick = getBalance;
withdrawButton.onclick = withdraw;

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

async function getBalance() {
  if (typeof window.ethereum !== 'undefined') {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const balance = await provider.getBalance(contractAddress);
    console.log(ethers.utils.formatEther(balance));
  }
}

// fund function
async function fund() {
  //   const ethAmount = '0.1';
  const ethAmount = document.getElementById('ethAmount').value;
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
      // listen for the transaction to be mined
      // listen for an event
      await listenForTransactionMined(transactionResponse, provider);
      console.log('done!');
    } catch (error) {
      console.log(error);
    }
  }
}

function listenForTransactionMined(transactionResponse, provider) {
  console.log(`Mining ${transactionResponse.hash} ... `);
  // create listener for the transaction to finish
  return new Promise((resolve, reject) => {
    provider.once(transactionResponse.hash, (transacionReceipt) => {
      console.log(
        `Completed with ${transacionReceipt.confirmations} confirmations`
      );
      resolve();
    });
  });
}

// withdraw
async function withdraw() {
  if (typeof window.ethereum !== 'undefined') {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner(); // account connected
    const contract = new ethers.Contract(contractAddress, abi, signer);

    try {
      const transactionResponse = await contract.withdraw();
      await listenForTransactionMined(transactionResponse, provider);
    } catch (error) {
      console.log(error);
    }
  }
}
