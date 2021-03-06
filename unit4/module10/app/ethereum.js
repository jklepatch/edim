import Web3 from 'web3';
import DexArtifact from '../build/contracts/Dex.json';

//Configure web3 to work with Ethereum blockchain
const web3 = new Web3('http://localhost:9545');

//Build web3 contract objects to interact with our smart contracts
const getContract = (artifact) => {
  const networks = Object.keys(artifact.networks);
  const network = networks[networks.length - 1];
  const { address } = artifact.networks[network];
  return new web3.eth.Contract(artifact.abi, address);
};

const contracts = {
  dex: getContract(DexArtifact),
};

export { web3, contracts };
