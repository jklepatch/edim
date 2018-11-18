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

  function createTransfer(uint amount, address to) {
    transfers[nextId] = Transfer(
      currentId,
      amount,
      to,
      0,
      false
    );
    transferList.push(nextId);
    nextId++;
  }
}
