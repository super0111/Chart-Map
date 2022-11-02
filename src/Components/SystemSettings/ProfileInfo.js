import React, { useState, useEffect } from 'react';
import { Paper, TextField, Button, Select } from '@mui/material';

function getSteps() {
	return [ 'New Meter Details', 'Data Confirmation', 'Data Added' ];
}

export default function ProfileInfo() {
	const [ activeStep, setActiveStep ] = useState(0);
	const [ User, setUser ] = useState({
		data: []
	});
	const steps = getSteps();

	const handleNext = () => {
		console.log(User);
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const handleReset = () => {
		setActiveStep(0);
	};

	const onSubmit = (fields) => {
		//console.log('Frommanget Fiels:', fields);
		setUser({ data: [ ...User.data, fields ] });
	};

	return (
		<div>
			<Paper>
				<TextField id='outlined-basic' label='Usernmae' variant='outlined' style={{ margin: 8 }} fullWidth />
				<TextField id='outlined-basic' label='Full Name' variant='outlined' style={{ margin: 8 }} fullWidth />
				<TextField id='outlined-basic' label='Telephone' variant='outlined' style={{ margin: 8 }} fullWidth />
				<TextField id='outlined-basic' label='Email' variant='outlined' style={{ margin: 8 }} fullWidth />
				<Select
					variant='outlined'
					label='Acount Type'
					style={{ margin: 8 }}
					fullWidth
					native
					inputProps={{
						name: 'age',
						id: 'filled-age-native-simple'
					}}>
					<option aria-label='None' value='' />
					<option value={10}>Administrator</option>
					<option value={20}>Client</option>
				</Select>
				<Button variant='contained' color='primary' onClick={handleBack}>
					Save
				</Button>
				<Button variant='contained' color='primary' onClick={handleBack}>
					Cancel
				</Button>
			</Paper>
		</div>
	);
}
