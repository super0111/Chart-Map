import React from 'react';
import { Bar } from 'react-chartjs-2';

import { Card, CardHeader, CardContent, CardActions, Divider, Button } from '@mui/material';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

import { data, options } from './Chart';

const WeeklyBargraphs = (props) => {
	const { className, ...rest } = props;

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
