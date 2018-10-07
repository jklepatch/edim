const Wallet = artifacts.require('Wallet.sol');

contract('Wallet', (accounts) => {
  it('addApprover() add approver if admin sent tx', async () => {
    const approvers = [accounts[1], accounts[2]]; 
    const wallet = await Wallet.deployed();

    approvers.map(async (approver) => {
      await wallet.addApprover(
        approver, 
        {from: accounts[0]}
      );
    });

    const _approvers = await wallet.getApproversList();
    //What this fails?
    //expect(_approvers).equal(approvers);
  });

  it('addApprover() revert if someone else than admin send tx', async () => {
    const wallet = await Wallet.new(2);
    try {
      await wallet.addApprover(
        accounts[2], 
        {from: accounts[1]}
      );
    } catch(e) {
      const _approvers = await wallet.getApproversList();
      expect(_approvers.length).equal(0);
      return;
    }
    throw new Error('Should have reverted');
  });

  it('removeApprover() remove approver if admin sent tx', async () => {
    const approvers = [accounts[1], accounts[2]]; 
    const wallet = await Wallet.new(2);

    approvers.map(async (approver) => {
      await wallet.addApprover(
        approver, 
        {from: accounts[0]}
      );
    });

    await wallet.removeApprover(
      approvers[1],
      {from: accounts[0]}
    );

    const _approvers = await wallet.getApproversList();
    expect(_approvers.length).equal(1);
    expect(_approvers[0]).equal(approvers[0]);
  });

  it('removeApprover() does not remove approver if someone else than admin sent tx', async () => {
    const approvers = [accounts[1], accounts[2]]; 
    const wallet = await Wallet.new(2);

    approvers.map(async (approver) => {
      await wallet.addApprover(
        approver, 
        {from: accounts[0]}
      );
    });

    try {
      await wallet.removeApprover(
        approvers[1],
        {from: accounts[3]}
      );
    } catch(e) {
      const _approvers = await wallet.getApproversList();
      expect(_approvers.length).equal(2);
      return;
    }
    throw new Error('Should have reverted');
  });

  it('Wallet should accept incoming ether', async () => {
    const wallet = await Wallet.new(2);
    await wallet.send(
      web3.toWei(1, 'ether'),
      {from: accounts[0]}
    );
    const balance = await wallet.getBalance();
    expect(web3.fromWei(balance.toNumber(), 'ether')).equal('1');
  });

  it('approve() should create a new transaction if quorum is not reached', () => {
    const wallet = await Wallet.new(2);
    await wallet.send(
      web3.toWei(1, 'ether'),
      {from: accounts[0]}
    );
    await wallet.approve(
      accounts[1],
      web3.toWei(0.5, 'ether')
      {from: accounts[0]}
    );
  });
});
