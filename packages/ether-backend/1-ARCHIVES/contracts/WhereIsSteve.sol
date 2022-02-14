// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableMap.sol";

/// @custom:security-contact info@infin-soft.com
contract WhereIsSteve is ERC1155, Ownable {
    using EnumerableMap for EnumerableMap.UintToAddressMap;
    string public name;
    string public symbol;
    EnumerableMap.UintToAddressMap private _membership;

    /** Members - START */
    function addMember(uint256 id, address account) private {
        require(!isMemberExisting(id), "Member existing!");
        _membership.set(id, account);
    }

    function updateMember(uint256 id, address account) private {
        require(_membership.contains(id), "Member not existing!");
        _membership.set(id, account);
    }

    function isMemberExisting(uint256 id) private view returns (bool) {
        return _membership.contains(id);
    }

    function someMembersExisting(uint256[] memory id) private view returns (bool) {
        for(uint256 i = 0; i < id.length; i++){
            if (_membership.contains(id[i])){
                return true;
            }
        }
        return false;
    }

    function getMember(uint256 id) public view returns (address) {
        return _membership.get(id);
    }

    function getMembersCount() public view returns (uint256) {
        return _membership.length();
    }

    /**Hooks*/
    function _safeTransferFrom(
        address from,
        address to,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) internal virtual override {
        super._safeTransferFrom(from, to, id, amount, data);

        updateMember(id, to);
    }

    /** Members - END */

    constructor(string memory _name, string memory _symbol, string memory _uri)
        ERC1155(
            _uri
        )
    {
        name = _name;
        symbol = _symbol;
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
        require(!isMemberExisting(id), "Incorrect id!");
        require(amount == 1, "Members are unique dawg!");
        
        _mint(account, id, amount, data);
        addMember(id, account);
    }

    function mintBatch(
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) public onlyOwner {
        require(!someMembersExisting(ids), "Incorrect ids!");
        // require(amounts == 1, "Members are unique dawg!");

        _mintBatch(to, ids, amounts, data);
    }
}
