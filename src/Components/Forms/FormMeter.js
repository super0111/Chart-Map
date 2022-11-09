import React, { useState } from 'react';
import { Grid, TextField, Typography } from '@mui/material';

const getDateShort = () => {
	const today = new Date().toISOString().slice(0, 10);
	return today;
};
const GetDateLong = () => {
	var objToday = new Date(),
		weekday = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'),
		dayOfWeek = weekday[objToday.getDay()],
		domEnder = (function() {
			var a = objToday;
			if (/1/.test(parseInt((a + '').charAt(0)))) return 'th';
			a = parseInt((a + '').charAt(1));
			return 1 == a ? 'st' : 2 == a ? 'nd' : 3 == a ? 'rd' : 'th';
		})(),
		dayOfMonth =
			today + (objToday.getDate() < 10) ? '0' + objToday.getDate() + domEnder : objToday.getDate() + domEnder,
		months = new Array(
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December'
		),
		curMonth = months[objToday.getMonth()],
		curYear = objToday.getFullYear(),
		curHour =
			objToday.getHours() > 12
				? objToday.getHours() - 12
				: objToday.getHours() < 10 ? '0' + objToday.getHours() : objToday.getHours(),
		curMinute = objToday.getMinutes() < 10 ? '0' + objToday.getMinutes() : objToday.getMinutes(),
		curSeconds = objToday.getSeconds() < 10 ? '0' + objToday.getSeconds() : objToday.getSeconds(),
		curMeridiem = objToday.getHours() > 12 ? 'PM' : 'AM';
	var today =
		curHour +
		':' +
		curMinute +
		'.' +
		curSeconds +
		curMeridiem +
		' ' +
		dayOfWeek +
		' ' +
		dayOfMonth +
		' of ' +
		curMonth +
		', ' +
		curYear;

	console.log(today);
	return today;
};

export default function FormMeter() {
	const [ state, setState ] = useState({
		FirstName: '',
		LastName: '',
		Region: '',
		City: '',
		ErfNumber: '',
		Constituency: '',
		StreetName: '',
		MeterNumber: '',
		MeterPhoneNumber: '',
		UserCategory: '',
		RistrationDate: ''
	});

	const Change = (e) => {
		setState({ [e.target.name]: e.target.value });
		setState({ RistrationDate: getDateShort() });
	};

	return (
		<React.Fragment>
			<Typography variant='h6' gutterBottom>
				New Meter Infromation
			</Typography>
			<Grid container spacing={3}>
				<Grid item xs={12} sm={6}>
					{/* <TextField
						id='FirstName'
						name='FirstName'
						label='First name'
						value={state.FirstName}
						onChange={(e) => Change(e)}
					/> */}
					<TextField 
						id="FirstName" 
						label="FirstName" 
						variant="standard" 
						value={state.FirstName}
						onChange={(e) => Change(e)}
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						value={state.LastName}
						required
						id='lastName'
						name='LastName'
						label='Last name'
						variant="standard" 
						onChange={(e) => Change(e)}
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						required
						id='Region'
						name='Region'
						label='Region'
						variant="standard" 
						value={state.Region}
						onChange={(e) => Change(e)}
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						value={state.City}
						required
						id='City'
						name='City'
						label='City'
						variant="standard" 
						onChange={(e) => Change(e)}
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						value={state.Constituency}
						id='Constituency'
						name='Constituency'
						label='Constituency'
						variant="standard" 
						onChange={(e) => Change(e)}
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						value={state.StreetName}
						id='StreetName'
						name='StreetName'
						label='Street Name'
						variant="standard" 
						onChange={(e) => Change(e)}
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						required
						value={state.ErfNumber}
						id='ErfNumber'
						name='ErfNumber'
						label='Erf Number'
						variant="standard" 
						onChange={(e) => Change(e)}
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						required
						value={state.MeterNumber}
						id='MeterNumber'
						name='MeterNumber'
						label='Meter Number'
						variant="standard" 
						onChange={(e) => Change(e)}
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						required
						value={state.MeterPhoneNumber}
						id='MeterPhoneNumber'
						name='MeterPhoneNumber'
						label='Meter Phone Number'
						variant="standard" 
						onChange={(e) => Change(e)}
					/>
				</Grid>

				<Grid item xs={12} sm={6}>
					<TextField
						required
						value={state.UserCategory}
						id='UserCategory'
						name='UserCategory'
						label='User Category'
						variant="standard" 
						onChange={(e) => Change(e)}
					/>
				</Grid>
			</Grid>
		</React.Fragment>
	);
}
