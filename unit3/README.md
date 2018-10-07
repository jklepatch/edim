# Multi-sig ERC20 Wallet

This is the code for Unit 3 of Ethereum Dapp In Motions (Manning)

This wallet allows to send ERC20 tokens. Pre-approved users (approvers) can vote
to approve a specific transaction. When a transaction hasA quorum of users must first approve a 
transaction

## Features

Users are either:

* Admin: 1 admin, the address which created the smart contract
* Approvers: Created by admin

**Approvers can**:

* approve a transaction
* send a transaction

**Admins can**:

* Add an approver
* Remove an approver

## Transactions

Each Transaction contains these fields:

* id
* to
* amount

`id` are defined by the smart contract when the transaction is created, whereas
`to` and `amount` are provided by user.

## Approval / Payment process

When an approver calls the `approve()` function of the smart contract, 
the following happens:

* If the `id` is not provided to `approve()`, the smart contract:
  1. Check that the sender is in the list of approvers
  2. Check that there is enough ether in the contract for this transaction
  3. Create the transaction
  4. Add an approval to the transaction
  5. If the number of approvals has reached the quorum, the transaction is sent

* If the `id` is provided:, the smart contact:
  1. Check that the sender is in the list of approvers
  2. Send the transaction
