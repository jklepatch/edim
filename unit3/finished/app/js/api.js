class Api {
  constructor(web3, wallet) {
    this.web3 = web3;
    this.wallet = wallet;
    this.accounts = undefined;
  }

  async createTransfer({amount, to}) {
    return await this.wallet.methods
      .createTransfer(amount, to)
      .send({from: this.accounts[0], gas: 200000});
  }

  async getTransfers() {
    const transfers = [];
    const rawTransfers = await this.wallet.methods.getTransfers().call();
    for(let i = 0; i < rawTransfers[0].length; i++) {
      transfers.push({
        id: rawTransfers[0][i],
        amount: rawTransfers[1][i],
        to: rawTransfers[2][i],
        sent: rawTransfers[3][i],
      });
    }
    return transfers;
  }

  async getAccounts() {
    return await this.web3.eth.getAccounts();
  }
}

export default Api;
