// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "./MillionR_V1.sol";

/// @custom:security-contact info@infin-soft.com
contract MillionR_V2 is MillionR_V1 {

    function giveBackBitch() public onlyOwner {
        payable(msg.sender).transfer(address(this).balance);
    }   

receive()external payable{

}
    fallback()external payable{

    }
}
