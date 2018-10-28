//import $ from 'jquery'; 
//import config from './config'; 
//import App from './lib/app';
//
//$(() => { 
//  const app = new App(config); 
//  app.setup()
//  //.then(() => { 
//  //  return app.init(); 
//  //}) 
//  .then(() => { 
//    console.log('Wallet Dapp loaded!'); 
//  }) 
//  .catch((error) => {
//    console.error(`Ooops... something went wrong: ${error}`);
//  });
//});

import React from 'react';
import { render } from 'react-dom';
import eth from './ethereum';
import App from './components/App';

eth.getAccounts.then(accounts => {
  render(
    <App web3={eth.web3} accounts={accounts} wallet={eth.wallet}/>,
    document.getElementById('app')
  );
})
