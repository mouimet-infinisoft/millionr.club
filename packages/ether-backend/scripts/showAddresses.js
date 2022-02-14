const config = require("../config.json");
const { networks } = require("../build/contracts/MillionR_V1.json");
const {
  networks: _exchangeProxyNetworks
} = require("../build/contracts/MillionR_Exchange_V1.json");

const network = process.argv[2] || 'rinkeby';
const _config = config[network];
const { network_id } = _config;
const millionrNftContract = networks?.[network_id]?.address;
const exchangeProxyAddress = _exchangeProxyNetworks?.[network_id]?.address;

// Accounts
const milie = "0xe371517d0A116F42178c23c945386746ffBC6c1C"
const me = "0x29fD477b2981dDBa3Cda89a633289E54C197BcB9"

// Smart Contracts
const raribleAsset = "???"
const raribleExchange = "0xd4a57a3bD3657D0d46B4C5bAC12b3F156B9B886b"
const raribleTransfer = " 0x7d47126a2600E22eab9eD6CF0e515678727779A6"

console.log(`

Accounts
Me ${me}
Milie ${milie}

My Smart Contracts
Millionr NFT ${millionrNftContract}
Millionr Exchange ${exchangeProxyAddress}

Smart Contracts
Rarible ERC1155 Asset ${raribleAsset}
Rarible Exchange ${raribleExchange}
Rarible Transfer ${raribleTransfer}

`)