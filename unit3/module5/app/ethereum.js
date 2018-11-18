import Web3 from 'web3';
import artifact from '../build/contracts/Wallet.json';

//Configure web3 to work with Ethereum blockchain
const web3 = new Web3('http://localhost:9545');

//Configure web3 to work with our smart contract
const networks = Object.keys(artifact.networks);
const network = networks[networks.length - 1];
const { address } = artifact.networks[network];
const wallet = new web3.eth.Contract(artifact.abi, address);

export { web3, wallet };
