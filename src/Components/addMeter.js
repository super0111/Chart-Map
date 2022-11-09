import React, { useState, useEffect } from 'react';

import Form from './Form';
import MeterGrid from './MeterGrid';

export default function addMeter() {
	const [ state, setState ] = useState({
		meterData: []
	})

	useEffect(()=>{
		var meterRequest = {
			key: 'StartGRID2020',
			SQLQuery: 'SELECT * FROM LoadData '
		};

		const fetchData = async () => {
			const request = new Request('https://cors-anywhere.herokuapp.com/https://stargridx.net/getMeters.php', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(meterRequest)
			});

			const api_call = await fetch(request);
			const data = await api_call.json();
			setState({ meterData: data.Server_respone });
		};
		fetchData();
	}, [])

	const getMeterBylocation = async (e) => {
		const recipeName = e.target.elements.meterName.value;
	};
	return (
		<div>
			<Form getMeterBylocation={getMeterBylocation} />
			<MeterGrid meters={state.meterData} />
		</div>
	);
}