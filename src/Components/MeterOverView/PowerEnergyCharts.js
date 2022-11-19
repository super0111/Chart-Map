import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import Moment from 'moment';
import { Card, CardHeader, CardContent, CardActions, Divider, Button } from '@mui/material';
import palette from './AreaPlot/theme/palette';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

export const options = {
	responsive: true,
	maintainAspectRatio: false,
	animation: false,
	legend: { display: false },
	cornerRadius: 20,
	tooltips: {
		enabled: true,
		mode: 'index',
		intersect: false,
		borderWidth: 1,
		borderColor: palette.divider,
		backgroundColor: palette.white,
		titleFontColor: palette.text.primary,
		bodyFontColor: palette.text.secondary,
		footerFontColor: palette.text.secondary
	},
	layout: { padding: 0 },
	scales: {
		y: {
			suggestedMin: 50,
			suggestedMax: 100
	},
		xAxes: [
			{
				barThickness: 12,
				maxBarThickness: 10,
				barPercentage: 0.5,
				categoryPercentage: 0.5,
				ticks: {
					fontColor: palette.text.secondary
				},
				gridLines: {
					display: false,
					drawBorder: false
				}
			}
		],
		yAxes: [
			{
				ticks: {
					fontColor: palette.text.secondary,
					beginAtZero: true,
					min: 0,
				},
				gridLines: {
					borderDash: [ 2 ],
					borderDashOffset: [ 2 ],
					color: palette.divider,
					drawBorder: false,
					zeroLineBorderDash: [ 2 ],
					zeroLineBorderDashOffset: [ 2 ],
					zeroLineColor: palette.divider
				}
			}
		]
	}
};

const PowerEnergyCharts = (props) => {
	const { className, ...rest } = props;
	const [ state, setState ] = useState({
		active_energy_data: [],
		reactive_energy_data: [],
	});


	useEffect( ()=> {
		const fetchPosts = async () => {
			const request = new Request('http://gridx-meter-server-node-dev.us-east-1.elasticbeanstalk.com/meterEnergy/getAll', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZXRlckRSTiI6IjE1MTY2OTY1MSIsImlhdCI6MTY1ODQyNjMwN30.xj1kPhYqFL4p9LVyB7Oey4AyuDdvi5at1TVZtTyE_-A'
				}
			});
	
			const api_call = await fetch(request);
			const data = await api_call.json();
      const active_energy_data = data.map((item) => {
        const recodeTime = Moment(item.record_time).format('YYYY-MM-DD').toString();
        return item.active_energy;
      });
      const reactive_energy_data = data.map((item) => {
        const recodeTime = Moment(item.record_time).format('YYYY-MM-DD').toString();
        return item.reactive_energy;
      });
			setState({
				active_energy_data: active_energy_data,
				reactive_energy_data: reactive_energy_data,
			})
			
		}
		fetchPosts();
	}, [])
	
	const data = {
		labels: [ 'Mon', 'Tues', 'Wed', 'Thrus', 'Fri', 'Sat', 'Sun' ],
		datasets: [
			{
				label: 'Active Energy',
				backgroundColor: palette.primary.main,
				data: state.active_energy_data
			},
			{
				label: 'Reactive Energy',
				backgroundColor: palette.neutral,
				data: state.reactive_energy_data
			}
		]
	};

	return (
		<Card {...rest}>
			<CardHeader
				action={
					<Button size='small' variant='text'>
						Last 7 days <ArrowDropDownIcon />
					</Button>
				}
				title='Power and Energy Consuption'
			/>
			<Divider />

			<CardContent>
				<div style={{
					height: 400,
					position: 'relative'
				}}>
					<Bar data={data} options={options} />
				</div>
			</CardContent>
			
			<Divider />

			<CardActions sx={{
				justifyContent: 'flex-end'
			}}>
				<Button color='primary' size='small' variant='text'>
					Overview <ArrowRightIcon />
				</Button>
			</CardActions>
		</Card>
	);
};

export default PowerEnergyCharts;
