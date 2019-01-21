import React, { Component } from "react";
import PropTypes from "prop-types";
import { scaleTime } from "d3-scale";
import { discontinuousTimeScaleProvider } from "react-stockcharts/lib/scale";
import { last } from "react-stockcharts/lib/utils";
import { ChartCanvas, Chart } from "react-stockcharts";
import { AreaSeries } from "react-stockcharts/lib/series";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";

class AreaChart extends Component {
	render() {
		const { data: initialData, width, ratio } = this.props;
    console.log(data);

    const xScaleProvider = discontinuousTimeScaleProvider
			.inputDateAccessor(d => d.date);
		const {
			data,
			xScale,
			xAccessor,
			displayXAccessor,
		} = xScaleProvider(initialData);
		const start = xAccessor(last(data));
		const end = xAccessor(data[Math.max(0, data.length - 150)]);
		const xExtents = [start, end];

		return (
			<ChartCanvas ratio={ratio} width={width} height={400}
        data={data} 
        margin={{ left: 70, right: 70, top: 10, bottom: 30 }}
        type='svg'
        seriesName='test'
				xAccessor={d => d.date}
        xAccessor={xAccessor}
        xExtents={xExtents}
        xScale={xScale}
        displayXAccessor={displayXAccessor}
			>
				<Chart id={0} yExtents={d => d.close}>
					<XAxis axisAt="bottom" orient="bottom" ticks={6}/>
					<YAxis axisAt="left" orient="left" ticks={6} />
					<AreaSeries
						yAccessor={d => d.close}
					/>
				</Chart>
			</ChartCanvas>
		);
	}
}


AreaChart.propTypes = {
	data: PropTypes.array,
	width: PropTypes.number,
	ratio: PropTypes.number
};

export default AreaChart;
