import React, { Component } from 'react';
import { GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow } from 'react-google-maps';

export default class GeolocationData extends Component {
	state = {
		meterData: []
	};
	componentDidMount = async () => {
		var resquestType = {
			key: 'StartGRID2020',
			SQLQuery: `SELECT * FROM  MeterLocation`
		};
		const request = new Request(`https://cors-anywhere.herokuapp.com/https://stargridx.net/MeterGeolocation.php`, {
			method: 'POST',
			headers: { 'Content-type': 'application/json' },
			body: JSON.stringify(resquestType)
		});
		const api_call = await fetch(request);
		const data = await api_call.json();

		this.setState({ meterData: data.Server_response });
	};

	render() {
		return (
			<div>
				{this.state.meterData.map((park) => (
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
}
