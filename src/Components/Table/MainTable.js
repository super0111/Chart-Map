import React, { Component, useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import MaterialTable from 'material-table';
import { Grid } from '@mui/material';
import MapIcon from '@mui/icons-material/Map';
import { ThemeProvider, createTheme } from '@mui/material';

import UserToolbar from './UserToolbar';

export default function MainTable() {
	let history = useHistory();
	const defaultMaterialTheme = createTheme();

	const [ state, setState ] = useState({
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

	useEffect( ()=> {
		const fetchPosts = async () => {
			const request = new Request('http://gridx-meter-server-node-dev.us-east-1.elasticbeanstalk.com/meterProfile/getAll', {
					method: 'GET',
					headers: {
							'Content-Type': 'application/json',
							'authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZXRlckRSTiI6IjAwMDAwMzk5NjczNTEiLCJpYXQiOjE2NjMyOTE2NTl9.Q-5Sf02eatwT8UEHajmIBcdAuu1PmKsWrXQNU_oVGDI'
					}
			});
			const api_call = await fetch(request);
			const data = await api_call.json();
			setState({ meterData: data});
		}
		fetchPosts();
	}, [])

	const handleMapIconClick = (event, rowData) => {
		if(document.getElementById("main-collapse")) document.getElementById("main-collapse").click();
		if(rowData['ID'] != null){
			history.push({
				pathname: '/MapDash/Home2',
				state: {meterNumber: rowData['MeterNumber']}
			});
		}
	};

	return (
		<>
			{state.meterData != null} ?
			<div>
				<Grid container direction='column' justify='space-evenly' alignItems='stretch'>
					<Grid item lg={12} md={10} xl={12} xs={12} sx={{maxWidth: "100% !important"}}>
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
								data={state.meterData}
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
			</div>
			:
			<ThemeProvider theme={defaultMaterialTheme}>
				<MaterialTable
					title='Smart Meters'
					columns={state.ColumData}
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
			</ThemeProvider>
		</>
	);
}