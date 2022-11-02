import React, { useState } from 'react';
import clsx from 'clsx';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import {
	Card,
	CardActions,
	CardHeader,
	CardContent,
	Button,
	Divider,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	Tooltip,
	TableSortLabel
} from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

import mockData from './data';

export const LatestOrders = (props) => {
	const { className, ...rest } = props;

	const [ orders ] = useState(mockData);

	return (
		<Card {...rest}>
			<CardHeader
				action={
					<Button color='primary' size='small' variant='outlined'>
						New entry
					</Button>
				}
				title='Latest Orders'
			/>
			<Divider />
			<CardContent sx={{padding: 0}}>
				<PerfectScrollbar>
					<div style={{minWidth: 800}}>
						<Table>
							<TableHead>
								<TableRow>
									<TableCell>Order Ref</TableCell>
									<TableCell>Customer</TableCell>
									<TableCell sortDirection='desc'>
										<Tooltip enterDelay={300} title='Sort'>
											<TableSortLabel active direction='desc'>
												Date
											</TableSortLabel>
										</Tooltip>
									</TableCell>
									<TableCell>Status</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{orders.map((order) => (
									<TableRow hover key={order.id}>
										<TableCell>{order.ref}</TableCell>
										<TableCell>{order.customer.name}</TableCell>
										<TableCell>{moment(order.createdAt).format('DD/MM/YYYY')}</TableCell>
										<TableCell>
											<div style={{
												display: 'flex',
												alignItems: 'center'
											}}>{order.status}</div>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</div>
				</PerfectScrollbar>
			</CardContent>
			<Divider />
			<CardActions sx={{justifyContent: 'flex-end'}}>
				<Button color='primary' size='small' variant='text'>
					View all <ArrowRightIcon />
				</Button>
			</CardActions>
		</Card>
	);
};

LatestOrders.propTypes = {
	className: PropTypes.string
};

export default LatestOrders;
