import React, { Component } from 'react';
import Header from './layout/Header';
import Main from './layout/Main';
import Footer from './layout/Footer';

class App extends Component {
  render() {
    return (
      <div id="app">
        <Header/>
        <Main />
        <Footer />
      </div>
    );
  }
}

export default App;
