pragma solidity ^0.4.24;

contract Wallet {
  /**
   * data
   */

  //address admin;
  uint8 quorum; //= 2; 
  //uint lastTransactionId = 0;
  struct Transfer {
    uint id;
    uint amount;
    address to;
  //  address[] approvals;
    bool sent;
  }
  uint[] transferList;
  mapping(uint => Transfer) transfers;
  address[] public approverList;
  mapping(address => bool) public approvers;
  //uint approvedTotal = 0;
  //mapping(uint => address[]) approvals;

  /**
   * events
   */

  //event ApproverAdded(uint date, address approver); 
  //event ApproverRemoved(uint date, address approver); 
  //event FundReceived(uint date, address sender, uint amount);
  //event TransactionSent(uint date, uint id, address to, uint amount);

  /**
   * Public functions
   */

  constructor(uint8 _quorum, address[] _approvers) public {
    //admin = msg.sender;
    quorum = _quorum;
    for(uint i = 0; i < _approvers.length; i++) {
      approvers[_approvers[i]] = true;
    }
  }

  function getTransfers() view public 
    returns(
      uint[], 
      uint[],
      address[]
    ) {
    uint[] memory ids = new uint[](transferList.length);
    uint[] memory amounts = new uint[](transferList.length);
    address[] memory tos = new address[](transferList.length);
    for(uint i = 0; i < transferList.length; i++) {
      ids[i] = transfers[transferList[i]].id;
      amounts[i] = transfers[transferList[i]].amount;
      tos[i] = transfers[transferList[i]].to;
    }
    return (ids, amounts, tos);
  }

  function getApprovers() view public returns(address[]) {
    return approverList;
  }

  //function getBalance() constant public returns(uint) {
  //  return address(this).balance;
  //}

  //function addApprover(address approver) public onlyAdmin() {
  //  approvers[approver] = true;
  //  approversList.push(approver);
  //  emit ApproverAdded(now, approver);
  //}

  //function removeApprover(address approver) public onlyAdmin() {
  //  approvers[approver] = false;
  //  uint _i = 0;
  //  //@Todo remove approval in transaction with revoke()
  //  for(uint i = 0; i < approversList.length; i++) {
  //    if(approversList[i] != approver) {
  //      approversList[_i] = approversList[i];
  //      _i++;
  //    }
  //  }
  //  delete approversList[approversList.length - 1];
  //  approversList.length = approversList.length - 1;
  //  emit ApproverRemoved(now, approver);
  //}

  //function approve(uint id, address to, uint amount) public onlyApprovers returns(uint) {
  //  // need to check enought money
  //  require(address(this).balance >= approvedTotal + amount);

  //  if(id == 0) {
  //    _approveNew(to, amount);
  //    return lastTransactionId;
  //  }
  //  _approveExisting(id);
  //  return id;
  //}

  ////@ToDo
  //function revoke(uint id) public onlyApprovers {
  //  require(transactions[id].to != 0);
  //  //need to change data structure to make it work
  //  transactions[id].approvals--;
  //  approvals[msg.sender][id] = false;
  //  //todo
  //}

  //function() payable public {
  //  emit FundReceived(now, msg.sender, msg.value);
  //}

  ///**
  // * Private functions
  // */

  //function _approveNew(address to, uint amount) private {
  //  // Calculate id of new transaction
  //  lastTransactionId++;

  //  // Create an empty array and add 1 approval
  //  address[] memory approvals = new address[](0); 
  //  approvals[0] = msg.sender;

  //  // Create a new Transaction and store it inside transactions mapping
  //  transactions[lastTransactionId] = Transaction(
  //    lastTransactionId,
  //    to, 
  //    amount,
  //    approvals,
  //    false
  //  );

  //  // If quorum = 1 we need to send this transaction
  //  _maybeTransfer(lastTransactionId);
  //}

  //function _approveExisting(uint id) private {
  //  // this must be an already-existing transaction
  //  require(transactions[id].to != 0);

  //  // Same address cant approve twice ...
  //  for(uint i = 0; i < transactions[id].approvals.length; i++) {
  //    require(transactions[id].approvals[i] != msg.sender);
  //  }

  //  // Add approval
  //  transactions[id].approvals.push(msg.sender);

  //  // Will transfer if quorum is reached and not already transferred
  //  _maybeTransfer(id);
  //}

  //function _maybeTransfer(uint id) private {
  //  // Do we have enough approvals?
  //  if(transactions[id].approvals.length < quorum) {
  //    return;
  //  }

  //  // If the transaction is already sent execution supposed to be halted before in approve()
  //  assert(transactions[id].sent == false);

  //  // Everything is fine, we can do the transfer
  //  address to = transactions[id].to;
  //  uint amount = transactions[id].amount;
  //  to.transfer(amount);
  //  transactions[id].sent == true;
  //  approvedTotal = approvedTotal - transactions[id].amount;
  //  emit TransactionSent(now, id, to, amount);
  //}

  /**
   * Modifier
   */

  //modifier onlyAdmin() {
  //  require(msg.sender == admin);
  //  _;
  //}

  modifier onlyApprovers() {
    require(approvers[msg.sender] == true);
    _;
  }
}
