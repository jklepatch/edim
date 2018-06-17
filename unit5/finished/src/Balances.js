import React from 'react';
import { Panel, Button } from 'react-bootstrap';

const Balances = (props) => {
  const { balances } = props;

  return(
    <Panel className="dd-module">
      <Panel.Heading><h3>Balances</h3></Panel.Heading>
      <Panel.Body>
        <table className="table">
          <thead>
            <tr>
              <th>Currency</th>
              <th>Wallet</th>
              <th>DimDEX</th>
              <th>Send</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>EOS</td>
              <td>{balances.eos.wallet}</td>
              <td>{balances.eos.dimDex}</td>
              <td><Button bsSize="small">Send</Button></td>
            </tr>
            <tr>
              <td>OMG</td>
              <td>{balances.omg.wallet}</td>
              <td>{balances.omg.dimDex}</td>
              <td><Button bsSize="small">Send</Button></td>
            </tr>
          </tbody>
        </table>
      </Panel.Body>
    </Panel>
  );
};

export default Balances;
