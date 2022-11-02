import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Progress, Row, Table } from 'reactstrap';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { DataTable, TableHeader } from 'react-mdl';

import Orders from './Orders';

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
	return { id, date, name, shipTo, paymentMethod, amount };
}

const rows = [
	createData(0, '16 Mar, 2019', 'Elvis Presley', 'Tupelo, MS', 'VISA ⠀•••• 3719', 312.44),
	createData(1, '16 Mar, 2019', 'Paul McCartney', 'London, UK', 'VISA ⠀•••• 2574', 866.99),
	createData(2, '16 Mar, 2019', 'Tom Scholz', 'Boston, MA', 'MC ⠀•••• 1253', 100.81),
	createData(3, '16 Mar, 2019', 'Michael Jackson', 'Gary, IN', 'AMEX ⠀•••• 2000', 654.39),
	createData(4, '15 Mar, 2019', 'Bruce Springsteen', 'Long Branch, NJ', 'VISA ⠀•••• 5919', 212.79)
];

function preventDefault(event) {
	event.preventDefault();
}

// sparkline charts
const sparkLineChartData = [
	{
		data: [ 35, 23, 56, 22, 97, 23, 64 ],
		label: 'New Clients'
	},
	{
		data: [ 65, 59, 84, 84, 51, 55, 40 ],
		label: 'Recurring Clients'
	},
	{
		data: [ 35, 23, 56, 22, 97, 23, 64 ],
		label: 'Pageviews'
	},
	{
		data: [ 65, 59, 84, 84, 51, 55, 40 ],
		label: 'Organic'
	},
	{
		data: [ 78, 81, 80, 45, 34, 12, 40 ],
		label: 'CTR'
	},
	{
		data: [ 1, 13, 9, 17, 34, 41, 38 ],
		label: 'Bounce Rate'
	}
];
const makeSparkLineData = (dataSetNo, variant) => {
	const dataset = sparkLineChartData[dataSetNo];
	const data = {
		labels: [ 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday' ],
		datasets: [
			{
				backgroundColor: 'transparent',
				borderColor: variant ? variant : '#c2cfd6',
				data: dataset.data,
				label: dataset.label
			}
		]
	};
	return () => data;
};

const sparklineChartOpts = {
	tooltips: {
		enabled: false,
		custom: CustomTooltips
	},
	responsive: true,
	maintainAspectRatio: true,
	scales: {
		xAxes: [
			{
				display: false
			}
		],
		yAxes: [
			{
				display: false
			}
		]
	},
	elements: {
		line: {
			borderWidth: 2
		},
		point: {
			radius: 0,
			hitRadius: 10,
			hoverRadius: 4,
			hoverBorderWidth: 3
		}
	},
	legend: {
		display: false
	}
};
export class WeeklyChart extends Component {
	render() {
		return (
			<div>
				<Row>
					<Col>
						<Card>
							<CardHeader>Sytem Summary</CardHeader>
							<CardBody>
								<Row>
									<Col xs='12' md='6' xl='6'>
										<hr className='mt-0' />
										<div className='progress-group mb-4'>
											<div className='progress-group-prepend'>
												<span className='progress-group-text'>Monday</span>
											</div>
											<div className='progress-group-bars'>
												<Progress className='progress-xs' color='info' value='34' />
												<Progress className='progress-xs' color='danger' value='78' />
											</div>
										</div>
										<div className='progress-group mb-4'>
											<div className='progress-group-prepend'>
												<span className='progress-group-text'>Tuesday</span>
											</div>
											<div className='progress-group-bars'>
												<Progress className='progress-xs' color='info' value='56' />
												<Progress className='progress-xs' color='danger' value='94' />
											</div>
										</div>
										<div className='progress-group mb-4'>
											<div className='progress-group-prepend'>
												<span className='progress-group-text'>Wednesday</span>
											</div>
											<div className='progress-group-bars'>
												<Progress className='progress-xs' color='info' value='12' />
												<Progress className='progress-xs' color='danger' value='67' />
											</div>
										</div>
										<div className='progress-group mb-4'>
											<div className='progress-group-prepend'>
												<span className='progress-group-text'>Thursday</span>
											</div>
											<div className='progress-group-bars'>
												<Progress className='progress-xs' color='info' value='43' />
												<Progress className='progress-xs' color='danger' value='91' />
											</div>
										</div>
										<div className='progress-group mb-4'>
											<div className='progress-group-prepend'>
												<span className='progress-group-text'>Friday</span>
											</div>
											<div className='progress-group-bars'>
												<Progress className='progress-xs' color='info' value='22' />
												<Progress className='progress-xs' color='danger' value='73' />
											</div>
										</div>
										<div className='progress-group mb-4'>
											<div className='progress-group-prepend'>
												<span className='progress-group-text'>Saturday</span>
											</div>
											<div className='progress-group-bars'>
												<Progress className='progress-xs' color='info' value='53' />
												<Progress className='progress-xs' color='danger' value='82' />
											</div>
										</div>
										<div className='progress-group mb-4'>
											<div className='progress-group-prepend'>
												<span className='progress-group-text'>Sunday</span>
											</div>
											<div className='progress-group-bars'>
												<Progress className='progress-xs' color='info' value='9' />
												<Progress className='progress-xs' color='danger' value='69' />
											</div>
										</div>
										<div className='legend text-center'>
											<small>
												<sup className='px-1'>
													<Badge pill color='info'>
														&nbsp;
													</Badge>
												</sup>
												This Week &nbsp;
												<sup className='px-1'>
													<Badge pill color='danger'>
														&nbsp;
													</Badge>
												</sup>
												Last Week
											</small>
										</div>
									</Col>
									<Col>
										<Orders />
									</Col>
								</Row>
								<br />
							</CardBody>
						</Card>
					</Col>
				</Row>
			</div>
		);
	}
}

export default WeeklyChart;
