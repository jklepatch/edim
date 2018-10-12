pragma solidity ^0.4.24;

contract HelloWorld {
    string message;
    
    constructor(string _message) {
        message = _message;
    }

    function getMessage() returns(string) {
      return message;
    }
}
