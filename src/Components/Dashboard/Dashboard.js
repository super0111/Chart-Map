import React from 'react';
import { Grid, Paper } from '@mui/material';
import TotalMeters from './MeterCounts/TotalMeters';
import ActiveMeters from './MeterCounts/ActiveMeters';
import PowerSummary from './MeterCounts/PowerSummary';
import TotalSystemLoad from './MeterCounts/TotalSystemLoad';
import AreaCharts from './AreaPlot/AreaChart';
import WarningTables from './Tables/WarningTables';
import ChartsE from './EChartBlocks/ChartsE';
import ScatterChart from './EChartBlocks/ScatterChart';

export default function Dashboard() {

	return (
		<Grid container spacing={1}>
			<Grid item lg={3} sm={6} xl={3} xs={12}>
				<TotalMeters />
			</Grid>
			<Grid item lg={3} sm={6} xl={3} xs={12}>
				<ActiveMeters />
			</Grid>
			<Grid item lg={3} sm={6} xl={3} xs={12}>
				<PowerSummary />
			</Grid>
			<Grid item lg={3} sm={6} xl={3} xs={12}>
				<TotalSystemLoad />
			</Grid>

			<Grid item lg={6} md={10} xl={6} xs={12}>
				<Paper>
					<AreaCharts />
				</Paper>
			</Grid>

			<Grid item lg={6} md={10} xl={6} xs={12}>
				<WarningTables />
			</Grid>

			<Grid item lg={12} md={12} xl={12} xs={12}>
				<Paper>
					<ChartsE />
				</Paper>
			</Grid>

			<Grid item lg={12} md={12} xl={12} xs={12}>
				<Paper style={{marginTop: 20}}>
					<ScatterChart />
				</Paper>
			</Grid>

		</Grid>
	);
}
