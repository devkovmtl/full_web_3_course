const { expect, assert } = require('chai');
const { ethers } = require('hardhat');

describe('SimpleStorage', function () {
  let simpleStorageFactory, simpleStorage;

  // before each test deploy the contract
  // new contract before each test
  beforeEach(async function () {
    simpleStorageFactory = await ethers.getContractFactory('SimpleStorage');
    simpleStorage = await simpleStorageFactory.deploy();
  });

  it('Should start with a favorite number of 0', async function () {
    const currentValue = await simpleStorage.retrieve();
    const expectedValue = '0';
    assert.equal(currentValue.toString(), expectedValue);
  });

  it('should update wehn we call store', async function () {
    const expectedValue = '7';
    const transactionResponse = await simpleStorage.store(expectedValue);
    await transactionResponse.wait(1);

    const currentValue = await simpleStorage.retrieve();

    assert.equal(currentValue.toString(), expectedValue);
  });
});

// describe("Greeter", function () {
//   it("Should return the new greeting once it's changed", async function () {
//     const SimpleStorage = await ethers.getContractFactory("Greeter");
//     const greeter = await Greeter.deploy("Hello, world!");
//     await greeter.deployed();

//     expect(await greeter.greet()).to.equal("Hello, world!");

//     const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

//     // wait until the transaction is mined
//     await setGreetingTx.wait();

//     expect(await greeter.greet()).to.equal("Hola, mundo!");
//   });
// });
