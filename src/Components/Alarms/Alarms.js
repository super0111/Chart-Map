import React, {useState, useEffect} from 'react';

import MaterialTable from 'material-table';
import { Grid } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material'

import EchartsCalendar from '../Dashboard/EChartBlocks/EchartsCalendar';
import '../Dashboard/EChartBlocks/home.css';

export default function Alarms() {
	const defaultMaterialTheme = createTheme()
	const [ state, setState ] = useState({
		meterData: [],
		ColumData: [
			{ title: 'Meter Number ', field: 'MeterNumber' },
			{ title: 'Location', field: 'Location' },
			{ title: 'Date/ Time', field: 'Date_time' },
			{ title: 'Alarm Type', field: 'AlarmType' },
			{ title: 'Alarm Code', field: 'AlarmCode' },
			{ title: 'Duration', field: 'Duration' }
		]
	})

	useEffect(()=>{
		var meterRequest = {
			key: 'StartGRID2020',
			SQLQuery: 'SELECT * FROM MeterNotification '
		};
		const fetchPosts = async () => {
			const request = new Request(
				'https://cors-anywhere.herokuapp.com/https://stargridx.net/GetMeterNofications.php',
				{
					method: 'GET',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(meterRequest)
				}
			);
			const api_call = await fetch(request);
			const data = await api_call.json();
			setState({ meterData: data.Server_response });
		};
		fetchPosts();
	}, [])

	const handleRowClick = () => {
		document.location.href='/MapDash/MeterLog';
	};

	return (
		<>
			{
				state.meterData != null &&
				<Grid container sx={{
					padding: "20px 0px 20px 0px",
				}}>
					<Grid item lg={6} md={6} xl={6} xs={12}>
						<div className="alarm-notifications-table">
							<ThemeProvider theme={defaultMaterialTheme}>
								<MaterialTable
									title='Alarms Notification'
									columns={[
										{ title: 'Meter Number ', field: 'MeterNumber' },
										{ title: 'Location', field: 'Location' },
										{ title: 'Date/ Time', field: 'Date_time' },
										{ title: 'Alarm Type', field: 'AlarmType' },
										{ title: ' Alarm Code', field: 'AlarmCode' },
										{ title: 'Duration (Hours)', field: 'Duration' }
									]}
									onRowClick={handleRowClick}
									data={state.meterData}
								/>
              </ThemeProvider>
						</div>
					</Grid>
					<Grid item lg={6} md={6} xl={6} xs={12}>
						<EchartsCalendar />
					</Grid>
				</Grid>
			}
		</>
	);
		
}

