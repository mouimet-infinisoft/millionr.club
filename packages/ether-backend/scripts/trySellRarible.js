const fetch = require("node-fetch-commonjs")

global.FormData = require("form-data")
global.window = {
  fetch,
  dispatchEvent: () => {
  },
}
global.CustomEvent = function CustomEvent() {
  return
}
const { createRaribleSdk } = require("@rarible/protocol-ethereum-sdk");
const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require('web3');
const web3 = new Web3(new HDWalletProvider("mass lunch appear culture dragon occur exact drama hurt right detail muffin", "https://eth-rinkeby.alchemyapi.io/v2/S5f7HNQSMwp32-3Iewfa8ByqH0-cKeYg"))
const sdk = createRaribleSdk(web3, 'rinkeby', { fetchApi: fetch })

console.log(`Doguette`);

// Exchange
// https://rinkeby.rarible.com
// 0x29fd47...c197bcb9
// Message
// maker:
// 0x29fd477b2981ddba3cda89a633289e54c197bcb9
// makeAsset:
// assetType:
// assetClass:
// 0x973bb640
// data:
// 0x000000000000000000000000466dd2a81a7626f1dc4614e00106293767bb28f2000000000000000000000000000000000000000000000000000000000000144e
// value:
// 1
// taker:
// 0x0000000000000000000000000000000000000000
// takeAsset:
// assetType:
// assetClass:
// 0xaaaebeba
// data:
// 0x
// value:
// 1000000000000000000
// salt:
// 0xdc2abe34961cae9e041ef03f7a4b79fc348c2d8a0c8e1fb94cb9e8627d11e848
// start:
// 0
// end:
// 0
// dataType:
// 0x23d235ef
// data:
// 0x00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000100000000000000000000000076c5855e93bd498b6331652854c4549d34bc3a3000000000000000000000000000000000000000000000000000000000000000fa
