global.FormData = require("form-data");
global.window = {
  fetch: require("node-fetch"),
  dispatchEvent: () => {}
};
global.CustomEvent = function CustomEvent() {
  return;
};
const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const { createRaribleSdk } = require("@rarible/sdk");
const { EthereumWallet } = require("@rarible/sdk-wallet");
const { Blockchain } = require("@rarible/api-client");
const { Web3Ethereum } = require("@rarible/web3-ethereum")
const wallet = new HDWalletProvider("mass lunch appear culture dragon occur exact drama hurt right detail muffin", "https://eth-rinkeby.alchemyapi.io/v2/S5f7HNQSMwp32-3Iewfa8ByqH0-cKeYg");

const web3 = new Web3(wallet)
const web3Ethereum = new Web3Ethereum({ web3 })
const ethWallet = new EthereumWallet(web3Ethereum)
const raribleSdk = createRaribleSdk(ethWallet, "staging")

console.log(`hi dog`);
