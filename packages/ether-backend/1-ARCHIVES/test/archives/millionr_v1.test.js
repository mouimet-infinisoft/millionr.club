/**
 * Copyright © All rights reserved 2022
 * Infinisoft Inc.
 * www.infini-soft.com
 */
const { deployProxy } = require("@openzeppelin/truffle-upgrades");
const MillionR_V1_Test_Factory = require('./factories/millionr_v1_test_factory');
const config = require('../.coverage_artifacts/contracts/MillionR_Exchange_V1.json');

if (!config?.networks || Object.values(config?.networks).length < 1 || !Object.values(config?.networks)[0]?.address) {
  console.error(`MillionrV1: Configuration incorrect, unable to obtain exchange contract address!`, Object.values(config?.networks));
  process.exit(-1);
}

const MillionR_V1 = artifacts.require("MillionR_V1");

async function createMillionR_V1() {
  return deployProxy(MillionR_V1, [
    "MillionR",
    "MLR",
    "http://www.test.com",
    Object.values(config?.networks)[0]?.address,
  ]);
}

MillionR_V1_Test_Factory(createMillionR_V1(), "MillionR");