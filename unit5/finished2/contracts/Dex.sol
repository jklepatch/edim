pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

import 'openzeppelin-solidity/contracts/token/ERC20/IERC20.sol';

contract Dex {
  struct Token {
    bytes32 symbol;
    address at;
  }
  mapping(bytes32 => Token) tokens; 
  bytes32[] tokenList;
  mapping(address => mapping(bytes32 => uint)) balances;

  struct Order {
    uint id;
    address user;
    uint amount;
    uint price;
    uint date;
  }
  enum Side {
    BUY,
    SELL
  }
  mapping(bytes32 => mapping(uint => Order[])) books;
  uint nextOrderId;

  constructor(bytes32[] memory symbols, address[] memory ats) public {
    for(uint i = 0; i < symbols.length; i++) {
      tokens[symbols[i]] = Token(symbols[i], ats[i]);
      tokenList.push(symbols[i]);
      //books[symbols[i]][uint(Side.BUY)] = new Order[](0);
      //books[symbols[i]][uint(Side.SELL)] = new Order[](0);
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

  function getOrders(bytes32 token) 
    view 
    external 
    returns(Order[] memory, Order[] memory) {
    return (books[token][uint(Side.BUY)], books[token][uint(Side.SELL)]);
  }

  function addLimitOrder(
    bytes32 token, 
    uint amount, 
    uint price, 
    Side side) 
    external {
    require(tokens[token].at != address(0), 'This token does not exist');
    Order[] storage orders = books[token][uint(side)];
    orders.push(Order(
      nextOrderId++, 
      msg.sender,
      amount, 
      price,
      now
    ));
    //uint i = orders.length - 1;
    //while(i > orders.length) {
    //  if(price < orders[i].price) {
    //    break;
    //  }
    //  Order memory order = orders[i];
    //  orders[i]= orders[i+1];
    //  orders[i+1] = order;
    //}
  }

  function addMarketOrder() external {
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
      bytes32[] memory, 
      address[] memory
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
