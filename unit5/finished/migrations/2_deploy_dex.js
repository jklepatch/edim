const EOS = artifacts.require("./erc20/EOS.sol");
let OMG = artifacts.require("./erc20/OMG.sol");
let dimDex = artifacts.require("./Dex.sol");

module.exports = function(deployer, _network, accounts) {
  let EOSInstance = undefined;
  let OMGInstance = undefined;

  //Not working, return [undefined, undefined] ..
  //So have to deploy EOS and OMG separately
  //Promise.all([
  //  deployer.deploy(EOS, accounts[0]),
  //  deployer.deploy(OMG, accounts[0]),
  //])

  deployer.deploy(EOS, accounts[0])
  .then((_EOSInstance) => {
    EOSInstance = _EOSInstance;
    return Promise.all([
      EOSInstance.transfer(accounts[1], 100),
      EOSInstance.transfer(accounts[2], 100),
    ]);
  })
  .then(() => {
    return deployer.deploy(OMG, accounts[0])
  })
  .then((_OMGInstance) => {
    OMGInstance = _OMGInstance;
    return Promise.all([
      OMGInstance.transfer(accounts[1], 100),
      OMGInstance.transfer(accounts[2], 100),
    ]);
  })
  .then(() => {
    return Promise.all([
      EOSInstance.balanceOf(accounts[1]),
      OMGInstance.balanceOf(accounts[2]),
      EOSInstance.balanceOf(accounts[1]),
      OMGInstance.balanceOf(accounts[2]),
    ]);
  })
  .then((balances) => {
    console.log(`accounts[1] has
    - ${balances[0].toString()} EOS
    - ${balances[1].toString()} OMG`);
    console.log(`accounts[2] has
    - ${balances[2].toString()} EOS
    - ${balances[3].toString()} OMG`);

    return deployer.deploy(dimDex, accounts[0], EOSInstance.address, OMGInstance.address)
  })
  .then(() => {
    console.log('deployment finished!');
  })
  .catch((error) => {
    console.error(error);
  });
};
