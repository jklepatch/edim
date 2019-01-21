import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

class TradeList extends Component {
  renderList(trades, className) {
    return (
      <Fragment>
        <table className={`table table-striped mb-0 ${className}`}>
          <thead>
            <tr>
              <th>amount</th>
              <th>price</th>
              <th>date</th>
            </tr>
          </thead>
          <tbody>
            {trades.map((trade) => (
              <tr key={trade.id}>
                <td>{trade.amount}</td>
                <td>{trade.price}</td>
                <td>{trade.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Fragment>
    );
  }
  render() {
    const { trades } = this.props;
    return (
      <div id="trade-list" className="card">
        <h2 className="card-title">Trades</h2>
        <div className="row">
          <div className="col-sm-12">
            {this.renderList(trades, 'trade-list')}
          </div>
        </div>
      </div>
    );
  }
}

TradeList.propTypes = {
  trades: PropTypes.array
}

export default TradeList;
