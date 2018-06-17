pragma solidity ^0.4.23;

import "./StandardToken.sol";

contract OMG is StandardToken {
	string public constant name = "OMG";
	string public constant symbol = "OMG";
	uint8 public constant decimals = 18;
  address owner;

	constructor(address _owner) public {
    owner = _owner; 
		totalSupply_ = 1e9 * 1e18;
		balances[owner] = totalSupply_;
	}
}
