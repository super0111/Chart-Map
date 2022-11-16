import React from 'react';
import PropTypes from 'prop-types';
import { Box, Card, CardContent, Grid, Typography, Avatar, LinearProgress } from '@mui/material';
import img2 from './map_icon_gray.png';

const TotalMeters = (props) => {
	const { className, ...rest } = props;
	const handleClick = (e) => {
		document.location.href='/MapDash/Grid';
	}

	return (
		<Card {...rest} sx={{height: '99%'}} onClick={handleClick}>
			<CardContent>
				<Grid container display="flex" justifyContent='space-between'>
					<Grid item>
						<Typography sx={{	fontWeight: 700 }} color='textSecondary' gutterBottom variant='body2'>
							Total Meters
						</Typography>
						<Typography variant='h4'>300 000</Typography>
					</Grid>
					<Grid item>
						<Avatar sx={{
							height: "56px",
							width: "56px"
						}}>
							<Box component="img" src={img2} sx={{
								height: '45px',
								width: '45px'
							}} />
						</Avatar>
					</Grid>
				</Grid>
				<LinearProgress value={75.5} variant='determinate' />
			</CardContent>
		</Card>
	);
};

TotalMeters.propTypes = {
	className: PropTypes.string
};

export default TotalMeters;
