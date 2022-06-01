import { ethers } from 'ethers';
import * as fs from 'fs-extra';
import 'dotenv/config';

// to create a crypted version of our private key
async function main() {
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY!);
  const encryptedKeyJsonKey = await wallet.encrypt(
    process.env.PRIVATE_KEY_PASSWORD!,
    // process.env.PRIVATE_KEY
    // use metamask key
    process.env.PRIVATE_KEY!
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
