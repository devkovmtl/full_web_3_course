const { run } = require('hardhat');
async function verify(contractAddress, args) {
  // automatically verify contract we need to install plugins
  console.log('Verifying contract ...');
  try {
    // run any hardhat task (verifyTsak:verifyParam)
    await run('verify:verify', {
      address: contractAddress,
      constructorArguments: args,
    });
  } catch (err) {
    if (err.message.toLowerCase().includes('already verified')) {
      console.log('Already Verified!');
    } else {
      console.log(err);
    }
  }
}

module.exports = {
  verify,
};
