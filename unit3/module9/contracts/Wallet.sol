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
  uint quorum;
  mapping(address => mapping(uint => bool)) approvals;

  constructor(address[] _approvers, uint _quorum) payable public {
    approvers = _approvers;
    quorum = _quorum;
  }

  function createTransfer(uint amount, address to) onlyApprovers() public {
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

  function sendTransfer(uint id) onlyApprovers() public {
    require(transfers[id].to != 0);
    require(transfers[id].sent == false);
    if(approvals[msg.sender][id] == false) {
      approvals[msg.sender][id] = true;
      transfers[id].approvals++;
    }
    if(transfers[id].approvals >= quorum) {
      transfers[id].sent = true;
      address to = transfers[id].to;
      uint amount = transfers[id].amount;
      to.transfer(amount);
    }
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

  modifier onlyApprovers() {
    bool allowed = false;
    for(uint i; i < approvers.length; i++) {
      if(approvers[i] == msg.sender) {
        allowed = true;
      }
    }
    if(allowed == false) {
      revert();
    }
    _;
  }
}
