import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardActionArea, CardActions, CardContent, CardMedia, Button, Typography } from '@mui/material';
import AreaCharts from './AreaPlot/AreaChart';

export default function MediaCard(props) {

	return (
		<Card sx={{	maxWidth: 545 }}>
			<CardContent sx={{	maxWidth: 545 }}>
				<AreaCharts />
				<Typography variant='body2' color='textSecondary' component='span'>
					<div>Meter Number: {props.MeterProfile.MeterNumber}</div>
					<div> User Name: {props.MeterProfile.UserName}</div>
				</Typography>
			</CardContent>

			<CardActions>
				<Button size='small' color='primary'>
					<Link
						to={{
							pathname: `/MeterProps/${props.MeterProfile.MeterNumber}`,
							state: { meter: props.MeterProfile }
						}}>
						Meter Profile
					</Link>
				</Button>
				<Button size='small' color='primary'>
					Grid Profile
				</Button>
			</CardActions>
		</Card>
	);
}
