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

  constructor(address[] _approvers) payable public {
    approvers = _approvers;
  }

  function createTransfer(uint amount, address to) public {
    transfers[nextId] = Transfer(
      currentId,
      amount,
      to,
      0,
      false
    );
    transferList.push(nextId);
    currentId++;
  }

  function sendTransfer(uint id) public {
    require(transfers[id].to != 0);
    require(transfers[id].sent == false);
    address to = transfers[id].to;
    uint amount = transfers[id].amount;
    to.transfer(amount);
    transfers[id].sent = true;
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
    bool[] memory aps = new uint[](transferList.length);
    bool[] memory sents = new bool[](transferList.length);
    for(uint i = 0; i < transferList.length; i++) {
      ids[i] = transfers[transferList[i]].id;
      amounts[i] = transfers[transferList[i]].amount;
      tos[i] = transfers[transferList[i]].to;
      aps[i] = transfers[transferList[i]].approvals;
      sents[i] = transfers[transferList[i]].sent;
    }
    return (ids, amounts, tos, aps, sents);
  }
}
