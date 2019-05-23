pragma solidity ^0.5.0;

import 'openzeppelin-solidity/contracts/token/ERC20/ERC20.sol'; 
import 'openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol'; 

contract WETH is ERC20, ERC20Detailed {
  constructor() public ERC20Detailed('WETH', 'WETH', 0) {
    _mint(msg.sender, 10000);
  }
}
