import React from 'react';
import PropTypes from 'prop-types';
import { Box, Card, CardContent, Grid, Typography, Avatar, LinearProgress } from '@mui/material';

// import InsertChartIcon from '@material-ui/icons/InsertChartOutlined';
import img2 from './map_icon_green.png';

const ActiveMeters = (props) => {
	const { className, ...rest } = props;

	return (
		<Card {...rest} sx={{height: '99%'}}>
			<CardContent>
				<Grid container display="flex" justifyContent='space-between'>
					<Grid item>
						<Typography sx={{	fontWeight: 700 }} color='textSecondary' gutterBottom variant='body2'>
							Active Meters
						</Typography>
						<Typography variant='h4'>300 00</Typography>
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

ActiveMeters.propTypes = {
	className: PropTypes.string
};

export default ActiveMeters;
