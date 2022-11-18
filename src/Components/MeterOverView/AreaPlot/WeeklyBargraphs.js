import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import Moment from 'moment';
import { Card, CardHeader, CardContent, CardActions, Divider, Button } from '@mui/material';
import palette from './theme/palette';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

import { data, options } from './Chart';

const WeeklyBargraphs = (props) => {
	const { className, ...rest } = props;
	const [ state, setState ] = useState({
		energy_data: [],
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
      const energy_data = data.map((item) => {
        const recodeTime = Moment(item.record_time).format('YYYY-MM-DD').toString();
        return item.active_energy
      });
			setState({energy_data: energy_data})
			
		}
		fetchPosts();
	}, [])
	
const data = {
	labels: [ 'Mon', 'Tues', 'Wed', 'Thrus', 'Fri', 'Sat', 'Sun' ],
	datasets: [
		{
			label: 'This week',
			backgroundColor: palette.primary.main,
			data: state.energy_data
		},
		{
			label: 'Last week',
			backgroundColor: palette.neutral,
			data: state.energy_data.slice(6)
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
				title='Area Power Consuption'
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

export default WeeklyBargraphs;
