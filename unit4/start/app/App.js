import React, { Component } from 'react';
import Header from './layout/Header';
import Footer from './layout/Footer';
import { web3, contracts } from './ethereum';

class App extends Component {
  render() {
    return (
      <div id="app">
        <Header 
          contracts={contracts}
        />
        <main className="container-fluid">
          <div className="row">
            <div className="col-sm-4 first-col">
              <p>Todo...</p>
            </div>
            <div className="col-sm-8">
              <p>Todo...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
}

export default App;
