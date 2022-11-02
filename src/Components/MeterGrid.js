import React from 'react';
import { Grid } from '@mui/material';
import Image from '../Data/Capture_burned.jpg'; // Import using relative path
import MapCard from './Maps/MapCard';

const MeterGrid = (props) => (
	<div key={"meter-grid-1"}>
		{props.meters ? (
			<div key={"meter-grid-container-1"}>
				<Grid container spacing={10} style={styles.heroContainer}>
					{props.meters.map((meterInfo) => {
						return (
							<div style={styles.mapCard} key={"meter-grid-map-card-"+meterInfo.ID}>
								<MapCard MeterProfile={meterInfo}/>
							</div>
						);
					})}
				</Grid>
			</div>
		) : (
			'No meters in the data'
		)}
	</div>
);
const styles = {
	heroContainer: {
		backgroundImage: `url(${"./Capture_burned.png'"})`,
		backgroundSize: 'cover',
		backgroundPosition: 'center',
		width: `100%`,
		margin: 0,
	},
	mapCard:{
		width: `auto`,
		padding: 10
	}
};
export default MeterGrid;
