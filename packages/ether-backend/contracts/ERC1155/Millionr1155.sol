/**
 * Copyright © All rights reserved 2022
 * Infinisoft Inc.
 * www.infini-soft.com
 */
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import "@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableMap.sol";
import '../Members/MillionrMembers.sol';

/// @custom:security-contact security@infin-soft.cloud
contract MillionrERC1155 is Initializable, ERC1155Upgradeable, OwnableUpgradeable {
    uint public cost;
    string public name;
    string public symbol;

    constructor() initializer {}

    function initialize(
        string memory newname,
        string memory newsymbol,
        string memory newuri
    )  public initializer  {
        name = newname;
        symbol = newsymbol;
        _setURI(newuri);
    }

    /**Hooks*/
    // function _safeTransferFrom(
    //     address from,
    //     address to,
    //     uint256 id,
    //     uint256 amount,
    //     bytes memory data
    // ) internal virtual override {
    //     super._safeTransferFrom(from, to, id, amount, data);

    //     updateMember(id, to);
    // }

    // function _safeBatchTransferFrom(
    //     address from,
    //     address to,
    //     uint256[] memory ids,
    //     uint256[] memory amounts,
    //     bytes memory data
    // ) internal virtual override {
    //     super._safeBatchTransferFrom(from, to, ids, amounts, data);

    //     for (uint256 i = 0; i < ids.length; i++) {
    //         updateMember(ids[i], to);
    //     }
    // }

    /** Members - END */

    // function mint(
    //     address account,
    //     uint256 id,
    //     uint256 amount,
    //     bytes memory data
    // ) public onlyOwner {
    //     if (isMemberExisting(id) || amount != 1) {
    //         revert("Invalid request!");
    //     } else {
    //         _mint(account, id, amount, data);
    //         addMember(id, account);
    //     }
    // }

    // function mintBatch(
    //     address to,
    //     uint256[] memory ids,
    //     uint256[] memory amounts,
    //     bytes memory data
    // ) public onlyOwner {
    //     // Cant mint to members?
    //     // require(!someMembersExisting(ids), "Incorrect ids!");
    //     require(everyUint256(amounts, 1), "Members are unique dawg!");

    //     _mintBatch(to, ids, amounts, data);

    //     for (uint256 i = 0; i < ids.length; i++) {
    //         addMember(ids[i], to);
    //     }
    // }
}
