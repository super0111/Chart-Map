import React from 'react';

import ReactEcharts from 'echarts-for-react';
import './home.css';

// const data = [
// 	[ '2000-06-05', 116 ],
// 	[ '2000-06-06', 129 ],
	
// ];

export const Current = (props) => {
	const data = props.currentValues;
	return (
		<div className={'echarts-new'}>
			<ReactEcharts
				className='echarts'
				option={{
					title: {
						text: 'Current',
						left: 'center',
						top: '20px'
					},
					tooltip: {
						trigger: 'axis'
					},
					xAxis: {
						data: data?.map(function(item) {
							return item[0];
						})
					},
					yAxis: {
						splitLine: {
							show: false
						}
					},
					dataZoom: [
						{
							startValue: '2014-06-01'
						},
						{
							type: 'inside'
						}
					],
					visualMap: {
						top: 10,
						right: 10,
						pieces: [
							{
								gt: 0,
								lte: 50,
								color: '#096'
							},
							{
								gt: 50,
								lte: 100,
								color: '#ffde33'
							},
							{
								gt: 100,
								lte: 150,
								color: '#ff9933'
							},
							{
								gt: 150,
								lte: 200,
								color: '#cc0033'
							},
							{
								gt: 200,
								lte: 300,
								color: '#6699'
							},
							{
								gt: 300,
								color: '#7e0023'
							}
						],
						outOfRange: {
							color: '#999'
						}
					},
					series: {
						name: 'Meter',
						type: 'line',
						data: data?.map(function(item) {
							return item[1];
						}),
						markLine: {
							silent: true,
							data: [
								{
									yAxis: 50
								},
								{
									yAxis: 100
								},
								{
									yAxis: 150
								},
								{
									yAxis: 200
								},
								{
									yAxis: 300
								}
							]
						}
					}
				}}
				notMerge={true}
				lazyUpdate={true}
				theme={'theme_name'}
				opts={{}}
			/>
		</div>
	);
};

export default Current;
