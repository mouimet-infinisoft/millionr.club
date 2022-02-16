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
import "@openzeppelin/contracts-upgradeable/token/ERC1155/utils/ERC1155HolderUpgradeable.sol";
import "../Members/MillionrMembers.sol";

/// @title NFT ERC11155 abstraction
/// @author Martin Ouimet <mouimet@infini-soft.com>
/// @custom:security-contact security@infin-soft.cloud
abstract contract MillionrERC1155 is
    Initializable,
    ERC1155Upgradeable,
    ERC1155HolderUpgradeable,
    OwnableUpgradeable,
    MillionrMembers
{
    string public name;
    string public symbol;
    uint256 private _availableTokenId;

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() initializer {}

    function initialize(
        string memory newname,
        string memory newsymbol,
        string memory newuri,
        uint256 _initialPrice,
        uint256 _initialMaxTotalSupply
    ) public initializer {
        __ERC1155_init(newuri);
        __Ownable_init();
        super.initialize(_initialPrice, _initialMaxTotalSupply);
        name = newname;
        symbol = newsymbol;
    }

    function memberTransfer(
        address from,
        address to,
        uint256 id,
        uint256 amount,
        bytes memory data

    ) public payable override(MillionrMembers) {
        super.memberTransfer(from, to, id, amount, data);
        super._safeTransferFrom(from, to, id, amount, data);

        
    }

    /**Hooks*/

    // function safeTransferFrom(
    //     address from,
    //     address to,
    //     uint256 id,
    //     uint256 amount,
    //     bytes memory data
    // ) public virtual override {
    //     super._safeTransferFrom(from, to, id, amount, data);
    //     super.updateMember(to, id);
    //     // super.updateMember(to, id);
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

    function generateTokenId() private {
        _availableTokenId += 1;
    }

    function mint(
        address _account,
        uint256 _id, // ignored
        uint256 _amount, // ignore
        bytes memory _data
    ) external onlyOwner {
        require(_id >= 0, "");
        require(_account != address(0x0), "Cannot trash something precious");
        require(_amount == 1, "Member are unique dawg");
        require(members.length < totalSupply, "The club is full dawg");

        _mint(_account, _availableTokenId, 1, _data);
        super.addMember(_account);
        generateTokenId();
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(ERC1155ReceiverUpgradeable, ERC1155Upgradeable)
        returns (bool)
    {
        return
            interfaceId == type(MillionrERC1155).interfaceId ||
            super.supportsInterface(interfaceId);
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
