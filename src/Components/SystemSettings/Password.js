import React, { useState, useEffect } from 'react';
import { Paper, TextField, Button } from '@mui/material';

function getSteps() {
	return [ 'New Meter Details', 'Data Confirmation', 'Data Added' ];
}

export default function Password() {
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
				<TextField
					id='outlined-basic'
					label='Old Password'
					variant='outlined'
					style={{ margin: 8 }}
					fullWidth
				/>
				<TextField
					id='outlined-basic'
					label='New Password'
					variant='outlined'
					style={{ margin: 8 }}
					fullWidth
				/>
				<TextField
					id='outlined-basic'
					label='Confrim New Password'
					variant='outlined'
					style={{ margin: 8 }}
					fullWidth
				/>
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
