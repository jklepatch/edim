const Dex = artifacts.require('Dex');
const EOS = artifacts.require('EOS');
const OMG = artifacts.require('OMG');


module.exports = async function(deployer, _network, accounts) {
  deployer.deploy(EOS);
  deployer.deploy(OMG);
  deployer.deploy(
    Dex, 
    ['EOS', 'OMG'],
    [EOS.address, OMG.address]
  );
};
