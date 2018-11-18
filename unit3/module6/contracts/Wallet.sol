pragma solidity ^0.4.24;

contract Wallet {
  address[] public approvers;
  struct Transfer {
    uint id;
    uint amount;
    address to;
    bool sent;
  }
  mapping(uint => Transfer) transfers;
  uint[] transferList;
  uint currentId;

  constructor(address[] _approvers) public {
    approvers = _approvers;
  }

  function createTransfer(uint amount, address to) {
    transfers[currentId] = Transfer(
      currentId,
      amount,
      to,
      false
    );
    transferList.push(currentId);
    currentId++;
  }
}
