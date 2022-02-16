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
import "../Members/MillionrMembers.sol";

/// @title NFT ERC11155 abstraction
/// @author Martin Ouimet <mouimet@infini-soft.com>
/// @custom:security-contact security@infin-soft.cloud
abstract contract MillionrERC1155 is
    Initializable,
    ERC1155Upgradeable,
    OwnableUpgradeable,
    MillionrMembers
{
    string public name;
    string public symbol;

    constructor() initializer {}

    function initialize(
        string memory newname,
        string memory newsymbol,
        string memory newuri,
        uint256 _initialPrice,
        uint256 _initialMaxTotalSupply
    ) public initializer {
        MillionrMembers.initialize(_initialPrice, _initialMaxTotalSupply);
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

    function mint(
        address _account,
        uint256 _id,
        uint256 _amount,
        bytes memory _data
    ) external onlyOwner {
        require(isMemberExisting(_id), "Member already in the club");
        require(_account != address(0x0), "Cannot trash something precious");
        require(_amount != 1, "Member are unique dawg");

        // uint id = MillionrMembers.addMember(_account);
        _mint(_account, _id, 1, _data);
    }

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
