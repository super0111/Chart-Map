import React, { Component }  from 'react';

import MaterialTable from 'material-table';
import { Grid } from '@mui/material';

import EchartsCalendar from '../Dashboard/EChartBlocks/EchartsCalendar';
import '../Dashboard/EChartBlocks/home.css';

export class Alarms extends Component {
	state = {
		meterData: []
	};
	stateData = {
		meterData: [],
		ColumData: [
			{ title: 'Meter Number ', field: 'MeterNumber' },
			{ title: 'Location', field: 'Location' },
			{ title: 'Date/ Time', field: 'Date_time' },
			{ title: 'Alarm Type', field: 'AlarmType' },
			{ title: 'Alarm Code', field: 'AlarmCode' },
			{ title: 'Duration', field: 'Duration' }
		]
	};
	componentDidMount = async () => {
		var meterRequest = {
			key: 'StartGRID2020',
			SQLQuery: 'SELECT * FROM MeterNotification '
		};
		//console.log(JSON.stringify(meterRequest));
		const request = new Request(
			'https://cors-anywhere.herokuapp.com/https://stargridx.net/GetMeterNofications.php',
			{
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(meterRequest)
			}
		);

		const api_call = await fetch(request);
		const data = await api_call.json();
		this.setState({ meterData: data.Server_response });
		// console.log(JSON.stringify(data));
	};
	handleRowClick = () => {
		document.location.href='/MapDash/MeterLog';
	};
	render() {
		if (this.state.meterData != null) {
			return (
				<Grid container sx={{
					padding: "20px 0px 20px 0px",
				}}>
					<Grid item lg={6} md={6} xl={6} xs={12}>
						<div className={"alarm-notifications-table"}>
							<MaterialTable
								// className={makeStyles.root}
								title='Alarms Notification'
								onRowClick={this.handleRowClick}
								columns={[
									{ title: 'Meter Number ', field: 'MeterNumber' },
									{ title: 'Location', field: 'Location' },
									{ title: 'Date/ Time', field: 'Date_time' },
									{ title: 'Alarm Type', field: 'AlarmType' },
									{ title: ' Alarm Code', field: 'AlarmCode' },
									{ title: 'Duration (Hours)', field: 'Duration' }
								]}
								data={this.state.meterData}
							/>
						</div>
					</Grid>
					<Grid item lg={6} md={6} xl={6} xs={12}>
						<EchartsCalendar />
					</Grid>
				</Grid>
			);
		}
		// {
		// 	return (
		// 		<div>
		// 			<MaterialTable
		// 				title='Smart Meters'
		// 				columns={this.state.ColumData}
		// 				onRowClick={this.handleRowClick}
		// 				editable={{
		// 					onRowAdd: (newData) =>
		// 						new Promise((resolve) => {
		// 							setTimeout(() => {
		// 								resolve();
		// 								this.setState((prevState) => {
		// 									const data = [ ...prevState.data ];
		// 									data.push(newData);
		// 									return { ...prevState, data };
		// 								});
		// 							}, 600);
		// 						}),
		// 					onRowUpdate: (newData, oldData) =>
		// 						new Promise((resolve) => {
		// 							setTimeout(() => {
		// 								resolve();
		// 								if (oldData) {
		// 									this.setState((prevState) => {
		// 										const data = [ ...prevState.data ];
		// 										data[data.indexOf(oldData)] = newData;
		// 										return { ...prevState, data };
		// 									});
		// 								}
		// 							}, 600);
		// 						}),
		// 					onRowDelete: (oldData) =>
		// 						new Promise((resolve) => {
		// 							setTimeout(() => {
		// 								resolve();
		// 								this.setState((prevState) => {
		// 									const data = [ ...prevState.data ];
		// 									data.splice(data.indexOf(oldData), 1);
		// 									return { ...prevState, data };
		// 								});
		// 							}, 600);
		// 						})
		// 				}}
		// 			/>
		// 		</div>
		// 	);
		// }
	}
}

export default Alarms;
