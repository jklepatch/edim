pragma solidity ^0.4.24;

contract Wallet {
  address[] public approvers;
  struct Transfer {
    uint id;
    uint amount;
    address to;
    //  address[] approvals;
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
      true
    );
    transferList.push(currentId);
    currentId++;
  }

  function getTransfers() view public 
    returns(
      uint[], 
      uint[],
      address[],
      bool[]
    ) {
    uint[] memory ids = new uint[](transferList.length);
    uint[] memory amounts = new uint[](transferList.length);
    address[] memory tos = new address[](transferList.length);
    bool[] memory sents = new bool[](transferList.length);
    for(uint i = 0; i < transferList.length; i++) {
      ids[i] = transfers[transferList[i]].id;
      amounts[i] = transfers[transferList[i]].amount;
      tos[i] = transfers[transferList[i]].to;
      sents[i] = transfers[transferList[i]].sent;
    }
    return (ids, amounts, tos, sents);
  }
}
