pragma solidity ^0.4.24;

contract HelloWorld {
    string private message;
    
    constructor(string _message) public {
        message = _message;
    }

    function getMessage() view public returns(string) {
      return message;
    }

    function updateMessage(string _message) public {
      message = _message;
    }
}
