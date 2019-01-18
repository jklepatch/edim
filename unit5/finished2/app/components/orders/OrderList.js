import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

class OrderList extends Component {
  render() {
    const { orders } = this.props;
    return (
      <Fragment>
      <div id="order-list" className="card">
        <h2 className="card-title">Orders - Buy</h2>
        <table className="table">
          <thead>
            <tr>
              <th>amount</th>
              <th>price</th>
              <th>date</th>
            </tr>
          </thead>
          <tbody>
            {orders.buy.map((order) => (
              <tr key={order.id}>
                <td>{order.amount}</td>
                <td>{order.price}</td>
                <td>{order.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div id="order-list" className="card">
        <h2 className="card-title">Orders - Sell</h2>
        <table className="table">
          <thead>
            <tr>
              <th>amount</th>
              <th>price</th>
              <th>date</th>
            </tr>
          </thead>
          <tbody>
            {orders.sell.map((order) => (
              <tr key={order.id}>
                <td>{order.amount}</td>
                <td>{order.price}</td>
                <td>{order.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Fragment>
    );
  }
}

OrderList.propTypes = {
  orders: PropTypes.object
}

export default OrderList;
