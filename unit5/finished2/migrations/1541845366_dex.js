const Dex = artifacts.require('Dex');
const WETH = artifacts.require('WETH');
const EOS = artifacts.require('EOS');
const OMG = artifacts.require('OMG');


module.exports = function(deployer, _network, accounts) {
  deployer.deploy([
    [WETH, {from: accounts[1]}],
    [EOS, {from: accounts[2]}],
    [OMG, {from: accounts[3]}]
  ])
  .then(() => {
    return deployer.deploy(
      Dex, 
      ['WETH', 'EOS', 'OMG'],
      [WETH.address, EOS.address, OMG.address],
      {from: accounts[0]}
    );
  })
  .then(() => {
    return Promise.all([
      WETH.at(WETH.address).transfer(accounts[3], 1000, {from: accounts[1]}),
      EOS.at(EOS.address).transfer(accounts[3], 1000, {from: accounts[2]}),
      OMG.at(OMG.address).transfer(accounts[3], 1000, {from: accounts[3]}),
      WETH.at(WETH.address).transfer(accounts[4], 1000, {from: accounts[1]}),
      EOS.at(EOS.address).transfer(accounts[4], 1000, {from: accounts[2]}),
      OMG.at(OMG.address).transfer(accounts[4], 1000, {from: accounts[3]}),
    ]);
  })
  .then(() => {
    return Promise.all([
      WETH.at(WETH.address).approve(Dex.address, 1000, {from: accounts[3]}),
      EOS.at(EOS.address).approve(Dex.address, 1000, {from: accounts[3]}),
      OMG.at(OMG.address).approve(Dex.address, 1000, {from: accounts[3]}),
      WETH.at(WETH.address).approve(Dex.address, 1000, {from: accounts[4]}),
      EOS.at(EOS.address).approve(Dex.address, 1000, {from: accounts[4]}),
      OMG.at(OMG.address).approve(Dex.address, 1000, {from: accounts[4]}),
    ]);
  });
};
