import React, { Component } from 'react';
import Dashboard from './Dashboard';

export class MeterProps extends Component {
	componentDidMount = () => {};

	state = {
		activityMeter: []
	};
	render() {
		return <Dashboard />;
	}
}

export default MeterProps;
