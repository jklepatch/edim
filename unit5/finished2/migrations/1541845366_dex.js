const Dex = artifacts.require('Dex');
const EOS = artifacts.require('EOS');
const OMG = artifacts.require('OMG');


module.exports = function(deployer, _network, accounts) {
  deployer.deploy([
    [EOS, {from: accounts[1]}],
    [OMG, {from: accounts[2]}],
  ])
  .then(() => {
    return deployer.deploy(
      Dex, 
      ['EOS', 'OMG'],
      [EOS.address, OMG.address],
      {from: accounts[0]}
    );
  })
  .then(() => {
    return Promise.all([
      EOS.at(EOS.address).transfer(accounts[3], 1000, {from: accounts[1]}),
      OMG.at(OMG.address).transfer(accounts[3], 1000, {from: accounts[2]}),
      EOS.at(EOS.address).transfer(accounts[4], 1000, {from: accounts[1]}),
      OMG.at(OMG.address).transfer(accounts[4], 1000, {from: accounts[2]}),
    ]);
  });
};
