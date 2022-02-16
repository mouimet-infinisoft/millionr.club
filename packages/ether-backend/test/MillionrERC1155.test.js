/**
 * Copyright © All rights reserved 2022
 * Infinisoft Inc.
 * www.infini-soft.com
 */
const {zeroEAO} = require("./helpers/ethereum");
const {expectEvent, expectRevert} = require("@openzeppelin/test-helpers");

const MillionrERC1155 = artifacts.require("MillionrERC1155");

contract("MillionrERC1155", (accounts) => {
    let contract;

    beforeEach("Initialization", async () => {
        contract = await MillionrERC1155.new();
    });

    it(`Contract exists`, () => {
        assert.exists(contract, `Contract not instanciated`);
    });

   
});
