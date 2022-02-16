/**
 * Copyright © All rights reserved 2022
 * Infinisoft Inc.
 * www.infini-soft.com
 */
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

/// @title Membership manangement abstraction
/// @author Martin Ouimet <mouimet@infini-soft.com>
/// @custom:security-contact security@infin-soft.cloud
abstract contract MillionrMembers {
    uint256 internal _price;
    uint256 public totalSupply;
    address[] internal members;

    event JoinMember(address indexed _member);
    event TransferMember(address indexed _to, uint256 _id);

    function initialize(uint256 _initialPrice, uint256 _initialtotalSupply)
        public
    {
        _price = _initialPrice;
        totalSupply = _initialtotalSupply;
    }

    /// @notice Function caller is added as a new member
    function joinMember() external payable virtual {
        require(members.length < totalSupply, "The club is full dawg");
        require(msg.value >= _price + tx.gasprice, "Get a job dawg");

        addMember(msg.sender);
    }

    /// @notice Membership can be transfered to another account
    function transferMember(address _to, uint256 _id) public payable virtual {
        require(msg.value >= tx.gasprice, "Get a job dawg");
        require(isMemberExisting(_id), "Member not in the club");
        require(_to != address(0x0), "Cannot trash something precious");
        // require(members[_id] == msg.sender, "Stealing is bad dawg");

        updateMember(_to, _id);
    }

    function addMember(address account) internal {
        members.push(account);
        emit JoinMember(msg.sender);
    }

    function updateMember(address _to, uint256 _id) internal {
        members[_id] = _to;
        emit TransferMember(_to, _id);
    }

    function isMemberExisting(uint256 id) internal view returns (bool) {
        return id < members.length;
    }
}
