import React from 'react';
import { List, ListItem, ListItemText, Step, StepLabel, Button, Typography } from '@mui/material';

const products = [
	{ name: 'Product 1', desc: 'A nice thing', price: '$9.99' },
	{ name: 'Product 2', desc: 'Another thing', price: '$3.45' },
	{ name: 'Product 3', desc: 'Something else', price: '$6.51' },
	{ name: 'Product 4', desc: 'Best thing of all', price: '$14.11' },
	{ name: 'Shipping', desc: '', price: 'Free' }
];
const addresses = [ '1 Material-UI Drive', 'Reactville', 'Anytown', '99999', 'USA' ];
const payments = [
	{ name: 'Card type', detail: 'Visa' },
	{ name: 'Card holder', detail: 'Mr John Smith' },
	{ name: 'Card number', detail: 'xxxx-xxxx-xxxx-1234' },
	{ name: 'Expiry date', detail: '04/2024' }
];

export default function InfromationReview(props) {
	return (
		<React.Fragment>
			<Typography variant='h6' gutterBottom>
				Meter Data summary
			</Typography>
			<List disablePadding>
				<ListItem>
					<ListItemText primary='First Name' secondary={props.MeterUser.firstName} />
					<Typography variant='body2'>{props.MeterUser.FirstName} </Typography>
				</ListItem>

				<ListItem>
					<ListItemText primary='Last name' secondary={props.MeterUser.LastName} />
					<Typography variant='body2'>{props.MeterUser.LastName}</Typography>
				</ListItem>
				<ListItem>
					<ListItemText primary='Region' secondary={props.MeterUser.Region} />
					<Typography variant='body2'>{props.MeterUser.Region}</Typography>
				</ListItem>
				<ListItem>
					<ListItemText primary='City' secondary={props.MeterUser.City} />
					<Typography variant='body2'>{props.MeterUser.City}</Typography>
				</ListItem>
				<ListItem>
					<ListItemText primary='Constituency' secondary={props.MeterUser.Constituency} />
					<Typography variant='body2'>{props.MeterUser.Constituency}</Typography>
				</ListItem>
				<ListItem>
					<ListItemText primary='Street Name' secondary={props.MeterUser.StreetName} />
					<Typography variant='body2'>{props.MeterUser.StreetName}</Typography>
				</ListItem>
				<ListItem>
					<ListItemText primary='Meter Phone Number' secondary={props.MeterUser.MeterNumber} />
					<Typography variant='body2'>{props.MeterUser.MeterNumber}</Typography>
				</ListItem>
				<ListItem>
					<ListItemText primary='Meter Phone Number' secondary={props.MeterUser.MeterPhoneNumber} />
					<Typography variant='body2'>{props.MeterUser.MeterPhoneNumber}</Typography>
				</ListItem>
				<ListItem>
					<ListItemText primary='User Category' secondary={props.MeterUser.MeterPhoneNumber} />
					<Typography variant='body2'>{props.MeterUser.MeterPhoneNumber}</Typography>
				</ListItem>
			</List>
		</React.Fragment>
	);
}
