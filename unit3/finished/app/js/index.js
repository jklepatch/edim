import $ from 'jquery'; 
import config from './config'; 
import App from './lib/app';

$(() => { 
  const app = new App(config); 
  app.setup()
  //.then(() => { 
  //  return app.init(); 
  //}) 
  .then(() => { 
    console.log('Wallet Dapp loaded!'); 
  }) 
  .catch((error) => {
    console.error(`Ooops... something went wrong: ${error}`);
  });
});
