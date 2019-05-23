pragma solidity ^0.5.0;

import 'openzeppelin-solidity/contracts/token/ERC20/ERC20.sol'; 
import 'openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol'; 

contract EOS is ERC20, ERC20Detailed {
  constructor() public ERC20Detailed('EOS', 'EOS', 0) {
    _mint(msg.sender, 10000);
  }
}
