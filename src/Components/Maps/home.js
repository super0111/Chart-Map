import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import { GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow, Polyline } from 'react-google-maps';
import isInside from 'point-in-polygon';
import MaterialTable from 'material-table';

// import MuiDrawer from '@mui/material/Drawer';
import Drawer from '@mui/material/Drawer';

import { Switch, Box } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { ThemeProvider, createTheme } from '@mui/material';
import MapCard from './MapCard';
import './home.css';

const { MarkerClusterer} = require('react-google-maps/lib/components/addons/MarkerClusterer');
const { DrawingManager } = require("react-google-maps/lib/components/drawing/DrawingManager");

var polylines=[];
var totalConsumption=0;
var totalAlarm=0;

const extend = (base, ...objs) => {
	objs.forEach(obj => {
		Object.keys(obj).forEach(key => {
		base[key] = obj[key];
		})
	});
	return base;
}

const useFetch = (url) => {
	const [ meterData, setMeterData ] = useState(null);
	useEffect(() => {
		async function fetchData() {
			var resquestType = {
				key: 'StartGRID2020',
				SQLQuery: `SELECT * FROM  MeterLocation`
			};
			const request = new Request(`http://gridx-meter-server-node-dev.us-east-1.elasticbeanstalk.com/meterLocation/getAll`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZXRlckRSTiI6IjAwMDAwMzk5NjczNTEiLCJpYXQiOjE2NjMyOTE2NTl9.Q-5Sf02eatwT8UEHajmIBcdAuu1PmKsWrXQNU_oVGDI'
				}
			});
			const api_call = await fetch(request);
			const data = await api_call.json();
			
			const request1 = new Request('http://gridx-meter-server-node-dev.us-east-1.elasticbeanstalk.com/meterNotification/getAll', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZXRlckRSTiI6IjAwMDAwMzk5NjczNTEiLCJpYXQiOjE2NjMyOTE2NTl9.Q-5Sf02eatwT8UEHajmIBcdAuu1PmKsWrXQNU_oVGDI'
				}
			});
			const api_call1 = await fetch(request1);
			const data1 = await api_call1.json();
			let data2 = Array();
			for (let i = 0 ; i < data.length ; i++){
				let res = Array();
				let tmp1 = data[i];
				tmp1 = { ...tmp1, TotalPower:125, Alarms:120}
				let j;
				for (j = 0 ; j < data1.length ; j ++){
					let tmp2 = data1[j];
					if(tmp1.MeterNumber == tmp2.MeterNumber){
						res = extend({}, tmp1, tmp2);
						data2.push(res);
						break;
					}
				}
				if(j == data1.length) data2.push(tmp1);
			}
			setMeterData(data2);
		}
		fetchData();
	}, []);

	return { meterData };
};

const getMeterByNumber = (number, meterData) => {
	let selectedMeter;
	meterData.map((meter) => {
		if(meter.MeterNumber === number){
			selectedMeter = meter;
		}
	});
	return selectedMeter;
}

