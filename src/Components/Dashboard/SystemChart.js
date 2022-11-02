import React, { Component } from 'react';
import { Bar, Doughnut, Line, Pie, Polar, Radar } from 'react-chartjs-2';

import {
	Badge,
	Button,
	ButtonDropdown,
	ButtonGroup,
	ButtonToolbar,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	CardTitle,
	Col,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
	Progress,
	Row,
	Table
} from 'reactstrap';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';

const brandPrimary = getStyle('--primary');
const brandSuccess = getStyle('--success');
const brandInfo = getStyle('--info');
const brandWarning = getStyle('--warning');
const brandDanger = getStyle('--danger');
// Main Chart

//Random Numbers
function random(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

var elements = 27;
var data1 = [];
var data2 = [];
var data3 = [];

for (var i = 0; i <= elements; i++) {
	data1.push(random(50, 200));
	data2.push(random(80, 100));
	data3.push(65);
}

const mainChart = {
	labels: [
		'Mo',
		'Tu',
		'We',
		'Th',
		'Fr',
		'Sa',
		'Su',
		'Mo',
		'Tu',
		'We',
		'Th',
		'Fr',
		'Sa',
		'Su',
		'Mo',
		'Tu',
		'We',
		'Th',
		'Fr',
		'Sa',
		'Su',
		'Mo',
		'Tu',
		'We',
		'Th',
		'Fr',
		'Sa',
		'Su'
	],
	datasets: [
		{
			label: 'My First dataset',
			backgroundColor: hexToRgba(brandInfo, 10),
			borderColor: brandInfo,
			pointHoverBackgroundColor: '#fff',
			borderWidth: 2,
			data: data1
		},
		{
			label: 'My Second dataset',
			backgroundColor: 'transparent',
			borderColor: brandSuccess,
			pointHoverBackgroundColor: '#fff',
			borderWidth: 2,
			data: data2
		},
		{
			label: 'My Third dataset',
			backgroundColor: 'transparent',
			borderColor: brandDanger,
			pointHoverBackgroundColor: '#fff',
			borderWidth: 1,
			borderDash: [ 8, 5 ],
			data: data3
		}
	]
};

const mainChartOpts = {
	tooltips: {
		enabled: false,
		custom: CustomTooltips,
		intersect: true,
		mode: 'index',
		position: 'nearest',
		callbacks: {
			labelColor: function(tooltipItem, chart) {
				return { backgroundColor: chart.data.datasets[tooltipItem.datasetIndex].borderColor };
			}
		}
	},
	maintainAspectRatio: false,
	legend: {
		display: false
	},
	scales: {
		xAxes: [
			{
				gridLines: {
					drawOnChartArea: false
				}
			}
		],
		yAxes: [
			{
				ticks: {
					beginAtZero: true,
					maxTicksLimit: 5,
					stepSize: Math.ceil(250 / 5),
					max: 250
				}
			}
		]
	},
	elements: {
		point: {
			radius: 0,
			hitRadius: 10,
			hoverRadius: 4,
			hoverBorderWidth: 3
		}
	}
};
export class SystemChart extends Component {
	render() {
		return (
			<div>
				<Row>
					<Col>
						<Card>
							<CardBody>
								<Row>
									<Col sm='5'>
										<CardTitle className='mb-0'>Total System Load </CardTitle>
										<div className='small text-muted'>May 2020</div>
									</Col>
									<Col sm='7' className='d-none d-sm-inline-block'>
										<Button color='primary' className='float-right'>
											<i className='icon-cloud-download' />
										</Button>
										<ButtonToolbar className='float-right' aria-label='Toolbar with button groups'>
											<ButtonGroup className='mr-3' aria-label='First group'>
												<Button color='outline-secondary'>Day</Button>
												<Button color='outline-secondary'>Month</Button>
												<Button color='outline-secondary'>Year</Button>
											</ButtonGroup>
										</ButtonToolbar>
									</Col>
								</Row>
								<div className='chart-wrapper' style={{ height: 300 + 'px', marginTop: 40 + 'px' }}>
									<Line data={mainChart} options={mainChartOpts} height={300} />
								</div>
							</CardBody>
							<CardFooter>
								<Row className='text-center'>
									<Col sm={12} md className='mb-sm-2 mb-0'>
										<div className='text-muted'> Maximum</div>
										<strong>29.703 KWH</strong>
										<Progress className='progress-xs mt-2' color='success' value='40' />
									</Col>
									<Col sm={12} md className='mb-sm-2 mb-0 d-md-down-none'>
										<div className='text-muted'>Minimum</div>
										<strong>24.093 KWH</strong>
										<Progress className='progress-xs mt-2' color='info' value='20' />
									</Col>
									<Col sm={12} md className='mb-sm-2 mb-0'>
										<div className='text-muted'>Average</div>
										<strong>78.706 KWH</strong>
										<Progress className='progress-xs mt-2' color='warning' value='60' />
									</Col>

									<Col sm={12} md className='mb-sm-2 mb-0 d-md-down-none'>
										<div className='text-muted'>Current</div>
										<strong>65.132 KWH</strong>
										<Progress className='progress-xs mt-2' color='primary' value='40' />
									</Col>
								</Row>
							</CardFooter>
						</Card>
					</Col>
				</Row>
			</div>
		);
	}
}

export default SystemChart;
