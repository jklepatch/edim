class Api {
  constructor(web3, wallet) {
    this.web3 = web3;
    this.wallet = wallet;
  }

  async getTransfers() {
    const transfers = [];
    const rawTransfers = await this.wallet.methods.getTransfers().call();
    for(let i = 0; i < rawTransfers[0].length; i++) {
      transfers.push({
        id: rawTransfers[0][i].id,
        amount: rawTransfers[1][i].amount,
        to: rawTransfers[2][i].to,
      });
    }
    return transfers;
  }

  async getAccounts() {
    return await this.web3.eth.getAccounts();
  }
}

export default Api;
