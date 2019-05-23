const Dex = artifacts.require('Dex');
const WETH = artifacts.require('WETH');
const EOS = artifacts.require('EOS');
const OMG = artifacts.require('OMG');

module.exports = async function(deployer, _network, accounts) {
  await deployer.deploy(Dex, {from: accounts[0]});
  await deployer.deploy(WETH, {from: accounts[1]});
  await deployer.deploy(EOS, {from: accounts[2]});
  await deployer.deploy(OMG, {from: accounts[3]});

  const dex = await Dex.deployed();
  const weth = await WETH.deployed();
  const eos = await EOS.deployed();
  const omg = await OMG.deployed();

  await dex.addToken(web3.utils.asciiToHex('WETH'), weth.address);
  await dex.addToken(web3.utils.asciiToHex('EOS'), eos.address);
  await dex.addToken(web3.utils.asciiToHex('OMG'), omg.address);
}
