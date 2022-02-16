/**
 * Copyright © All rights reserved 2022
 * Infinisoft Inc.
 * www.infini-soft.com
 */
const {constants, expectEvent, expectRevert} = require("@openzeppelin/test-helpers");

const MillionrMembersTest = artifacts.require("MillionrMembersTest");

contract("MillionrMembersTest", (accounts) => {
    let contract;

    beforeEach("Initialization", async () => {
        contract = await MillionrMembersTest.new();
    });

    it(`Contract exists`, () => {
        assert.exists(contract, `Contract not instanciated`);
    });

    it(`joinMember(): No more membership should revert`, async () => {
        await contract.initialize(web3.utils.toWei("0.01", "ether"), 1);

        await contract.joinMember({
            value: web3.utils.toWei("0.02", "ether"),
        });

        await expectRevert(
            contract.joinMember({
                value: web3.utils.toWei("0.02", "ether"),
            }),
            "The club is full dawg"
        );
    });

    it(`joinMember(): No money, no membership should revert`, async () => {
        await contract.initialize(web3.utils.toWei("0.01", "ether"), 1);
        await expectRevert(contract.joinMember(), "Get a job dawg");
    });

    it(`joinMember(): Welcome in the club`, async () => {
        await contract.initialize(web3.utils.toWei("0.01", "ether"), 10);

        const result = await contract.joinMember({
            value: web3.utils.toWei("0.02", "ether"),
        });

       expectEvent(result, "JoinMember");      
    });

    it(`transferMember(): No money, no transfer should revert`, async () => {
        await expectRevert(
            contract.transferMember(accounts[0], 0),
            "Get a job dawg"
        );
    });

    it(`transferMember(): No more members should revert`, async () => {
        await expectRevert(
            contract.transferMember(accounts[0], 0, {
                value: web3.utils.toWei("0.02", "ether"),
            }),
            "Member not in the club"
        );
    });

    it(`transferMember(): Wrong to EOA zero address should revert`, async () => {
        await contract.initialize(web3.utils.toWei("0.01", "ether"), 10);

        const result = await contract.joinMember({
            value: web3.utils.toWei("0.02", "ether"),
        });

        await expectRevert(
            contract.transferMember(constants.ZERO_ADDRESS, 0, {
                value: web3.utils.toWei("0.02", "ether"),
            }),
            "Cannot trash something precious"
        );
    });

    it(`transferMember(): Should pass with event TransferMember`, async () => {
        await contract.initialize(web3.utils.toWei("0.01", "ether"), 10);

        const result = await contract.joinMember({
            value: web3.utils.toWei("0.02", "ether"),
        });

        expectEvent(
            await contract.transferMember(accounts[0], 0, {
                value: web3.utils.toWei("0.02", "ether"),
            }),
            "TransferMember"
        );
    });

    it(`transferMember(): Should revert when sender is not owner of membership`, async () => {
        await contract.initialize(web3.utils.toWei("0.01", "ether"), 10);

        await contract.joinMember({
            from: accounts[0],
            value: web3.utils.toWei("0.02", "ether"),
        });

        await expectRevert(
            contract.transferMember(accounts[1], 0, {
                from: accounts[1],
                value: web3.utils.toWei("0.02", "ether"),
            }),
            "Stealing is bad dawg"
        );
    });
});
