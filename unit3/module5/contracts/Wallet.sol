pragma solidity ^0.4.24;

contract Wallet {
  address[] public approvers;

  constructor(address[] _approvers) public {
    approvers = _approvers;
  }

  function createTransfer() view public returns(string) {
    return "Transfer created!";
  }
}
