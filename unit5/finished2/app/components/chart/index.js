import React, { Component } from 'react';
import Chart from './Chart';

//const data = [
//  {id: 0, close: 100, date: (new Date(1547993511946)).getTime()},
//  {id: 1, close: 101, date: (new Date(1547993521946)).getTime()},
//  {id: 2, close: 110, date: (new Date(1547993531946)).getTime()},
//  {id: 3, close: 111, date: (new Date(1547993541946)).getTime()},
//  {id: 4, close: 104, date: (new Date(1547993551946)).getTime()},
//  {id: 5, close: 104, date: (new Date(1547993561946)).getTime()},
//  {id: 6, close: 108, date: (new Date(1547993571946)).getTime()},
//  {id: 7, close: 130, date: (new Date(1547993581946)).getTime()},
//  {id: 8, close: 140, date: (new Date(1547993591946)).getTime()},
//  {id: 9, close: 123, date: (new Date(1547993601946)).getTime()},
//  {id: 10, close: 129, date: (new Date(1547993611946)).getTime()},
//  {id: 10, close: 129, date: (new Date(1547993621946)).getTime()},
//  {id: 10, close: 129, date: (new Date(1547993631946)).getTime()},
//];
const data = [
  {id: 0, close: 100, date: (new Date(1547993511946))},
  {id: 1, close: 101, date: (new Date(1547993521946))},
  {id: 2, close: 110, date: (new Date(1547993531946))},
  {id: 3, close: 111, date: (new Date(1547993541946))},
  {id: 4, close: 104, date: (new Date(1547993551946))},
  {id: 5, close: 104, date: (new Date(1547993561946))},
  {id: 6, close: 108, date: (new Date(1547993571946))},
  {id: 7, close: 130, date: (new Date(1547993581946))},
  {id: 8, close: 140, date: (new Date(1547993591946))},
  {id: 9, close: 123, date: (new Date(1547993601946))},
  {id: 10, close: 129, date: (new Date(1547993611946))},
  {id: 10, close: 129, date: (new Date(1547993621946))},
  {id: 10, close: 129, date: (new Date(1547993631946))},
];

class ChartComponent extends Component {
  //componentDidMount() {
	//	this.setState({ data });
	//}
	render() {
    //if (this.state == null) {
		//	return <div>Loading...</div>
		//}
		return (
      <Chart 
        data={data} 
        width={500}
        ratio={16/9}
      />
		);
	}
}

export default ChartComponent;
