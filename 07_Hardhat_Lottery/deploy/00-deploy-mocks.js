const { ethers, run, network } = require("hardhat")
const { developmentChains } = require("../helper-hardhat-config")

const BASE_FEE = ethers.utils.parseEther("0.25") // 0.25 is the premium, cost 0.25 Link per request
const GAS_PRICE_LINK = 1e9 // 100000000 // calculated value based on gas price of the chain

module.exports = async (hre) => {
    const { getNamedAccounts, deployments } = hre
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    const args = [BASE_FEE, GAS_PRICE_LINK]

    if (developmentChains.includes(network.name)) {
        // deploy mocks
        log("Local network detected! Deploying mocks....")
        await deploy("VRFCoordinatorV2Mock", {
            contract: "VRFCoordinatorV2Mock",
            from: deployer,
            log: true,
            args,
        })
        log("Mocks Deployed!")
        log("============================================")
    }
}

module.exports.tags = ["all", "mocks"]
