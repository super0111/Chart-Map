import React from 'react';
import ReactEcharts from 'echarts-for-react';
import { Grid } from '@mui/material';
import '../home.css';
import TreeStructure from './TreeStructure';

const treeData = [
	{
		key: '0-0',
		title: 'Power Station: Windhoek West ',
		children: [
			{
				key: '0-0-0',
				title: 'Transformer: Robert Mugabe Avenue ',
				children: [
					{ key: '0-0-0-0', title: 'Meter Number:2020GAJQFE5WFU7k' },
					{ key: '0-0-2-1', title: 'Meter Number: 2020CBF4Z4P8Y97k' },
					{ key: '0-0-2-2', title: 'Meter Number: 2020WGRDIV1TFC7k' },
					{ key: '0-0-2-3', title: 'Meter Number: 2020KOLU56LMS97k' },
					{ key: '0-0-2-4', title: 'Meter Number: 202027G0DZGSAS7k' }
				]
			},

			{
				key: '0-0-1',
				title: 'Transformer: Frankie Fredericks Drive',
				children: [
					{ key: '0-0-1-0', title: 'Meter Number: 2020CE8P9UJG9N7k', disableCheckbox: true },
					{ key: '0-0-1-1', title: 'Meter Number: 2020CBF4Z4P8Y97k' },
					{ key: '0-0-1-2', title: 'Meter Number: 2020WGRDIV1TFC7k' },
					{ key: '0-0-1-3', title: 'Meter Number: 2020KOLU56LMS97k' },
					{ key: '0-0-1-4', title: 'Meter Number: 202027G0DZGSAS7k' },
					{ key: '0-0-1-5', title: 'Meter Number: 2020LWY0VCMH6U7k' },
					{ key: '0-0-1-6', title: 'Meter Number: 2020TZZY1HMRCL7k' },
					{ key: '0-0-1-7', title: 'Meter Number: 20206MI34R58E77k' },
					{ key: '0-0-1-8', title: 'Meter Number: 2020BOEHZHPKXV7k' },
					{ key: '0-0-1-9', title: 'Meter Number: 2020BQ71Z7JT8Z7k' }
				]
			},
			{
				key: '0-0-2',
				title: 'Transformer: Michelle Mclean Street',
				children: [
					{ key: '0-0-2-0', title: 'Meter Number: 2020CE8P9UJG9N7k', disableCheckbox: true },
					{ key: '0-0-2-1', title: 'Meter Number: 2020CBF4Z4P8Y97k' },
					{ key: '0-0-2-2', title: 'Meter Number: 2020WGRDIV1TFC7k' },
					{ key: '0-0-2-3', title: 'Meter Number: 2020KOLU56LMS97k' },
					{ key: '0-0-2-4', title: 'Meter Number: 202027G0DZGSAS7k' },
					{ key: '0-0-2-5', title: 'Meter Number: 2020LWY0VCMH6U7k' },
					{ key: '0-0-2-6', title: 'Meter Number: 2020TZZY1HMRCL7k' },
					{ key: '0-0-2-7', title: 'Meter Number: 20206MI34R58E77k' },
					{ key: '0-0-2-8', title: 'Meter Number: 2020BOEHZHPKXV7k' },
					{ key: '0-0-2-9', title: 'Meter Number: 2020BQ71Z7JT8Z7k' }
				]
			}
		]
	},
	{
		key: '0-1',
		title: 'Power Station: Southern Industry  ',
		children: [
			{
				key: '0-1-0',
				title: 'Transformer: Robert Mugabe Avenue ',
				children: [
					{ key: '0-1-0-0', title: 'Meter Number:2020GAJQFE5WFU7k' },
					{ key: '0-1-2-1', title: 'Meter Number: 2020CBF4Z4P8Y97k' },
					{ key: '0-1-2-2', title: 'Meter Number: 2020WGRDIV1TFC7k' },
					{ key: '0-1-2-3', title: 'Meter Number: 2020KOLU56LMS97k' },
					{ key: '0-1-2-4', title: 'Meter Number: 202027G0DZGSAS7k' }
				]
			},

			{
				key: '0-1-2',
				title: 'Transformer: Frankie Fredericks Drive',
				children: [
					{ key: '0-1-2-0', title: 'Meter Number: 2020CE8P9UJG9N7k', disableCheckbox: true },
					{ key: '0-1-2-1', title: 'Meter Number: 2020CBF4Z4P8Y97k' },
					{ key: '0-1-2-2', title: 'Meter Number: 2020WGRDIV1TFC7k' },
					{ key: '0-1-2-3', title: 'Meter Number: 2020KOLU56LMS97k' },
					{ key: '0-1-2-4', title: 'Meter Number: 202027G0DZGSAS7k' },
					{ key: '0-1-2-5', title: 'Meter Number: 2020LWY0VCMH6U7k' },
					{ key: '0-1-2-6', title: 'Meter Number: 2020TZZY1HMRCL7k' },
					{ key: '0-1-2-7', title: 'Meter Number: 20206MI34R58E77k' },
					{ key: '0-1-2-8', title: 'Meter Number: 2020BOEHZHPKXV7k' },
					{ key: '0-1-2-9', title: 'Meter Number: 2020BQ71Z7JT8Z7k' }
				]
			},
			{
				key: '0-0-2',
				title: 'Transformer: Michelle Mclean Street',
				children: [
					{ key: '0-0-2-0', title: 'Meter Number: 2020CE8P9UJG9N7k', disableCheckbox: true },
					{ key: '0-0-2-1', title: 'Meter Number: 2020CBF4Z4P8Y97k' },
					{ key: '0-0-2-2', title: 'Meter Number: 2020WGRDIV1TFC7k' },
					{ key: '0-0-2-3', title: 'Meter Number: 2020KOLU56LMS97k' },
					{ key: '0-0-2-4', title: 'Meter Number: 202027G0DZGSAS7k' },
					{ key: '0-0-2-5', title: 'Meter Number: 2020LWY0VCMH6U7k' },
					{ key: '0-0-2-6', title: 'Meter Number: 2020TZZY1HMRCL7k' },
					{ key: '0-0-2-7', title: 'Meter Number: 20206MI34R58E77k' },
					{ key: '0-0-2-8', title: 'Meter Number: 2020BOEHZHPKXV7k' },
					{ key: '0-0-2-9', title: 'Meter Number: 2020BQ71Z7JT8Z7k' }
				]
			}
		]
	}
];

