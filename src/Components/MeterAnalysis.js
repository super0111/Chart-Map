import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import MaterialTable from 'material-table';
import { Grid } from '@mui/material';
import UserToolbar from './Table/UserToolbar';
import MapIcon from '@mui/icons-material/Map';

import { ThemeProvider, createTheme } from '@mui/material'

export default function MainTable() {

	const defaultMaterialTheme = createTheme()

	let history = useHistory();
	const [ stateValue, setState ] = useState({
		meterData: [],
		ColumData: [
			{ title: 'ID', field: 'ID' },
			{ title: 'Surname', field: 'Surname' },
			{ title: 'Name', field: 'Name' },
			{ title: 'Region', field: 'Region' },
			{ title: 'City', field: 'City' },
			{ title: 'Constituency ', field: 'Constituency' },
			{ title: 'Street Name', field: 'StreetName' },
			{ title: 'ErfNumber ', field: 'ErfNumber' },
			{ title: 'Meter  Number ', field: 'MeterNumber' },
			{ title: 'Phone Number', field: 'PhoneNumber' },
			{ title: 'User Category', field: 'UserCategory' },
			{ title: 'PhoneNumber', field: 'PhoneNumber' },
			{ title: 'Registration Date', field: 'RegistrationDate', type: 'numeric' }
		]
	});
	
	useEffect(()=>{
		var meterRequest = {
			key: 'StartGRID2020',
			SQLQuery: 'SELECT * FROM UserDetails '
		};

		const fetchPosts = async () => {
			const request = new Request('https://cors-anywhere.herokuapp.com/https://stargridx.net/GetUserProfile.php', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(meterRequest)
			});

			const api_call = await fetch(request);
			const data = await api_call.json();
			setState({ meterData: data.Server_response });
		}
		fetchPosts();
	}, [stateValue])

	const handleMapIconClick = (event, rowData) => {
		if(rowData['ID'] != null){
			history.push({
				pathname: '/MapDash/Home2',
				state: {meter: rowData['ID']}
			});
		}
	};

	return (
		<>
			{
				stateValue.meterData != null ?
				<Grid container direction='column' justify='space-evenly' alignItems='stretch'>
					<Grid item lg={12} md={10} xl={12} xs={12} sx={{
						maxWidth: "100% !important",
					}}>
						<UserToolbar />
						<ThemeProvider theme={defaultMaterialTheme}>
							<MaterialTable
								title='Smart Meters'
								columns={[
									{ title: 'Surname', field: 'Surname' },
									{ title: 'Name', field: 'Name' },
									{ title: 'Region', field: 'Region' },
									{ title: 'City', field: 'City' },
									{ title: 'Constituency ', field: 'Constituency' },
									{ title: 'Street Name', field: 'StreetName' },
									{ title: 'ErfNumber ', field: 'ErfNumber' },
									{ title: 'Meter  Number ', field: 'MeterNumber' },
									{ title: 'Phone Number', field: 'PhoneNumber' },
									{ title: 'User Category', field: 'UserCategory' },
									{ title: 'PhoneNumber', field: 'PhoneNumber' },
									{ title: 'Registration Date', field: 'RegistrationDate', type: 'numeric' }
								]}
								data={stateValue.meterData}
								editable={{
									onRowAdd: (newData) =>
										new Promise((resolve) => {
											setTimeout(() => {
												resolve();
												setState((prevState) => {
													const data = [ ...prevState.data ];
													data.push(newData);
													return { ...prevState, data };
												});
											}, 600);
										}),
									onRowUpdate: (newData, oldData) =>
										new Promise((resolve) => {
											setTimeout(() => {
												resolve();
												if (oldData) {
													setState((prevState) => {
														const data = [ ...prevState.data ];
														data[data.indexOf(oldData)] = newData;
														return { ...prevState, data };
													});
												}
											}, 600);
										}),
									onRowDelete: (oldData) =>
										new Promise((resolve) => {
											setTimeout(() => {
												resolve();
												setState((prevState) => {
													const data = [ ...prevState.data ];
													data.splice(data.indexOf(oldData), 1);
													return { ...prevState, data };
												});
											}, 600);
										}),
								}}
								actions={[
									{
										icon: MapIcon,
										tooltip: 'Show on Map',
										onClick: handleMapIconClick
									}
								]}
							/>
						</ThemeProvider>
						
					</Grid>
				</Grid>
				:
				<MaterialTable
					columns={[
						{ title: "Adı", field: "name" },
						{ title: "Soyadı", field: "surname" },
						{ title: "Doğum Yılı", field: "birthYear", type: "numeric" },
						{
							title: "Doğum Yeri",
							field: "birthCity",
							lookup: { 34: "İstanbul", 63: "Şanlıurfa" },
						},
					]}
					data={[
						{
							name: "Mehmet",
							surname: "Baran",
							birthYear: 1987,
							birthCity: 63,
						},
					]}
					title="Demo Title"
					onPageChange={()=>console.log('ddddfff')}
					editable={{
						onRowAdd: (newData) =>
							new Promise((resolve) => {
								setTimeout(() => {
									resolve();
									setState((prevState) => {
										const data = [ ...prevState.data ];
										data.push(newData);
										return { ...prevState, data };
									});
								}, 600);
							}),
						onRowUpdate: (newData, oldData) =>
							new Promise((resolve) => {
								setTimeout(() => {
									resolve();
									if (oldData) {
										setState((prevState) => {
											const data = [ ...prevState.data ];
											data[data.indexOf(oldData)] = newData;
											return { ...prevState, data };
										});
									}
								}, 600);
							}),
						onRowDelete: (oldData) =>
							new Promise((resolve) => {
								setTimeout(() => {
									resolve();
									setState((prevState) => {
										const data = [ ...prevState.data ];
										data.splice(data.indexOf(oldData), 1);
										return { ...prevState, data };
									});
								}, 600);
							})
					}}
				/>
			}
		</>
	);
}
