// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableMap.sol";

/// @custom:security-contact info@infin-soft.com
contract MillionR_V1 is Initializable, ERC1155Upgradeable, OwnableUpgradeable {
    using EnumerableMap for EnumerableMap.UintToAddressMap;
    uint256 public cost;
    string public name;
    string public symbol;
    address public exchangeProxy;
    EnumerableMap.UintToAddressMap private _membership;

    // Prelaunch
    uint256 public vipMembersBalance;
    uint256 public vipMembersCount;

    function joinVipMember() public payable {
        require(vipMembersBalance > 0, "No more vip members");
        require(msg.value >= 0.5 ether, "Not enough ether");

        _membership.set(vipMembersBalance, msg.sender);
        _safeTransferFrom(owner(), msg.sender, vipMembersBalance-1, 1, "");
        vipMembersBalance = vipMembersBalance - 1;
    }

    function createVipMember(uint256 amount) public onlyOwner {
        uint256[] memory ids = new uint256[](amount);
        uint256[] memory amounts = new uint256[](amount);

        for (uint256 i = 0; i < amount; i++) {
            ids[i] = i + vipMembersCount;
            amounts[i] = 1;
        }
        vipMembersBalance = vipMembersBalance + amount;
        vipMembersCount = vipMembersCount + amount;

        mintBatch(msg.sender, ids, amounts, "");
    }

    // prelaunch end

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() initializer {}

    function initialize(
        string memory newname,
        string memory newsymbol,
        string memory newuri,
        address _exchangeProxy
    ) public initializer {
        __ERC1155_init(newuri);
        __Ownable_init();
        name = newname;
        symbol = newsymbol;
        exchangeProxy = _exchangeProxy;
        cost = 1 ether;
        vipMembersBalance = 0;
        vipMembersCount = 0;
    }

    /*** FINANCE START */
    // function withdraw() public payable onlyOwner {
    //     (bool success, ) = exchangeProxy.call({value: address(this).balance});
    //     require(success);
    // }

    /*** FINANCE STOP */

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

    function someMembersExisting(uint256[] memory id)
        private
        view
        returns (bool)
    {
        for (uint256 i = 0; i < id.length; i++) {
            if (_membership.contains(id[i])) {
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

    function _safeBatchTransferFrom(
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) internal virtual override {
        super._safeBatchTransferFrom(from, to, ids, amounts, data);

        for (uint256 i = 0; i < ids.length; i++) {
            updateMember(ids[i], to);
        }
    }

    /** Members - END */

    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }

    function mint(
        address account,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) public onlyOwner {
        if (isMemberExisting(id) || amount != 1) {
            revert("Invalid request!");
        } else {
            _mint(account, id, amount, data);
            addMember(id, account);
        }
    }

    function everyUint256(uint256[] memory _values, uint256 _predicat)
        private
        pure
        returns (bool)
    {
        for (uint256 i = 0; i < _values.length; i++) {
            if (_values[i] != _predicat) {
                return false;
            }
        }

        return true;
    }

    function mintBatch(
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) public onlyOwner {
        // Cant mint to members?
        // require(!someMembersExisting(ids), "Incorrect ids!");
        require(everyUint256(amounts, 1), "Members are unique dawg!");

        _mintBatch(to, ids, amounts, data);

        for (uint256 i = 0; i < ids.length; i++) {
            addMember(ids[i], to);
        }
    }
}
