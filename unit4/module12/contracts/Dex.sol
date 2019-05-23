pragma solidity ^0.5.8;
pragma experimental ABIEncoderV2;

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

  function getTokens() 
    external 
    view 
    returns(Token[] memory) {
      Token[] memory _tokens = new Token[](tokenList.length);
      for (uint i = 0; i < tokenList.length; i++) {
        _tokens[i] = Token(
          tokens[tokenList[i]].symbol,
          tokens[tokenList[i]].at
        );
      }
      return _tokens;
  }
}