export const GridTopology = () => {
	const keyReplace = (obj, keyToReplace, valueToReplaceWith) => {
		let str = JSON.stringify(obj);
		str = str.replace(/"title"/g, '"name"');
		return JSON.parse(str);
	};

	return (
		<Grid container>	
			<Grid item lg={1} md={1} xl={2} xs={2}>
				<div className='container'>
					<ReactEcharts
						className='topology-echarts'
						option={{
							tooltip: {
								trigger: 'item',
								triggerOn: 'mousemove'
							},
							legend: {
								top: '2%',
								left: '3%',
								orient: 'vertical',
								data: [
									{
										name: 'sample tree',
										icon: 'circle'
									}
								],
								borderColor: '#c23531'
							},
							series: [
								{
									type: 'tree',

									name: 'sampler tree',

									data: keyReplace(treeData, 'title', 'name'),

									top: '5%',
									left: '10%',
									bottom: '2%',
									right: '60%',

									symbolSize: 7,

									label: {
										position: 'left',
										verticalAlign: 'middle',
										align: 'right'
									},

									leaves: {
										label: {
											position: 'right',
											verticalAlign: 'middle',
											align: 'left'
										}
									},

									expandAndCollapse: true,

									animationDuration: 550,
									animationDurationUpdate: 750
								}
							]
						}}
						notMerge={true}
						lazyUpdate={true}
						theme={'theme_name'}
						opts={{}}
					/>
				</div>
			</Grid>
		</Grid>
	);
};

export default GridTopology;
