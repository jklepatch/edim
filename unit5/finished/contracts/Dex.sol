pragma solidity ^0.4.23;

import './erc20/StandardToken.sol';

contract Dex {
  struct Token {
    string name;
    address _address;
    bool exist;
  }

  address owner;

  mapping(string => Token) tokens;
  mapping(address => mapping(string => uint)) balances;

  constructor(address _owner, address EOSAddress, address OMGAddress) public {
    owner = _owner;
    tokens['EOS']._address = EOSAddress;  
    tokens['EOS'].exist = true;  
    tokens['OMG']._address = OMGAddress;  
    tokens['OMG'].exist = true;  
  }

  function depositToken(string tokenName, uint amount) public {
    require(tokens[tokenName].exist);
    StandardToken token = StandardToken(tokens[tokenName]._address);
    token.transferFrom(msg.sender, this, amount);
    balances[msg.sender][tokenName] += amount;
  }

  function balanceOf(string tokenName) public view returns (uint) {
    require(tokens[tokenName].exist);
    return balances[msg.sender][tokenName];
  }
}
