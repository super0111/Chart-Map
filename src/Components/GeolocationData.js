import React, { useState, useEffect } from 'react';
import { GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow } from 'react-google-maps';

export default function GeolocationData() {
	const [ state, setState ] = useState({
		meterData: []
	})

	useEffect(()=>{
		var resquestType = {
				key: 'StartGRID2020',
				SQLQuery: `SELECT * FROM  MeterLocation`
			};
		const fetchData = async () => {

			const request = new Request(`https://cors-anywhere.herokuapp.com/https://stargridx.net/MeterGeolocation.php`, {
				method: 'POST',
				headers: { 'Content-type': 'application/json' },
				body: JSON.stringify(resquestType)
			});
			const api_call = await fetch(request);
			const data = await api_call.json();
	
			setState({ meterData: data.Server_response });
		};
		fetchData();
	}, [])

	return (
		<div>
			{state.meterData.map((park) => (
				<div>
					<Marker
						keys={park.lng}
						position={{ lat: parseFloat(park.Longitude), lng: parseFloat(park.Lat) }}
						onClick={() => {}}
						icon={{
							url: './Capture_burned.svg',
							scaledSize: new window.google.maps.Size(45, 45)
						}}
					/>
				</div>
			))}
		</div>
	);
}
