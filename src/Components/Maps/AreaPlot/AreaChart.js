import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Card, CardHeader, CardContent, CardActions, Divider, Button } from '@mui/material';

import { data, options } from './Chart';

const AreaChart = (props) => {
	const { className, ...rest } = props;

	return (
		<div {...rest}>
			<h6> Meter Weekly Power Consuption </h6>
			<Divider />
			<CardContent>
				<div style={{
					height: 160,
					width: 360,
					position: 'relative'
				}}>
					<Bar data={data} options={options} />
				</div>
			</CardContent>
			<Divider />
		</div>
	);
};

export default AreaChart;
