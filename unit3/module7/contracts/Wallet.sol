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
  uint[] transferList;
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
    transferList.push(nextId);
    nextId++;
  }

  function getTransfers() view public 
    returns(
      uint[], 
      uint[],
      address[],
      uint[],
      bool[]
    ) {
    uint[] memory ids = new uint[](transferList.length);
    uint[] memory amounts = new uint[](transferList.length);
    address[] memory tos = new address[](transferList.length);
    uint[] memory approvals = new uint[](transferList.length);
    bool[] memory sents = new bool[](transferList.length);
    for(uint i = 0; i < transferList.length; i++) {
      ids[i] = transfers[transferList[i]].id;
      amounts[i] = transfers[transferList[i]].amount;
      tos[i] = transfers[transferList[i]].to;
      approvals[i] = transfers[transferList[i]].approvals;
      sents[i] = transfers[transferList[i]].sent;
    }
    return (ids, amounts, tos, approvals, sents);
  }
}
