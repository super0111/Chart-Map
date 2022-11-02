import React, { useState, useEffect } from 'react';

import { Box, Paper, Stepper, Step, StepLabel, Button, Typography } from '@mui/material';

import FormMeter from './FormMeter';
import InfromationReview from './InfromationReview';
import InfoTable from './InfoTable';

function getSteps() {
	return [ 'New Meter Details', 'Data Confirmation', 'Data Added' ];
}

export default function FormManager() {
	const [ activeStep, setActiveStep ] = useState(0);
	const [ User, setUser ] = useState({
		data: []
	});
	const steps = getSteps();

	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};
	const getStepContent = (stepIndex) => {
		switch (stepIndex) {
			case 0:
				return <FormMeter onSubmit={(Fields) => onSubmit(Fields)} />;
			case 1:
				return (
					<InfoTable
						data={User.data}
						header={[
							{
								name: 'First Name',
								prop: 'FirstName'
							},
							{
								name: 'Last Name',
								prop: 'lastName'
							},
							{
								name: 'City',
								prop: 'City'
							},
							{
								name: 'Erf Number',
								prop: 'ErfNumber'
							}
						]}
					/>
				);
			case 2:
				return <InfromationReview MeterUser={User.fields} />;
			default:
				return 'Unknown stepIndex';
		}
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
		<Paper sx={{
			width: "800px",
			padding: "24px",
			marginTop: "48px",
			marginLeft: "auto",
			marginRight: "auto",
		}}>
			<div>
				<Stepper activeStep={activeStep} alternativeLabel sx={{
					padding: "24px",
				}}>
					{steps.map((label) => (
						<Step key={label}>
							<StepLabel>{label}</StepLabel>
						</Step>
					))}
				</Stepper>
				<div>
					{activeStep === steps.length ? (
						<div>
							<Typography>
								All steps completed
							</Typography>
							<Button onClick={handleReset}>Reset</Button>
						</div>
					) : (
						<div>
							<Typography>
								{getStepContent(activeStep)}
							</Typography>
							<Box sx={{
								display: "flex",
								jsutifyContent: "flex-start",
								marginTop: "10px",
							}}> 
								<Button
									disabled={activeStep === 0}
									onClick={handleBack}
								>
									Back
								</Button>
								<Button variant='contained' color='primary' onClick={handleNext} sx={{marginLeft: '40px'}}>
									{activeStep === steps.length - 1 ? 'Finish' : 'Next'}
								</Button>
							</Box>
						</div>
					)}
				</div>
			</div>
		</Paper>
	);
}
