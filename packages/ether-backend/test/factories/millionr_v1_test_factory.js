/**
 * Copyright © All rights reserved 2022
 * Infinisoft Inc.
 * www.infini-soft.com
 */
const {
  randomUint256,
  randomRange,
  UINT256_LIMIT
} = require("../helpers/math");
const { expectEvent, expectRevert } = require("@openzeppelin/test-helpers");

function MillionR_V1_Test_Factory(_contract, name) {
  contract(name, async function (accounts) {
    let contract;
    const testaccounts = accounts.slice(1);
    const vipPrice = "0.5";
    const vipLimit = 10;

    before("Create new contract", async () => {
      contract = await _contract;
      await contract.createVipMember(vipLimit);
    });

    it(`vipMembersBalance: Should return ${vipLimit}`, async function () {
      const actual = await contract.vipMembersBalance();
      assert.equal(actual, vipLimit, `Vip Member count should be ${vipLimit}`);
    });

    it(`vipMembersBalance & addMember(): Should return ${
      vipLimit - 1
    }`, async function () {
      await contract.joinVipMember(testaccounts[0], {
        value: web3.utils.toWei(vipPrice, "ether")
      });
      const actual = await contract.vipMembersBalance();

      assert.equal(
        actual,
        vipLimit - 1,
        `Vip Member count should be ${vipLimit - 1}`
      );
    });

    it(`addMember(): Should revert Not enough ether`, async function () {
      await expectRevert(
        contract.joinVipMember(testaccounts[0], {
          value: web3.utils.toWei("0.02", "ether")
        }),
        "Not enough ether"
      );
    });

    // it("vipMembersBalance & addMember(): Should revert when vipMembersBalance <= 0 ", async function () {
    //   await expectRevert(
    //     Promise.allSettled(new Array(vipLimit)
    //       .fill(0)
    //       .map(() =>
    //         contract.joinVipMember(testaccounts[0], {
    //           value: web3.utils.toWei(vipPrice, "ether")
    //         })
    //       )),
    //     { value: web3.utils.toWei(vipPrice, "ether") },
    //     "No more vip members"
    //   );
    // });

    // /**
    //  * getMembersCount
    //  *
    //  */

    // it("getMembersCount: Should return 0", async function () {
    //   const actual = await contract.getMembersCount();
    //   assert.equal(actual, 0, "Member count should be 0");
    // });

    // it("getMembersCount: should return 3", async function () {
    //   await contract.mint(testaccounts[0], randomUint256(), 1, []);
    //   await contract.mint(testaccounts[0], randomUint256(), 1, []);
    //   await contract.mint(testaccounts[0], randomUint256(), 1, []);

    //   const actual = await contract.getMembersCount();
    //   return assert.equal(actual, 3, `Member count should be 3`);
    // });

    // [
    //   {
    //     amounts: new Array(10).fill(1),
    //     ids: new Array(10).fill(1).map(() => randomUint256()),
    //     account: testaccounts[0],
    //     expected: 10
    //   },
    //   {
    //     amounts: new Array(15).fill(1),
    //     ids: new Array(15).fill(1).map(() => randomUint256()),
    //     account: testaccounts[0],
    //     expected: 15
    //   }
    // ].forEach(async ({ ids, account, amounts, expected }) => {
    //   it("getMemberCount: Should return expected", async function () {
    //     const startCount = await contract.getMembersCount();
    //     await expectEvent(
    //       await contract.mintBatch(account, ids, amounts, []),
    //       "TransferBatch"
    //     );

    //     const actualCount = await contract.getMembersCount();
    //     const actual = Number(actualCount) - Number(startCount);

    //     return assert.equal(
    //       actual,
    //       expected,
    //       `Member count should be ${expected}`
    //     );
    //   });
    // });

    // /**
    //  * getMember
    //  *
    //  */

    // [
    //   { id: randomUint256(), account: testaccounts[0] },
    //   { id: randomUint256(), account: testaccounts[1] },
    //   { id: randomUint256(), account: testaccounts[2] }
    // ].forEach(async ({ id, account }) => {
    //   it("getMember: Should return expected account address", async function () {
    //     await contract.mint(account, id, 1, []);
    //     const actual = await contract.getMember(id);
    //     return assert.equal(
    //       actual,
    //       account,
    //       `getMembers should have returned address ${account}`
    //     );
    //   });
    // });

    // /**
    //  * Mint Existing id Expect Revert
    //  *
    //  */
    // it("Mint: Existing id Expect Revert", async function () {
    //   await contract.mint(testaccounts[0], 0, 1, []),
    //     await expectRevert(
    //       contract.mint(testaccounts[0], 0, 1, []),
    //       "Invalid request!"
    //     );
    // });

    // /**
    //  * Mint Amount Limit Revert Event
    //  *
    //  */
    // [
    //   {
    //     amount: 0,
    //     id: randomUint256(),
    //     account: testaccounts[0]
    //   },
    //   {
    //     amount: randomRange(UINT256_LIMIT, 2),
    //     id: randomUint256(),
    //     account: testaccounts[0]
    //   },
    //   {
    //     amount: randomRange(UINT256_LIMIT, 2),
    //     id: randomUint256(),
    //     account: testaccounts[0]
    //   },
    //   {
    //     amount: randomRange(UINT256_LIMIT, 2),
    //     id: randomUint256(),
    //     account: testaccounts[0]
    //   }
    // ].forEach(async ({ id, account, amount }) => {
    //   it("Mint: Amount Limit Revert Event", async function () {
    //     await expectRevert(
    //       contract.mint(account, id, amount, []),
    //       "Invalid request!"
    //     );
    //   });
    // });

    // /**
    //  * Mint success expect TransferSingle Event
    //  *
    //  */
    // [
    //   {
    //     amount: 1,
    //     id: randomUint256(),
    //     account: testaccounts[0]
    //   }
    // ].forEach(async ({ id, account, amount }) => {
    //   it("Mint: One NFT: Should Success and trigger TransferSingle Event", async function () {
    //     await expectEvent(
    //       await contract.mint(account, id, amount, []),
    //       "TransferSingle"
    //     );
    //   });
    // });

    // /**
    //  * Batch Mint success expect TransferBatch Event
    //  *
    //  */
    // [
    //   {
    //     amounts: new Array(10).fill(1),
    //     ids: new Array(10).fill(1).map(() => randomUint256()),
    //     account: testaccounts[0]
    //   },
    //   {
    //     amounts: new Array(15).fill(1),
    //     ids: new Array(15).fill(1).map(() => randomUint256()),
    //     account: testaccounts[0]
    //   }
    // ].forEach(async ({ ids, account, amounts }) => {
    //   it("Batch Mint: NFT: Should Success and trigger TransferBatch Event", async function () {
    //     await expectEvent(
    //       await contract.mintBatch(account, ids, amounts, []),
    //       "TransferBatch"
    //     );
    //   });
    // });
  });
}

module.exports = MillionR_V1_Test_Factory;
