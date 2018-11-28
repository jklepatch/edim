pragma solidity ^0.4.24;

import 'openzeppelin-solidity/contracts/token/ERC20/IERC20.sol';

contract Dex {
  struct Token {
    bytes32 symbol;
    address at;
  }
  mapping(bytes32 => Token) tokens; 
  bytes32[] tokenList;
  mapping(address => mapping(bytes32 => uint)) balances;

  //address[] public approvers;
  //struct Transfer {
  //  uint id;
  //  uint amount;
  //  address to;
  //  uint approvals;
  //  bool sent;
  //}
  //mapping(uint => Transfer) transfers;
  //uint[] transferList;
  //uint nextId;
  //uint quorum;
  //mapping(address => mapping(uint => bool)) approvals;

  constructor(bytes32[] symbols, address[] ats) public {
    for(uint i = 0; i < symbols.length; i++) {
      tokens[symbols[i]] = Token(symbols[i], ats[i]);
      tokenList.push(symbols[i]);
    }
  }

  function deposit(uint amount, bytes32 symbol) public {
    IERC20(tokens[symbol].at).transferFrom(msg.sender, address(this), amount);
    balances[msg.sender][symbol] += amount;
  }

  function withdraw(uint amount, bytes32 symbol, address to) public {
    require(balances[msg.sender][symbol] >= amount);
    balances[msg.sender][symbol] -= amount;
    IERC20(tokens[symbol].at).transfer(to, amount);
  }

  function balanceOf(address _address, bytes32 symbol) 
    view 
    public 
    returns(uint) {
      return balances[_address][symbol];
  }
    

  //function createTransfer(uint amount, address to) public {
  //  transfers[nextId] = Transfer(
  //    nextId,
  //    amount,
  //    to,
  //    0,
  //    false
  //  );
  //  transferList.push(nextId);
  //  currentId++;
  //}

  //function sendTransfer(uint id) public {
  //  require(transfers[id].to != 0);
  //  require(transfers[id].sent == false);
  //  if(approvals[msg.sender][id] == false) {
  //    approvals[msg.sender][id] = true;
  //    transfers[id].approvals++;
  //  }
  //  if(transfers[id].approvals >= quorum) {
  //    address to = transfers[id].to;
  //    uint amount = transfers[id].amount;
  //    to.transfer(amount);
  //    transfers[id].sent = true;
  //  }
  //}

  function getTokens() view public 
    returns(
      bytes32[], 
      address[]
    ) {
    bytes32[] memory symbols = new bytes32[](tokenList.length);
    address[] memory addresses = new address[](tokenList.length);
    for(uint i = 0; i < tokenList.length; i++) {
      symbols[i] = tokens[tokenList[i]].symbol;
      addresses[i] = tokens[tokenList[i]].at;
    }
    return (symbols, addresses);
  }
}
