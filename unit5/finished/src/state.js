import Web3 from 'web3';

import DimDexContract from '../build/contracts/Dex.json';
import EOSContract from '../build/contracts/EOS.json';
import OMGContract from '../build/contracts/OMG.json';

const contract = require('truffle-contract');

const getDefaultState = () => {
  const state = {
    activeToken: "EOS",
    web3: null,
    walletAddress: undefined,
    balances: {
      eth: {
        dimDex: 0,
        wallet: 0,
      },
      eos: {
        dimDex: 0,
        wallet: 0,
      },
      omg: {
        dimDex: 0,
        wallet: 0,
      },
    },
    contracts: {
      dimDex: {
        address: undefined,
        instance: undefined
      },
      eos: {
        address: undefined,
        instance: undefined
      },
      omg: {
        address: undefined,
        instance: undefined
      },
    }
  };

  return state;
};

const getWeb3 = () => {
  return new Promise(function(resolve, reject) {
    // Wait for loading completion to avoid race conditions with web3 injection timing.
    window.addEventListener('load', () => {
      let results = undefined;
      let web3 = window.web3;

      // Checking if Web3 has been injected by the browser (Mist/MetaMask)
      if (typeof web3 !== 'undefined') {
        // Use Mist/MetaMask's provider.
        web3 = new Web3(web3.currentProvider);

        results = {
          web3: web3
        };

        console.log('Injected web3 detected.');

        resolve(results)
      } else {
        // Fallback to localhost if no web3 injection. We've configured this to
        // use the development console's port by default.
        var provider = new Web3.providers.HttpProvider('http://127.0.0.1:9545');

        web3 = new Web3(provider);

        results = {
          web3: web3
        };

        console.log('No web3 instance injected, using Local web3.');

        resolve(results);
      }
    });
  });
};

const getWalletAddress = (web3) => {
  return new Promise((resolve, reject) => {
    web3.eth.getAccounts((error, accounts) => {
      if(error) {
        reject(error);
        return;
      };

      resolve(accounts[0]);
    });
  });
};

const getContractInstances = (web3) => {
  const dimDex = contract(DimDexContract);
  const eos = contract(EOSContract);
  const omg = contract(OMGContract);

  dimDex.setProvider(web3.currentProvider);
  eos.setProvider(web3.currentProvider);
  omg.setProvider(web3.currentProvider);

  return new Promise((resolve, reject) => {
    Promise.all([
      dimDex.deployed(),
      eos.deployed(),
      omg.deployed()
    ])
    .then(([dimDexInstance, eosInstance, omgInstance]) => {
      const contracts = {
        dimDex: dimDexInstance,
        eos: eosInstance,
        omg: omgInstance,
      };
      resolve(contracts);
    })
    .catch((error) => {
      reject(error);
    });
  });
};

const getDimDexBalances = (contracts, walletAddress) => {
  const dimDexInstance = contracts.dimDex;

  return new Promise((resolve, reject) => {
    Promise.all([
      dimDexInstance.balanceOf.call("EOS"),
      dimDexInstance.balanceOf.call("OMG"),
    ])
    .then((results) => {
      resolve({
        eos: results[0].toString(), 
        omg: results[1].toString()
      });
    })
    .catch((error) => {
      reject(error);
    });
  });
};

const getWalletBalances = (contracts, walletAddress) => {
  const eosInstance = contracts.eos;
  const omgInstance = contracts.omg;

  return new Promise((resolve, reject) => {
    Promise.all([
      eosInstance.balanceOf.call(walletAddress),
      omgInstance.balanceOf.call(walletAddress),
    ])
    .then((results) => {
      resolve({
        eos: results[0].toString(), 
        omg: results[1].toString()
      });
    })
    .catch((error) => {
      reject(error);
    });
  });

    /*
     * Old code of truffle box, can be useful for inspiration
     */
      
      //this.state.accounts.metamask = accounts
      //dimDex.deployed().then((instance) => {
      //  dimDexInstance = instance

      //  // Stores a given value, 5 by default.
      //  return dimDexInstance.set(5, {from: accounts[0]})
      //}).then((result) => {
      //  // Get the value from the contract to prove it worked.
      //  return dimDexInstance.get.call(accounts[0])
      //}).then((result) => {
      //  // Update state with the result.
      //  return this.setState({ storageValue: result.c[0] })
      //})
};


export { 
  getDefaultState, 
  getWeb3, 
  getWalletAddress,
  getContractInstances,
  getDimDexBalances,
  getWalletBalances,
};
