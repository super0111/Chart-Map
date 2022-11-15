import React from 'react';
import { Grid, Paper, Card } from '@mui/material';

import TransactionHistory from './TransactionHistory';
import Livechart from '../Livechart';
import MeterInformation from './MeterInformation';
import WeeklyBargraphs from '../AreaPlot/WeeklyBargraphs';
import MapLocation from './MapLocation';
import Voltage from '../../Dashboard/EChartBlocks/Voltage';
import Current from '../../Dashboard/EChartBlocks/Current';
import RealPower from '../../Dashboard/EChartBlocks/RealRower';
import ActivePower from '../../Dashboard/EChartBlocks/ActivePower';
import ReactivePower from '../../Dashboard/EChartBlocks/ReactivePower';
import ApparentPower from '../../Dashboard/EChartBlocks/ApparentPower';
import Frequency from '../../Dashboard/EChartBlocks/Frequency';

function DataOverview(props) {
	return (
		<div>
			<Grid container spacing={3}>
				{/* Chart */}
				<Grid item lg={12} md={12} xl={12} xs={12}>
					<Paper elevation={0}>
					
						
					</Paper>
				</Grid>
				{/* Recent Deposits md={4} lg={3}*/}
				<Grid item lg={8} md={12} xl={9} xs={12}>
					<Paper elevation={0}>
						<WeeklyBargraphs />
					</Paper>
				</Grid>
				{/* Recent Deposits md={4} lg={3}*/}
				<Grid item lg={4} md={6} xl={3} xs={12}>
					<Paper elevation={0}>
						<MapLocation />
					</Paper>
				</Grid>
				{/* Recent Deposits md={4} lg={3}*/}
				<Grid item lg={12} md={12} xl={12} xs={12}>
					<Paper elevation={0}>
						<Livechart />
					</Paper>
				</Grid>
				{/* Charts for Detail of Meter Profile */}
				<Grid item lg={6} md={6} xl={6} xs={12}>
					<Card>
						<Voltage />
					</Card>
				</Grid>
				<Grid item lg={6} md={6} xl={6} xs={12}>
					<Card>
						<Current />
					</Card>
				</Grid>
				<Grid item lg={6} md={6} xl={6} xs={12}>
					<Card>
						<RealPower />
					</Card>
				</Grid>
				<Grid item lg={6} md={6} xl={6} xs={12}>
					<Card>
						<ActivePower />
					</Card>
				</Grid>
				<Grid item lg={6} md={6} xl={6} xs={12}>
					<Card>
						<ReactivePower />
					</Card>
				</Grid>
				<Grid item lg={6} md={6} xl={6} xs={12}>
					<Card>
						<ApparentPower />
					</Card>
				</Grid>
				<Grid item lg={6} md={6} xl={6} xs={12}>
					<Card>
						<Frequency />
					</Card>
				</Grid>

			</Grid>
		</div>
	);
}

export default DataOverview;
