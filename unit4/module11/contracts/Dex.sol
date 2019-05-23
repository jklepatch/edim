pragma solidity ^0.5.8;

contract Dex {
  struct Token {
    bytes32 symbol;
    address at;
  }
  mapping(bytes32 => Token) private tokens;
  bytes32[] private tokenList;
  address public admin;

  constructor() public {
    admin = msg.sender;
  }

  function addToken(bytes32 _symbol, address _at) external {
    require(msg.sender == admin, 'Only admin');
    tokens[_symbol] = Token(_symbol, _at);
    tokenList.push(_symbol);
  }
}
