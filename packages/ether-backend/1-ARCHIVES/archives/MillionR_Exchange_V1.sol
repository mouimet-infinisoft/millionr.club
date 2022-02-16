// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts-upgradeable/finance/PaymentSplitterUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC1155/utils/ERC1155HolderUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableMap.sol";

/// @custom:security-contact info@infin-soft.com
contract MillionR_Exchange_V1 is
    Initializable,
    ERC1155HolderUpgradeable,
    PaymentSplitterUpgradeable,
    OwnableUpgradeable
{
    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() initializer {}

    function initialize(address[] memory payees, uint256[] memory shares_)
        public
        initializer
    {
        __PaymentSplitter_init(payees, shares_);
        __Ownable_init();
    }
}
