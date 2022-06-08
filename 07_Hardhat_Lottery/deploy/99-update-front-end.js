const fs = require("fs")
const { ethers, network } = require("hardhat")

const FRONT_END_ADDRESSES_FILE =
    "../08_nextjs_lottery/constants/contractAddresses.json"
const FRONT_END_ABI_FILE = "../08_nextjs_lottery/constants/abi.json"

module.exports = async function () {
    if (process.env.UPDATE_FRONT_END) {
        console.log("updated front end")
        updateContractAddresses()
        updateAbi()
    }
}

async function updateAbi() {
    const raffle = await ethers.getContract("Raffle")
    fs.writeFileSync(
        FRONT_END_ABI_FILE,
        raffle.interface.format(ethers.utils.FormatTypes.json)
    )
}

async function updateContractAddresses() {
    const raffle = await ethers.getContract("Raffle")
    const contractAddresses = JSON.parse(
        fs.readFileSync(FRONT_END_ADDRESSES_FILE, "utf-8")
    )
    const chainId = network.config.chainId.toString()

    if (chainId in contractAddresses) {
        if (!contractAddresses[chainId].includes(raffle.address)) {
            contractAddresses[chainId].push(raffle.address)
        }
    } else {
        contractAddresses[chainId] = [raffle.address]
    }
    fs.writeFileSync(
        FRONT_END_ADDRESSES_FILE,
        JSON.stringify(contractAddresses)
    )
}

module.exports.tags = ["all", "frontend"]
