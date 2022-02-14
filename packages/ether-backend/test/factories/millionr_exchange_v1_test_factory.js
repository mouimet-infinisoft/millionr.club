/**
 * Copyright © All rights reserved 2022
 * Infinisoft Inc.
 * www.infini-soft.com
 */
const assert = require('assert')
const { randomUint256, randomRange, UINT256_LIMIT } = require("../helpers/math");
const { expectEvent, expectRevert } = require("@openzeppelin/test-helpers");

function MillionR_Exchange_V1_Test_Factory(_contractFactory, name) {
  contract(name, async function (accounts) {
    let contract;
    const testaccounts = accounts.slice(1);

    beforeEach("Create new contract", async () => {
      contract = await _contractFactory;
    });

    /**
     * Contract should is not undefined
     *
     */
    it("Contract: Contract should is not undefined", function () {
      return assert.notStrictEqual(contract, undefined, "Contract is undefined");
    });

  })
}


module.exports = MillionR_Exchange_V1_Test_Factory