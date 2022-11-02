import React, { Component } from 'react';

import Form from './Form';
import MeterGrid from './MeterGrid';

export class addMeter extends Component {
	state = {
		meterData: []
	};

	componentDidMount = async () => {
		var meterRequest = {
			key: 'StartGRID2020',
			SQLQuery: 'SELECT * FROM LoadData '
		};
		//console.log(JSON.stringify(meterRequest));
		const request = new Request('https://cors-anywhere.herokuapp.com/https://stargridx.net/getMeters.php', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(meterRequest)
		});

		const api_call = await fetch(request);
		const data = await api_call.json();
		this.setState({ meterData: data.Server_respone });
		console.log(JSON.stringify(data));
	};

	getMeterBylocation = async (e) => {
		const recipeName = e.target.elements.meterName.value;
	};
	render() {
		return (
			<div>
				<Form getMeterBylocation={this.getMeterBylocation.bind(this)} />
				<MeterGrid meters={this.state.meterData} />
			</div>
		);
	}
}

export default addMeter;
