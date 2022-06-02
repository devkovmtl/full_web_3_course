const { ethers, run, network } = require("hardhat")
const {
    developmentChains,
    DECIMALS,
    INITIAL_ANSWER,
} = require("../helper-hardhat-config")

module.exports = async (hre) => {
    const { getNamedAccounts, deployments } = hre
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId

    if (developmentChains.includes(network.name)) {
        // if (chainId === 31337) {
        // deploy mocks
        log("Local network detected! Deploying mocks...")
        await deploy("MockV3Aggregator", {
            contract: "MockV3Aggregator",
            from: deployer,
            log: true,
            args: [DECIMALS, INITIAL_ANSWER], // constructor params
        })
        log("Mocks Deployed!")
        log("----------------------------------------------")
    }
}

// add tags //yarn hardhat deploy --tags mocks
module.exports.tags = ["all", "mocks"]
