// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/// @custom:security-contact info@infin-soft.com
contract SteveIsBack is ERC1155, Ownable {
    string public name;
    string public symbol;

    function massiveMintTo(address account, uint256 count) public onlyOwner {
        uint256[] memory amounts = new uint256[](count);
        uint256[] memory ids = new uint256[](count);

        for (uint i = 0; i < count; i++) {
            amounts[i] = 1;
            ids[i] = i;
        }

        _mintBatch(account, ids, amounts, "");
    }

    constructor()
        ERC1155(
            "https://s3q5qbgy1a.execute-api.us-east-1.amazonaws.com/dev/{id}"
        )
    {
        name = "Steve IS BACK";
        symbol = "STE";
    }

    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }

    function mint(
        address account,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) public onlyOwner {
        _mint(account, id, amount, data);
    }

    function mintBatch(
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) public onlyOwner {
        _mintBatch(to, ids, amounts, data);
    }
}
