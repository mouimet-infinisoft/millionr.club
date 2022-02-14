const HDWalletProvider = require('@truffle/hdwallet-provider');
const {develop, rinkeby, etherscanapi} = require('./config.json');

if (!develop || !rinkeby || !etherscanapi){
  console.error(`Wrong configuration!`)
  process.exit(-1)
}


module.exports = {
  networks: {
    development: {
      host: 'localhost',
      port: 7545,
      gas: 4600000,
      network_id: '1234'//ganache local
    },    
    // development: {
    //   host: 'localhost',
    //   port: 9545,
    //   gas: 4600000,
    //   network_id: '*' // Match any network id
    // },    
    rinkeby: {
      provider: function() {
        return new HDWalletProvider(
          rinkeby.MNEMONIC,
          rinkeby.alchemy
        );
      },
      network_id: "4",
      gas: 4600000
    },
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.11",    // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      // settings: {          // See the solidity docs for advice about optimization and evmVersion
      //  optimizer: {
      //    enabled: false,
      //    runs: 200
      //  },
      //  evmVersion: "byzantium"
      // }
    }
  },
  plugins: [
    'truffle-plugin-verify',
    "solidity-coverage"
  ],
  api_keys: {
    etherscan: etherscanapi
  }


  // Truffle DB is currently disabled by default; to enable it, change enabled:
  // false to enabled: true. The default storage location can also be
  // overridden by specifying the adapter settings, as shown in the commented code below.
  //
  // NOTE: It is not possible to migrate your contracts to truffle DB and you should
  // make a backup of your artifacts to a safe location before enabling this feature.
  //
  // After you backed up your artifacts you can utilize db by running migrate as follows: 
  // $ truffle migrate --reset --compile-all
  //
  // db: {
    // enabled: false,
    // host: "127.0.0.1",
    // adapter: {
    //   name: "sqlite",
    //   settings: {
    //     directory: ".db"
    //   }
    // }
  // }
};
