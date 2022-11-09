import React, { useState, useEffect } from 'react';
import { GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow, Polyline } from 'react-google-maps';
import GridTopology from '../GridTopology/gridTopology';

const useFetch = (url) => {
	const [ meterData, setMeterdata ] = useState(null);
	console.log('data.Server_response');
	useEffect(() => {
		async function fetchData() {
			var resquestType = {
				key: 'StartGRID2020',
				SQLQuery: `SELECT * FROM  MeterLocation`
			};
			const request = new Request(
				'https://cors-anywhere.herokuapp.com/https://gridxmeters.com/MeterGeolocation.php',
				{
					method: 'POST',
					headers: { 'Content-type': 'application/json' },
					body: JSON.stringify(resquestType)
				}
			);
			const api_call = await fetch(request);
			const data = await api_call.json();
			setMeterdata(data.Server_response);

			console.log(data.Server_response);
		}
		fetchData();
	}, []);

	return { meterData };
};

function Map() {
	const [ selectedMeter, setSelectedMeter ] = useState(null);
	const url = 'https://cors-anywhere.herokuapp.com/https://gridxmeters.com/MeterGeolocation.php';
	const { meterData } = useFetch(url);

	return (
		<GoogleMap
			defaultZoom={17}
			defaultCenter={{ lat: -22.560282, lng: 17.069457 }}
			defaultOptions={{
				scrollwheel: false,
				zoomControl: true,
				styles: [
					{
						featureType: 'water',
						stylers: [ { saturation: 43 }, { lightness: -11 }, { hue: '#0088ff' } ]
					},
					{
						featureType: 'road',
						elementType: 'geometry.fill',
						stylers: [ { hue: '#ff0000' }, { saturation: -100 }, { lightness: 99 } ]
					},
					{
						featureType: 'road',
						elementType: 'geometry.stroke',
						stylers: [ { color: '#808080' }, { lightness: 54 } ]
					},
					{
						featureType: 'landscape.man_made',
						elementType: 'geometry.fill',
						stylers: [ { color: '#ece2d9' } ]
					},
					{
						featureType: 'poi.park',
						elementType: 'geometry.fill',
						stylers: [ { color: '#ccdca1' } ]
					},
					{
						featureType: 'road',
						elementType: 'labels.text.fill',
						stylers: [ { color: '#767676' } ]
					},
					{
						featureType: 'road',
						elementType: 'labels.text.stroke',
						stylers: [ { color: '#ffffff' } ]
					},
					{ featureType: 'poi', stylers: [ { visibility: 'off' } ] },
					{
						featureType: 'landscape.natural',
						elementType: 'geometry.fill',
						stylers: [ { visibility: 'on' }, { color: '#b8cb93' } ]
					},
					{ featureType: 'poi.park', stylers: [ { visibility: 'on' } ] },
					{
						featureType: 'poi.sports_complex',
						stylers: [ { visibility: 'on' } ]
					},
					{ featureType: 'poi.medical', stylers: [ { visibility: 'on' } ] },
					{
						featureType: 'poi.business',
						stylers: [ { visibility: 'simplified' } ]
					}
				]
			}}>
			{meterData != null &&
				meterData.map((meter) => (
					<div>
						<Polyline
							path={[
								{ lat: parseFloat(meter.Longitude), lng: parseFloat(meter.Lat) },
								{ lat: parseFloat(meter.pLat), lng: parseFloat(meter.pLng) }
							]}
							geodesic={true}
							options={{
								strokeColor: '#ff2527',
								strokeOpacity: 0.75,
								strokeWeight: 2
							}}
						/>
						<Marker
							key={meter.lng}
							position={{ lat: parseFloat(meter.Longitude), lng: parseFloat(meter.Lat) }}
							onClick={() => {
								setSelectedMeter(meter);
							}}
							icon={{
								url: require('./map_icon_red.png'),
								scaledSize: new window.google.maps.Size(35, 35)
							}}
						/>
					</div>
				))}
			{selectedMeter && (
				<InfoWindow position={{ lat: parseFloat(selectedMeter.Longitude), lng: parseFloat(selectedMeter.Lat) }}>
					<GridTopology />
				</InfoWindow>
			)}
		</GoogleMap>
	);
}

const WrappedMap = withScriptjs(withGoogleMap(Map));
export default function HomeMaps() {
	return (
		<div>
			<WrappedMap
				googleMapURL={
					'https://maps.googleapis.com/maps/api/js?key=AIzaSyAX7CGyLu3H3AfDxa6-YOhGInraceFUiow&callback=initMap'
				}
				loadingElement={<div style={{ height: `100%` }} />}
				containerElement={<div style={{ height: `100vh` }} />}
				mapElement={<div style={{ height: `100%` }} />}
			/>
		</div>
	);
}