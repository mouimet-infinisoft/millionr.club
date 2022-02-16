const { deployProxy, upgradeProxy } = require("@openzeppelin/truffle-upgrades");
const config = require("../../config.json");

const MillionR_V1 = artifacts.require("MillionR_V1");
const MillionR_V2 = artifacts.require("MillionR_V2");

const MillionR_Exchange_V1 = artifacts.require("MillionR_Exchange_V1");

module.exports = async function (deployer, network) {
  const _config = config[network];
  console.log(`Environment: `, _config.name)
  console.log(`Network id: `, _config.network_id)

  const {payees, shares} = _config.finance



  /**
   * Exchange Proxy
   */
  const exchangeContract = await deployProxy(
    MillionR_Exchange_V1,
    [payees, shares],
    { deployer }
  );
  console.log(
    "MillionR_Exchange_V1 Smart Contract Deployed at ",
    exchangeContract.address
  );

  /**
   * MillionR_V1 (Asset Proxy)
   */
  const instance = await deployProxy(
    MillionR_V1,
    ["MillionR_V1", "MLR", "https://s3q5qbgy1a.execute-api.us-east-1.amazonaws.com/dev/{id}", exchangeContract.address],
    { deployer }
  );
  console.log("MillionR_V1 NFT Smart Contract Deployed at ", instance.address);

  const instancev2 = await upgradeProxy(instance.address, MillionR_V2);
  console.log("MillionRFactoryV2 Deployed", instancev2.address);
};
