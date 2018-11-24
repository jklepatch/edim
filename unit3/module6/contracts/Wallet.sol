pragma solidity ^0.4.24;

contract Wallet {
  address[] public approvers;
  struct Transfer {
    uint id;
    uint amount;
    address to;
    uint approvals;
    bool sent;
  }
  mapping(uint => Transfer) transfers;
  uint nextId;

  constructor(address[] _approvers) public {
    approvers = _approvers;
  }

  function createTransfer(uint amount, address to) public {
    transfers[nextId] = Transfer(
      nextId,
      amount,
      to,
      0,
      false
    );
    nextId++;
  }
}
