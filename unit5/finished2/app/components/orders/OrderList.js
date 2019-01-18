import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

class OrderList extends Component {
  renderList(orders, side) {
    return (
      <Fragment>
        <h3>{side}</h3>
        <table className="table">
          <thead>
            <tr>
              <th>amount</th>
              <th>price</th>
              <th>date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.amount}</td>
                <td>{order.price}</td>
                <td>{order.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Fragment>
    );
  }
  render() {
    const { orders } = this.props;
    return (
      <div id="order-list" className="card">
        <h2 className="card-title">Orders</h2>
        <div className="row">
          <div className="col-sm-6">
            {this.renderList(orders.buy, 'Buy')}
          </div>
          <div className="col-sm-6">
            {this.renderList(orders.sell, 'Sell')}
          </div>
        </div>
      </div>
    );
  }
}

OrderList.propTypes = {
  orders: PropTypes.object
}

export default OrderList;
