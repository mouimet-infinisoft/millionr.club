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

/// @author Martin Ouimet <mouimet@infini-soft.com>
/// @custom:security-contact security@infin-soft.cloud
contract DeezNutsERC1155 is
    Initializable,
    ERC1155Upgradeable,
    OwnableUpgradeable
{
    string public name;
    string public symbol;

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() initializer {}

    function initialize() public initializer {
        __ERC1155_init("https://s3q5qbgy1a.execute-api.us-east-1.amazonaws.com/dev/{id}");
        __Ownable_init();

        name = "Deez Nuts Official";
        symbol = "NUTS";

        _mint(msg.sender, 0, 1, "");
        _mint(msg.sender, 0, 2, "");
        _mint(msg.sender, 0, 3, "");
        _mint(msg.sender, 0, 4, "");
        _mint(msg.sender, 0, 5, "");
        _mint(msg.sender, 0, 6, "");
    }
}
