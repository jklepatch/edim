pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

import 'openzeppelin-solidity/contracts/token/ERC20/IERC20.sol';

contract Dex {
  struct Token {
    uint id;
    bytes32 symbol;
    address at;
  }
  mapping(bytes32 => Token) tokens; 
  bytes32[] tokenList;
  uint nextTokenId;
  mapping(address => mapping(bytes32 => uint)) balances;

  struct Order {
    uint id;
    address user;
    uint filled;
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

  struct Trade {
    uint id;
    address user1;
    address user2;
    uint amount;
    uint price;
    uint date;
  }
  mapping(bytes32 => Trade[]) trades;
  uint nextTradeId;

  constructor(bytes32[] memory symbols, address[] memory ats) public {
    for(uint i = 0; i < symbols.length; i++) {
      tokens[symbols[i]] = Token(nextTokenId++, symbols[i], ats[i]);
      tokenList.push(symbols[i]);
    }
  }

  function deposit(uint amount, bytes32 symbol) external {
    IERC20(tokens[symbol].at).transferFrom(msg.sender, address(this), amount);
    balances[msg.sender][symbol] += amount;
  }

  function withdraw(uint amount, bytes32 symbol, address to) external {
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

  function addLimitOrder(
    bytes32 token, 
    uint amount, 
    uint price, 
    Side side) 
    external {
    require(tokens[token].at != address(0), 'This token does not exist');
    if(side == Side.SELL) {
      require(balances[msg.sender][token] >= amount, 'Token balance is too low');  
    } else {
      require(balances[msg.sender][bytes32('WETH')] >= amount * price, 'WETH balance is too low');
    }
    Order[] storage orders = books[token][uint(side)];
    orders.push(Order(
      nextOrderId++, 
      msg.sender,
      0,
      amount, 
      price,
      now
    ));
    uint i = orders.length - 1;
    while(i > 0) {
      if(side == Side.BUY && orders[i].price < orders[i - 1].price) {
        break;
      }
      if(side == Side.SELL && orders[i].price > orders[i - 1].price) {
        break;
      }
      Order memory order = orders[i - 1];
      orders[i - 1] = orders[i];
      orders[i] = order;
      i--;
    }
  }

  function addMarketOrder(
    bytes32 token, 
    uint amount, 
    uint price, 
    Side side) 
    external {
    require(tokens[token].at != address(0), 'This token does not exist');
    if(side == Side.SELL) {
      require(balances[msg.sender][token] >= amount, 'Token balance is too low');  
    }
    Order[] storage orders = books[token][uint(side == Side.BUY ? Side.SELL : Side.BUY)];
    uint i = 0;
    uint remaining = amount;
    /*
     * Create trades while:
     * - orderbook has unfilled orders 
     * - and market order amount is not filled 100%
     */
    while(i < orders.length && remaining > 0) {
      uint matched = (remaining > (orders[i].amount - orders[i].filled)) ? (orders[i].amount - orders[i].filled) : remaining; 
      remaining -= matched;
      orders[i].filled += matched; 
      trades[token].push(Trade(
        nextTradeId++,
        orders[i].user, 
        msg.sender,
        matched,
        orders[i].price,
        now 
      ));
      i++;
    }

    //Prune orderbook - filled orders must be removed
    i = 0;
    while(i < orders.length && orders[i].filled == orders[i].amount) {
      _shiftOrders(orders);
    }
  }

  function getOrders(bytes32 token) 
    view 
    external 
    returns(Order[] memory, Order[] memory) {
    return (books[token][uint(Side.BUY)], books[token][uint(Side.SELL)]);
  }

  function getTrades(bytes32 token) 
    view 
    external 
    returns(Trade[] memory) {
    return (trades[token]);
  }

  function getTokens() 
    view 
    external 
    returns(Token[] memory) {
    Token[] memory _tokens = new Token[](tokenList.length);
    for(uint i = 0; i < tokenList.length; i++) {
      _tokens[i] = Token(
        tokens[tokenList[i]].id,
        tokens[tokenList[i]].symbol,
        tokens[tokenList[i]].at
      );
    }
    return _tokens;
  }

  function _shiftOrders(Order[] storage orders) internal {
    for(uint i = 0; i < orders.length - 1; i++) {
      orders[i] = orders[i + 1];
    }
    delete orders[orders.length - 1];
    orders.length--;
  }
}
