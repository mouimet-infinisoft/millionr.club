// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

/// @custom:security-contact info@infin-soft.com
contract MillionrV1 is Initializable, ERC1155Upgradeable, OwnableUpgradeable {
    uint public available;
    uint public soldMembership;
    uint constant public PAYBACK_RATE = 2;
    string public name;
    string public symbol;
    address[] public members;
    uint private _initialPrice;
    uint private _nextAvailableTokenId;

    event MemberJoin(address indexed _member);
    event Payback(address indexed _member, uint _value);

    /// @custom:oz-upgrades-unsafe-allow constructor
    // UNCOMMENT TO USE OUTSIDE LOCAL
    // constructor() initializer {}

// UNCOMMENT for local
    constructor(
             string memory newname,
        string memory newsymbol,
        string memory newuri
    ) initializer {
        __ERC1155_init(newuri);
        __Ownable_init();
        name = newname;
        symbol = newsymbol;
        _initialPrice = 1 ether;
    }

    function initialize(
        string memory newname,
        string memory newsymbol,
        string memory newuri
    ) public initializer {
         __ERC1155_init(newuri);
        __Ownable_init();
        name = newname;
        symbol = newsymbol;
        _initialPrice = 1 ether;
    }

// chsnge to https://docs.chain.link/docs/get-a-random-number/
    function random() private view returns (uint) {
        return uint(keccak256(abi.encodePacked(block.timestamp, block.difficulty)));
    }

    function getRandomIndex(uint _limit) public view returns (uint) {
        return uint(random() %  _limit);
    }

    function vipPayback() private {
        uint _memberIndex = getRandomIndex(soldMembership);

uint _amount = address(this).balance;
address payable _member = payable(members[_memberIndex]);

        _member.transfer(_amount);
        emit Payback(_member, _amount);
    }


function getAvailableTokenId() private returns (uint) {
    _nextAvailableTokenId = _nextAvailableTokenId + 1;
    return _nextAvailableTokenId;
}

function getLastTokenId() private view returns (uint) {
    return _nextAvailableTokenId;
}

    function memberJoin() public payable {
        require(available > 0, "No more vip members");
        require(msg.value >= _initialPrice + tx.gasprice, "Get a job");
        uint tokenId = getAvailableTokenId();

        _safeTransferFrom(owner(), msg.sender, tokenId, 1, "");
        updateMember(tokenId, msg.sender);
        available = available - 1;
        soldMembership = soldMembership + 1;

        emit MemberJoin(msg.sender);

        if (soldMembership % PAYBACK_RATE == 0) {
            vipPayback();
        }
    }

    function balance() public view returns (uint) {
        return address(this).balance;
    }

    function createVipMember(uint256 amount) public onlyOwner {
        uint256[] memory ids = new uint256[](amount);
        uint256[] memory amounts = new uint256[](amount);
        uint initialId = members.length;

        for (uint256 i = 0; i < amount; i++) {
            ids[i] = i + initialId;
            amounts[i] = 1;
        }

        mintBatch(msg.sender, ids, amounts, "");
    }



    /** Members - START */
    function addMember(uint256 id, address account) private {
        require(id >= members.length, "Member existing!");
        members.push(account);
        available = available + 1;
    }

    function updateMember(uint256 id, address account) private {
        require(id < members.length, "Member not existing!");
        members[id] = account;
    }

    function isMemberExisting(uint256 id) private view returns (bool) {
        return id < members.length;
    }

    function someMembersExisting(uint256[] memory ids)
        private
        view
        returns (bool)
    {
        for (uint256 i = 0; i < ids.length; i++) {
            if (ids[i] >= members.length) {
                return true;
            }
        }
        return false;
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
