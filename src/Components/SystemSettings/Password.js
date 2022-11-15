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
		setUser({ data: [ ...User.data, fields ] });
	};

	return (
		<div>
			<Paper sx={{
				width: "800px",
				marginLeft: "auto",
				marginRight: "auto",
				marginTop: "70px",
				padding: "24px",
			}}>
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
				<Button variant='contained' color='primary' onClick={handleBack} sx={{
					backgroundColor: "#3f51b5",
				}}>
					Save
				</Button>
				<Button variant='contained' color='primary' onClick={handleBack} sx={{
					backgroundColor: "#3f51b5",
					marginLeft: "20px",
				}}>
					Cancel
				</Button>
			</Paper>
		</div>
	);
}
