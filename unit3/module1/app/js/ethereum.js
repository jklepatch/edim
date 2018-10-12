import TruffleContract from 'truffle-contract';
import Web3 from 'web3';
import { ethereumUrl } from './config';
import artifact from '../../contracts/Wallet.sol';

const web3 = new Web3(new Web3.providers.HttpProvider(ethereumUrl));

const networks = Object.keys(artifact.networks);
const network = networks[networks.length - 1];
const { address } = artifact.networks[network];

const Wallet = new TruffleContract(artifact);
Wallet.setProvider(web3.currentProvider);
const wallet = Wallet.at(address);
const getAccounts = web3.eth.getAccounts();

export default { web3, todo, getAccounts };
