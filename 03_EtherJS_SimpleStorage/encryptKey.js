require('dotenv').config();
const fs = require('fs');
const { ethers } = require('ethers');

// to create a crypted version of our private key
async function main() {
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY);
  const encryptedKeyJsonKey = await wallet.encrypt(
    process.env.PRIVATE_KEY_PASSWORD,
    process.env.PRIVATE_KEY
  );
  //   console.log(encryptedKeyJsonKey);
  fs.writeFileSync('./.encryptedKey.json', encryptedKeyJsonKey);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
