/**
 * Copyright © All rights reserved 2022
 * Infinisoft Inc.
 * www.infini-soft.com
 */
const {
    expectEvent,
    expectRevert,
    BN,
    constants,
} = require("@openzeppelin/test-helpers");
const {deployProxy, upgradeProxy} = require("@openzeppelin/truffle-upgrades");

const MillionrERC1155Test = artifacts.require("MillionrERC1155Test");

contract("MillionrERC1155Test", (accounts) => {
    it(`Initializer`, async () => {
        const result = await deployProxy(MillionrERC1155Test, [
            "name",
            "symbol",
            "uri",
            1,
            1,
        ]);
        expect(await result.name()).to.include("name");
        expect(await result.symbol()).to.include("symbol");
    });

    it(`mint should emit TransferSingle Event`, async () => {
        const contract = await deployProxy(MillionrERC1155Test, [
            "name",
            "symbol",
            "uri",
            1,
            1,
        ]);

        expectEvent(
            await contract.mint(accounts[0], 0, 1, []),
            "TransferSingle"
        );
    });

    it(`mint should revert with zero address `, async () => {
        const contract = await deployProxy(MillionrERC1155Test, [
            "name",
            "symbol",
            "uri",
            1,
            1,
        ]);

        await expectRevert(
            contract.mint(constants.ZERO_ADDRESS, 1, 1, []),
            "Cannot trash something precious"
        );
    });

    it(`mint should revert with amount != 1`, async () => {
        const contract = await deployProxy(MillionrERC1155Test, [
            "name",
            "symbol",
            "uri",
            1,
            1,
        ]);

        await expectRevert(
            contract.mint(accounts[0], 1, 1111, []),
            "Member are unique dawg"
        );
    });

    it(`mint should revert when totalsupply is reached`, async () => {
        const contract = await deployProxy(MillionrERC1155Test, [
            "name",
            "symbol",
            "uri",
            1,
            0,
        ]);

        await expectRevert(
            contract.mint(accounts[0], 1, 1, []),
            "The club is full dawg"
        );
    });

    it(`safeTransferFrom should success`, async () => {
        const contract = await deployProxy(MillionrERC1155Test, [
            "name",
            "symbol",
            "uri",
            1,
            1,
        ]);
        await contract.mint(accounts[0], 1, 1, []);

        assert.equal(await contract.balanceOf(accounts[0], 0), 1);
        await contract.safeTransferFrom(accounts[0], accounts[1], 0, 1, []);
        assert.equal(await contract.balanceOf(accounts[0], 0), 0);
        assert.equal(await contract.balanceOf(accounts[1], 0), 1);
    });
});