function Map(props) {
	const defaultMaterialTheme = createTheme()
	const url = 'https://cors-anywhere.herokuapp.com/https://gridxmeters.com/MeterInfo2.php';
	const { meterData } = useFetch(url);
	const [ selectedMeter, setSelectedMeter ] = useState(null);
	const [ selectedMeterData, setSelectedMeterData ] = useState(null);
	const [ selectedMeterData1, setSelectedMeterData1 ] = useState(null);
	const [ cpolyline, setCPolyLine ] = useState(null);
	const [ crectangle, setCRectangle ] = useState(null);
	const [ drawingMode, setDrawingMode ] = useState(false);
	const [ clusteringSwitch, setClusteringSwitch] = useState(false);
	const [ loadFlag, setLoadFlag ] = useState(true);
	const [open, setOpen] = useState(true);
	const [selectedNotification, setSelectedNotification] = useState('');

	if(loadFlag &&  meterData != null){
		let meter = getMeterByNumber(props.selectedMeterNumber, meterData);
		setSelectedMeter(meter);
		setLoadFlag(false);
	}

	for(let i in polylines){
		polylines[i].setMap(null);
	}

	const onClusteringEnd = (markerClusterer) => {
		for(let i in polylines){
			polylines[i].setMap(null);
		}
		polylines = [];
		if(meterData === null) return;
		const markers = markerClusterer.getMarkers();
		for(let i in markers){
			if(markers[i].map !== null){
				const map = markers[i].map;
				for(let j in meterData){
					if(meterData[j].Longitude == markers[i].getPosition().lat() && meterData[j].Lat == markers[i].getPosition().lng()){
						if(meterData[j].pLat !== ""){
							const polylineForMarker = new window.google.maps.Polyline({
								map: map,
								key: meterData[j].ID,
								path: [
									{ lat: parseFloat(meterData[j].Longitude), lng: parseFloat(meterData[j].Lat) },
									{ lat: parseFloat(meterData[j].pLat), lng: parseFloat(meterData[j].pLng) }
								],
								geodesic: true,
								options: {
									strokeColor: '#ff2527',
									strokeOpacity: 0.75,
									strokeWeight: 2
								}
							});
							polylines.push(polylineForMarker);
						}
					}
				}
			}
		}
	}

	const onPolygonComplete = (polyline) => {
		if(cpolyline){
			cpolyline.setMap(null);
		}
		let resizablePolygon = polyline.getPath();
		window.google.maps.event.addListener(polyline, 'click',  (e) =>{
			polyline.setMap(null);
			resizablePolygon=[];
			setSelectedMeterData(null);
			setSelectedMeterData1(null);
		});
		const filterMarkers =()=>{
			let polygon=[];
			const selected = [];

			resizablePolygon.forEach(coord=>{
			  	polygon.push([coord.lng(), coord.lat()]);
			});
			meterData.forEach(meter=>{
				const x = meter.Lat;
				const y = meter.Longitude;
				if (isInside([x, y], polygon)) {
					selected.push(meter);
				}
			});
			totalConsumption = 125 * selected.length;
			totalAlarm = 120 * selected.length;
			setSelectedMeterData(selected);
			setSelectedMeterData1(selected);
			setOpen(true);
		}
		filterMarkers();
		setCPolyLine(polyline);
		setDrawingMode(false);
		//======================================================
		// Resize polygon
		//======================================================
		window.google.maps.event.addListener(resizablePolygon, 'set_at', function (edge) {
			resizablePolygon=polyline.getPath();
			filterMarkers();
		});
		window.google.maps.event.addListener(resizablePolygon, 'insert_at', function (edge) {
			resizablePolygon=polyline.getPath();
			filterMarkers();
		});
	}

	const onRectangleComplete = (rectangle) => {
		if(crectangle){
			crectangle.setMap(null);
		}
		window.google.maps.event.addListener(rectangle, 'click',  (e) =>{
			rectangle.setMap(null);
			setSelectedMeterData(null);
			setSelectedMeterData1(null);
		});
		const filterMarkers =()=>{
			const selected = [];

			meterData.forEach(meter=>{
				const latLng = new window.google.maps.LatLng(meter.Longitude, meter.Lat);
				if (rectangle.getBounds().contains(latLng)) {
					selected.push(meter);
				}
			});
			totalConsumption = 125 * selected.length;
			totalAlarm = 120 * selected.length;
			setSelectedMeterData(selected);
			setSelectedMeterData1(selected);
			setOpen(true);
		}
		filterMarkers();
		setCRectangle(rectangle);
		setDrawingMode(false);

	}

	const handleClusteringSwitch = () => {
		setClusteringSwitch(!clusteringSwitch);
	}

	const filterNotifications = (notification) => {
		if(!loadFlag && selectedMeterData1){
			let data = Array();
			for(let i = 0 ; i < selectedMeterData1.length ; i++){
				if(selectedMeterData1[i].AlarmType == notification) data.push(selectedMeterData1[i]);
			}
			setSelectedMeterData(data);
		} 
	}

	let flag = false;

	const toggleDown = (e) => {
		if(flag){
			document.getElementById('toggler').style.top="-20px";
			document.getElementById('toggler').style.transform="rotate(-90deg)";
			document.getElementById('toggler').style.padding="10px 25px 10px 0px";
			// document.getElementById('toggle-menu').style.display="none";
			document.getElementById('toggle-menu').style.top="-50px";
			flag = false;
		}
		else{
			document.getElementById('toggler').style.top="20px";
			document.getElementById('toggler').style.transform="rotate(90deg)";
			document.getElementById('toggler').style.padding="10px 0px 10px 25px";
			// document.getElementById('toggle-menu').style.display="block";
			document.getElementById('toggle-menu').style.top="15px";
			flag = true;
		}		
	}

	function init(){
		if (document.getElementsByClassName('gmnoprint').length == 7){
			let cln = document.getElementsByClassName('gmnoprint')[1];
			if(cln.classList=="gmnoprint"){
				cln.style.display = "none";
				cln.style.transform = "scale(1.5)";
				cln.style.display = "flex";
				cln.style.position = "inherit";
				cln.style.marginLeft = "20px";
				document.getElementById('drawing-tools').append(cln);
			}
			setTimeout(()=>{
				document.getElementById('bottom-table').style.left= document.getElementById('left-sidebar').childNodes[0].offsetWidth + 'px';
			}, 200);			
		}
	}
	init();

	const handleRowClick1 = (e, rowData) => {
		setSelectedMeter(rowData);
	}

	const handleRowClick2 = (e, rowData) => {
		setSelectedMeter(rowData);
	}

	return(
		<div>
			<Drawer
				anchor='right'
				variant='permanent'
				sx={{
					"& .MuiDrawer-paper": {
						position: 'relative',
						'::-webkit-scrollbar': {
							width: '1em'
						},
						padding: '8px 15px',
						borderLeft: 0,
						whiteSpace: 'nowrap',
						height: 'calc(100vh - 200px)',
					}
				}}
				open={open}
			>
				<ThemeProvider theme={defaultMaterialTheme}>
					<MaterialTable
						key={"weekly"}
						title='Meter Weekly Power Consumption'
						onRowClick={handleRowClick1}
						options={{
							// headerStyle: {minHeight: 32},
							headerStyle: {
								whiteSpace: "nowrap",
								height: "20px",
								maxHeight: "20px",
								padding: 0
						},
						rowStyle: {
								height: "20px",
								maxHeight: "20px",
								padding: 0
						},
							pageSize: 50,
							pageSizeOptions: [20, 50, 100],
						}}
						// onRowClick={handleRowClick}
						columns={[
							{ title: 'UserName', field: 'UserName', cellStyle: {padding: '3px 8px'}, headerStyle: {padding: '3px 8px'} },
							{ title: 'Meter Number', field: 'MeterNumber', cellStyle: {padding: '3px 8px'}, headerStyle: {padding: '3px 8px'}  },
							{ title: 'Total Power', field: 'TotalPower', cellStyle: {padding: '3px 8px'}, headerStyle: {padding: '3px 8px'}  },
							{ title: 'Alarms', field: 'Alarms', cellStyle: {padding: '3px 8px'}, headerStyle: {padding: '3px 8px'}  }
						]}
						data={(selectedMeterData? selectedMeterData : (meterData?meterData:[]))}
					/>
				</ThemeProvider>
			</Drawer>
			{ selectedMeterData && selectedMeterData.length > 0 && (
				<GoogleMap
					key={"myGoogleMap"}
					defaultZoom={15}
					defaultCenter={{ lat: -22.560282, lng: 17.069457 }}
					defaultOptions={{
						scrollwheel: true,
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
					<DrawingManager
						key={"myDrawingManager"}
						defaultDrawingMode={drawingMode ? window.google.maps.drawing.OverlayType.POLYGON : null}
						onPolygonComplete={onPolygonComplete}
						onRectangleComplete={onRectangleComplete}
						defaultOptions={{
							drawingControl: true,
							drawingControlOptions: {
								position: null,
								drawingModes: [
									window.google.maps.drawing.OverlayType.RECTANGLE,
									window.google.maps.drawing.OverlayType.POLYGON,
								],
							},
							polygonOptions: {
								fillColor: `#232323`,
								fillOpacity: 0.6,
								strokeWeight: 5,
								clickable: true,
								editable: true,
								zIndex: 1,
							},
						}}
					/>
					{clusteringSwitch && (
						<MarkerClusterer
							onClusteringEnd={onClusteringEnd}
							averageCenter
							enableRetinaIcons
							gridSize={68}
							maxZoom={18}
						>
						{selectedMeterData &&
							selectedMeterData.map((meter) => {
								if (parseInt(meter.Status) === 1) {
									return (
										<Marker
											key={"m_"+meter.ID}
											position={{ lat: parseFloat(meter.Longitude), lng: parseFloat(meter.Lat) }}
											onClick={() => {
												setSelectedMeter(meter);
											}}
											icon={{
												url: require('./map_icon_green.png'),
												scaledSize: new window.google.maps.Size(20, 20)
											}}
										/>
									);
								} else {
									return (
										<Marker
											key={"m_"+meter.ID}
											position={{ lat: parseFloat(meter.Longitude), lng: parseFloat(meter.Lat) }}
											onClick={() => {
												setSelectedMeter(meter);
											}}
											icon={{
												url: require('./map_icon_red.png'),
												scaledSize: new window.google.maps.Size(20, 20)
											}}
										/>
									);
								}
							})}
						</MarkerClusterer>
					)}
					{!clusteringSwitch && selectedMeterData && 
						selectedMeterData.map((meter) => {
							if (parseInt(meter.Status) === 1) {
								return (
									<Marker
										key={"m_"+meter.ID}
										position={{ lat: parseFloat(meter.Longitude), lng: parseFloat(meter.Lat) }}
										onClick={() => {
											setSelectedMeter(meter);
										}}
										icon={{
											url: require('./map_icon_green.png'),
											scaledSize: new window.google.maps.Size(20, 20)
										}}
									/>
								);
							} else {
								return (
									<Marker
										key={"m_"+meter.ID}
										position={{ lat: parseFloat(meter.Longitude), lng: parseFloat(meter.Lat) }}
										onClick={() => {
											setSelectedMeter(meter);
										}}
										icon={{
											url: require('./map_icon_red.png'),
											scaledSize: new window.google.maps.Size(20, 20)
										}}
									/>
								);
							}
						})
					}
					{!clusteringSwitch && selectedMeterData && 
						selectedMeterData.map((meter) => {
							if(meter.pLat !== ""){
								return (
									<Polyline
										key={"p_" + meter.ID}
										path= {[
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
								)
							}
						})
					}								
					{selectedMeter && (
						<InfoWindow
							position={{ lat: parseFloat(selectedMeter.Longitude), lng: parseFloat(selectedMeter.Lat) }}
							onCloseClick={() => {
								setSelectedMeter(null);
							}}>
							<MapCard MeterProfile={selectedMeter} />
						</InfoWindow>
					)}
					{/* {selectedMeterData && selectedMeterData.length > 0 && (
						<InfoWindow
							position={{lat: parseFloat(selectedMeterData[0].Longitude), lng: parseFloat(selectedMeterData[0].Lat)}}
							onCloseClick={() => {
								setSelectedMeterData(null);
								setSelectedMeterData1(null);
								if( cpolyline ) cpolyline.setMap(null);
								if( crectangle ) crectangle.setMap(null);
							}}>
							<div key={"consumptionTable"}>
								<div className={"MuiPaper-root MuiCard-root makeStyles-root-16 MuiPaper-elevation1 MuiPaper-rounded"}>
									<div className={"MuiCardContent-root makeStyles-root-16"}>
										<div className={"makeStyles-root-1"}>
											<h6> Meter Weekly Power Consuption </h6>
											<hr className={"MuiDivider-root"}></hr>
											<table>
												<thead>
													<tr style={{ lineHeight: "2em" }}>
														<th style={{ width: "120px", textAlign: "center" }}>UserName</th>
														<th style={{ width: "150px", textAlign: "center" }}>Meter Number</th>
														<th style={{ width: "100px", textAlign: "center" }}>Total Power</th>
														<th style={{ width: "70px", textAlign: "center" }}>Alarms</th>
													</tr>
												</thead>
												<tbody>
												{selectedMeterData.map((meter) => {
													return(
													<tr key={"tr_"+meter.ID} style={{ lineHeight: "2em" }}>
														<td style={{ width: "120px", textAlign: "center" }}>{meter.UserName}</td>
														<td style={{ width: "150px", textAlign: "center" }}>{meter.MeterNumber}</td>
														<td style={{ width: "100px", textAlign: "center" }}>125</td>
														<td style={{ width: "70px", textAlign: "center" }}>120</td>
													</tr>
													)
												})}
												</tbody>
											</table>
											<hr className={"MuiDivider-root"}></hr>
											<table>
												<thead>
													<tr style={{ lineHeight: "2em" }}>
														<th style={{ width: "120px", textAlign: "center" }}>
															<Button color='primary' size='small'>
																<Link
																	to={{
																		pathname: `/MapDash/Analyse`,
																		state: { meters: selectedMeterData }
																	}}>
																	Analyse
																</Link>
															</Button>
														</th>
														<th style={{ width: "150px", textAlign: "center" }}>Total</th>
														<th style={{ width: "100px", textAlign: "center" }}>{totalConsumption}</th>
														<th style={{ width: "70px", textAlign: "center" }}>{totalAlarm}</th>
													</tr>
												</thead>
											</table>
										</div>
									</div>
								</div>
							</div>
						</InfoWindow>
					)} */}
				</GoogleMap>
			)}
			{!selectedMeterData && (
				<GoogleMap
					key={"myGoogleMap"}
					defaultZoom={15}
					defaultCenter={{ lat: -22.560282, lng: 17.069457 }}
					defaultOptions={{
						scrollwheel: true,
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
					<DrawingManager
						key={"myDrawingManager"}
						className={"mydrawingmanager"}
						defaultDrawingMode={drawingMode ? window.google.maps.drawing.OverlayType.POLYGON : null}
						onPolygonComplete={onPolygonComplete}
						onRectangleComplete={onRectangleComplete}
						defaultOptions={{
							drawingControl: true,
							drawingControlOptions: {
								position: null,
								drawingModes: [
									window.google.maps.drawing.OverlayType.RECTANGLE,
									window.google.maps.drawing.OverlayType.POLYGON,
								],
							},
							polygonOptions: {
								fillColor: `#232323`,
								fillOpacity: 0.6,
								strokeWeight: 5,
								clickable: true,
								editable: true,
								zIndex: 1,
							},
						}}
					/>
					{clusteringSwitch && (
						<MarkerClusterer
							onClusteringEnd={onClusteringEnd}
							averageCenter
							enableRetinaIcons
							gridSize={68}
							maxZoom={18}
						>
						{meterData != null &&
							meterData.map((meter) => {
								if (parseInt(meter.Status) === 1) {
									return (
										<Marker
											key={"m_"+meter.ID}
											position={{ lat: parseFloat(meter.Longitude), lng: parseFloat(meter.Lat) }}
											onClick={() => {
												setSelectedMeter(meter);
											}}
											icon={{
												url: require('./map_icon_green.png'),
												scaledSize: new window.google.maps.Size(20, 20)
											}}
										/>
									);
								} else {
									return (
										<Marker
											key={"m_"+meter.ID}
											position={{ lat: parseFloat(meter.Longitude), lng: parseFloat(meter.Lat) }}
											onClick={() => {
												setSelectedMeter(meter);
											}}
											icon={{
												url: require('./map_icon_red.png'),
												scaledSize: new window.google.maps.Size(20, 20)
											}}
										/>
									);
								}
							})}
						</MarkerClusterer>
					)}
					{!clusteringSwitch && meterData != null && (
						meterData.map((meter) => {
							if (parseInt(meter.Status) === 1) {
								return (
									<Marker
										key={"m_"+meter.ID}
										position={{ lat: parseFloat(meter.Longitude), lng: parseFloat(meter.Lat) }}
										onClick={() => {
											setSelectedMeter(meter);
										}}
										icon={{
											url: require('./map_icon_green.png'),
											scaledSize: new window.google.maps.Size(20, 20)
										}}
									/>
								);
							} else {
								return (
									<Marker
										key={"m_"+meter.ID}
										position={{ lat: parseFloat(meter.Longitude), lng: parseFloat(meter.Lat) }}
										onClick={() => {
											setSelectedMeter(meter);
										}}
										icon={{
											url: require('./map_icon_red.png'),
											scaledSize: new window.google.maps.Size(20, 20)
										}}
									/>
								);
							}
						})
					)}
					{!clusteringSwitch && meterData !== null && 
						meterData.map((meter) => {
							if(meter.pLat !== ""){
								return (
									<Polyline
										key={"p_" + meter.ID}
										path= {[
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
								)
							}
						})
					}
					{selectedMeter && (
						<InfoWindow
							position={{ lat: parseFloat(selectedMeter.Longitude), lng: parseFloat(selectedMeter.Lat) }}
							onCloseClick={() => {
								setSelectedMeter(null);
							}}>
							<MapCard MeterProfile={selectedMeter} />
						</InfoWindow>
					)}
					{/* {selectedMeterData && selectedMeterData.length > 0 && (
						<InfoWindow
							position={{lat: parseFloat(selectedMeterData[0].Longitude), lng: parseFloat(selectedMeterData[0].Lat)}}
							onCloseClick={() => {
								setSelectedMeterData(null);
								setSelectedMeterData1(null);
								setOpen(false);
								if( cpolyline ) cpolyline.setMap(null);
								if( crectangle ) crectangle.setMap(null);
							}}>
							<div key={"consumptionTable"}>
								<div className={"MuiPaper-root MuiCard-root makeStyles-root-16 MuiPaper-elevation1 MuiPaper-rounded"}>
									<div className={"MuiCardContent-root makeStyles-root-16"}>
										<div className={"makeStyles-root-1"}>
											<h6> Meter Weekly Power Consuption </h6>
											<hr className={"MuiDivider-root"}></hr>
											<table>
												<thead>
													<tr style={{ lineHeight: "2em" }}>
														<th style={{ width: "120px", textAlign: "center" }}>UserName</th>
														<th style={{ width: "150px", textAlign: "center" }}>Meter Number</th>
														<th style={{ width: "100px", textAlign: "center" }}>Total Power</th>
														<th style={{ width: "70px", textAlign: "center" }}>Alarms</th>
													</tr>
												</thead>
												<tbody>
												{selectedMeterData.map((meter) => {
													return(
													<tr key={"tr_"+meter.ID} style={{ lineHeight: "2em" }}>
														<td style={{ width: "120px", textAlign: "center" }}>{meter.UserName}</td>
														<td style={{ width: "150px", textAlign: "center" }}>{meter.MeterNumber}</td>
														<td style={{ width: "100px", textAlign: "center" }}>125</td>
														<td style={{ width: "70px", textAlign: "center" }}>120</td>
													</tr>
													)
												})}
												</tbody>
											</table>
											<hr className={"MuiDivider-root"}></hr>
											<table>
												<thead>
													<tr style={{ lineHeight: "2em" }}>
														<th style={{ width: "120px", textAlign: "center" }}>
															<Button color='primary' size='small'>
																<Link
																	to={{
																		pathname: `/MapDash/Analyse`,
																		state: { meters: selectedMeterData }
																	}}>
																	Analyse
																</Link>
															</Button>
														</th>
														<th style={{ width: "150px", textAlign: "center" }}>Total</th>
														<th style={{ width: "100px", textAlign: "center" }}>{totalConsumption}</th>
														<th style={{ width: "70px", textAlign: "center" }}>{totalAlarm}</th>
													</tr>
												</thead>
											</table>
										</div>
									</div>
								</div>
							</div>
						</InfoWindow>
					)} */}
				</GoogleMap>
			)}


			<Box id="bottom-table" sx={{
				position: 'absolute',
				left: 239,
				right: 0,
				bottom: -95,
				height: 200,
				padding: '0px 25px',
				transition: '0.3s'
			}}>
				<ThemeProvider theme={defaultMaterialTheme}>
					<MaterialTable
						title='Alarms Notification'
						headerStyle={{minHeight: 32}}
						onRowClick={handleRowClick2}
						columns={[
							{ title: 'Meter Number ', field: 'MeterNumber', cellStyle: {padding: '3px 8px'}, headerStyle: {padding: '3px 8px'} },
							{ title: 'Location', field: 'Location', cellStyle: {padding: '3px 8px'}, headerStyle: {padding: '3px 8px'}  },
							{ title: 'Date/ Time', field: 'Date_time', cellStyle: {padding: '3px 8px'}, headerStyle: {padding: '3px 8px'}  },
							{ title: 'Alarm Type', field: 'AlarmType', cellStyle: {padding: '3px 8px'}, headerStyle: {padding: '3px 8px'}  },
							{ title: ' Alarm Code', field: 'AlarmCode', cellStyle: {padding: '3px 8px'}, headerStyle: {padding: '3px 8px'}  },
							{ title: 'Duration (Hours)', field: 'Duration', cellStyle: {padding: '3px 8px'}, headerStyle: {padding: '3px 8px'}  }
						]}
						data={selectedMeterData?(selectedNotification!=''?selectedMeterData.filter(meter => meter.AlarmType == selectedNotification):selectedMeterData):(meterData?meterData:[])}
					/>
				</ThemeProvider>
			</Box>
			<div id="toggler" onClick={toggleDown}>
				<ChevronLeftIcon/>
			</div>
			<div id="toggle-menu">
				<Switch name="clustering-switch" onChange={handleClusteringSwitch} checked={clusteringSwitch} color="primary" >Enable Clustering</Switch>
				<div id="drawing-tools"></div>
				<div style={{display:'flex', marginLeft: 30}}>
					<button className={"btn btn-default"} onClick={ () => filterNotifications("Critical")}>Critical</button>
					<button className={"btn btn-default"} onClick={ () => filterNotifications("Warning ")}>Warnings</button>
					<button className={"btn btn-default"} onClick={ () => filterNotifications("Systematic")}>Temper</button>
				</div>
			</div>
		</div>
	);
}

const WrappedMap = withScriptjs(withGoogleMap(Map));

export default function Home() {
	const { location } = useLocation();
	let selectedMeterNumber = location?.state?.meterNumber;
	return (
		<>
			{
				!location?.state ?
				<div key={"google_map"}>
					<WrappedMap
						googleMapURL={
							'https://maps.googleapis.com/maps/api/js?key=AIzaSyAX7CGyLu3H3AfDxa6-YOhGInraceFUiow&v=3.exp&libraries=geometry,drawing,places'
						}
						loadingElement={<div style={{height: `100%`, width: '100%'}}/>}
						containerElement={<div style={{height: `calc(100vh - 80px)`, width: '100%', display:'flex'}}/>}
						mapElement={<div style={{height: `calc(100vh - 200px)`, width: '100%'}}/>}
					/>
				</div> :
				<div key={"google_map"}>
					<WrappedMap selectedMeterNumber={selectedMeterNumber}
						googleMapURL={
							'https://maps.googleapis.com/maps/api/js?key=AIzaSyAX7CGyLu3H3AfDxa6-YOhGInraceFUiow&v=3.exp&libraries=geometry,drawing,places'
						}
						loadingElement={<div style={{height: `100%`, width: '100%'}}/>}
						containerElement={<div style={{height: `calc(100vh - 80px)`, width: '100%', display:'flex'}}/>}
						mapElement={<div style={{height: `calc(100vh - 200px)`, width: '100%'}}/>}
					/>
					<div id="bottom-table"></div>
				</div>
			}
		</>
	);
}
