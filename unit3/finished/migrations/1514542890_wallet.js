const Wallet = artifacts.require("./Wallet.sol");

module.exports = function(deployer, _network, accounts) {
  deployer.deploy(Wallet, 2, [accounts[0], accounts[1], accounts[2]]);
};
