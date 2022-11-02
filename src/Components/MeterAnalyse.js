import React, { Component } from 'react';
import MeterGrid from './MeterGrid';

export class MeterAnalyse extends Component {
	state = {
		meterData: this.props.location.state.meters
	};

	render() {
		return (
			<div>
				<MeterGrid meters={this.state.meterData} />
			</div>
		);
	}
}

export default MeterAnalyse;
