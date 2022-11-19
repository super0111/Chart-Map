import React from 'react';
import { Bar, Doughnut, Line, Pie, Polar, Radar } from 'react-chartjs-2';

import {
	Button,
	ButtonGroup,
	ButtonToolbar,
	Card,
	CardBody,
	CardTitle,
	Col,
	Row,
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
export default function Livechart() {
	return (
		<Row>
			<Col>
				<Card>
					<CardBody>
						<Row>
							<Col sm='5'>
								<CardTitle style={{fontSize: 20}} className='mb-0'>Meter Power Consuption</CardTitle>
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
				</Card>
			</Col>
		</Row>
	);
}
