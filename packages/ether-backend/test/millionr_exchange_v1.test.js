/**
 * Copyright © All rights reserved 2022
 * Infinisoft Inc.
 * www.infini-soft.com
 */
const { deployProxy } = require("@openzeppelin/truffle-upgrades");
const MillionR_Exchange_V1_Test_Factory = require('./factories/millionr_exchange_v1_test_factory');
const config = require('../config.json');

if (
  !config?.develop?.finance?.payees ||
  !config?.develop?.finance?.shares 
  ) {
  console.error(`Configuration incorrect!`);
  process.exit(-1);
}

const MillionR_Exchange_V1 = artifacts.require("MillionR_Exchange_V1");

function createMillionR_Exchange_V1() {
  return deployProxy(MillionR_Exchange_V1, [
    config.develop.finance.payees,
    config.develop.finance.shares
  ]);
}

MillionR_Exchange_V1_Test_Factory(createMillionR_Exchange_V1(), "MillionR_Exchange");