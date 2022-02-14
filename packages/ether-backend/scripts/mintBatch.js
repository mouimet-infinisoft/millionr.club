const HDWalletProvider = require("@truffle/hdwallet-provider");
const config = require("../config.json");
const { abi, networks } = require("../build/contracts/MillionR_V1.json");
const Web3 = require("web3");


const mint = async ({ ids }) => {
  try {
    if (!process?.argv?.[1] || !process?.argv?.[2]){
      console.log(`
      Command invalid

      ${process.argv0} ${process.argv[1]}  [network]`);
      process.exit();
    } 

    const network = process.argv[2];
    const _config = config[network];
    const { alchemy, MNEMONIC, network_id } = _config;
    const contractAddress = networks?.[network_id]?.address;

    if (
      !alchemy ||
      !MNEMONIC ||
      !contractAddress
    ) {
      console.error(`Wrong configuration!`);
      process.exit(-1);
    }

    const wallet = new HDWalletProvider(MNEMONIC, alchemy);
    const web3 = new Web3(wallet);

    const to = (await web3.eth.getAccounts())[0];
    const contract = await new web3.eth.Contract(abi, contractAddress);

    const result = await contract.methods
      .mintBatch(to, ids, new Array(ids.length).fill(1), [])
      .send({
        from:to
      });

    console.log(`Result = `, result);
  } catch (error) {
    console.error(`Configuration error: `, error);
    process.exit(-1);
  }
};

mint({
  ids: new Array(200).fill(1).map((i, index) => index + 3000)
});
