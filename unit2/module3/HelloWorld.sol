pragma solidity ^0.4.24;

contract HelloWorld {
    string public message;
    string private _message;
    
    constructor(string myMessage) public {
        message = myMessage;
        _message = myMessage;
    }
}
