import React, { Component } from 'react';
import { Grid, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

import {
	Button,
	ButtonGroup,
	ButtonToolbar,
	Card,
	CardBody,
	CardFooter,
	CardTitle,
	Col,
	Row
} from 'reactstrap';

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
	return { id, date, name, shipTo, paymentMethod, amount };
}

const rows = [
	createData(0, '16 Mar, 2019', 'Elvis Presley', 'Tupelo, MS', 'VISA ⠀•••• 3719', 312.44),
	createData(1, '16 Mar, 2019', 'Paul McCartney', 'London, UK', 'VISA ⠀•••• 2574', 866.99),
	createData(2, '16 Mar, 2019', 'Tom Scholz', 'Boston, MA', 'MC ⠀•••• 1253', 100.81),
	createData(3, '16 Mar, 2019', 'Michael Jackson', 'Gary, IN', 'AMEX ⠀•••• 2000', 654.39),
	createData(4, '15 Mar, 2019', 'Bruce Springsteen', 'Long Branch, NJ', 'VISA ⠀•••• 5919', 212.79),
	createData(0, '16 Mar, 2019', 'Elvis Presley', 'Tupelo, MS', 'VISA ⠀•••• 3719', 312.44),
	createData(1, '16 Mar, 2019', 'Paul McCartney', 'London, UK', 'VISA ⠀•••• 2574', 866.99),
	createData(2, '16 Mar, 2019', 'Tom Scholz', 'Boston, MA', 'MC ⠀•••• 1253', 100.81),
	createData(3, '16 Mar, 2019', 'Michael Jackson', 'Gary, IN', 'AMEX ⠀•••• 2000', 654.39),
	createData(4, '15 Mar, 2019', 'Bruce Springsteen', 'Long Branch, NJ', 'VISA ⠀•••• 5919', 212.79),
	createData(0, '16 Mar, 2019', 'Elvis Presley', 'Tupelo, MS', 'VISA ⠀•••• 3719', 312.44),
	createData(1, '16 Mar, 2019', 'Paul McCartney', 'London, UK', 'VISA ⠀•••• 2574', 866.99),
	createData(2, '16 Mar, 2019', 'Tom Scholz', 'Boston, MA', 'MC ⠀•••• 1253', 100.81),
	createData(3, '16 Mar, 2019', 'Michael Jackson', 'Gary, IN', 'AMEX ⠀•••• 2000', 654.39),
	createData(4, '15 Mar, 2019', 'Bruce Springsteen', 'Long Branch, NJ', 'VISA ⠀•••• 5919', 212.79),
	createData(0, '16 Mar, 2019', 'Elvis Presley', 'Tupelo, MS', 'VISA ⠀•••• 3719', 312.44),
	createData(1, '16 Mar, 2019', 'Paul McCartney', 'London, UK', 'VISA ⠀•••• 2574', 866.99),
	createData(2, '16 Mar, 2019', 'Tom Scholz', 'Boston, MA', 'MC ⠀•••• 1253', 100.81),
	createData(3, '16 Mar, 2019', 'Michael Jackson', 'Gary, IN', 'AMEX ⠀•••• 2000', 654.39),
	createData(4, '15 Mar, 2019', 'Bruce Springsteen', 'Long Branch, NJ', 'VISA ⠀•••• 5919', 12121.79)
];

export class TransactionHistory extends Component {
	render() {
		return (
			<Grid container spacing={3}>
				<Grid item xs={12}>
					<Row>
						<Col xs='12'>
							<Card>
								<CardBody>
									<Row>
										<Col sm='5'>
											<CardTitle>Electricity Consumption</CardTitle>
											<div className='small text-muted'>March 2020</div>
										</Col>
										<Col sm='7' className='d-none d-sm-inline-block'>
											<Button color='primary' className='float-right'>
												<i className='icon-cloud-download' />
											</Button>
											<ButtonToolbar
												className='float-right'
												aria-label='Toolbar with button groups'>
												<ButtonGroup className='mr-3' aria-label='First group'>
													<Button color='outline-secondary'>Day</Button>
													<Button color='outline-secondary'>Month</Button>
													<Button color='outline-secondary'>Year</Button>
												</ButtonGroup>
											</ButtonToolbar>
										</Col>
									</Row>
									<div className='chart-wrapper'>
										<React.Fragment>
											<Table size='small'>
												<TableHead>
													<TableRow>
														<TableCell>Date</TableCell>
														<TableCell>Name</TableCell>
														<TableCell>Ship To</TableCell>
														<TableCell>Payment Method</TableCell>
														<TableCell align='right'>Sale Amount</TableCell>
													</TableRow>
												</TableHead>
												<TableBody>
													{rows.map((row) => (
														<TableRow key={row.id}>
															<TableCell>{row.date}</TableCell>
															<TableCell>{row.name}</TableCell>
															<TableCell>{row.shipTo}</TableCell>
															<TableCell>{row.paymentMethod}</TableCell>
															<TableCell align='right'>{row.amount}</TableCell>
														</TableRow>
													))}
												</TableBody>
											</Table>
										</React.Fragment>
									</div>
								</CardBody>
								<CardFooter />
							</Card>
						</Col>
					</Row>
				</Grid>
			</Grid>
		);
	}
}

export default TransactionHistory;
