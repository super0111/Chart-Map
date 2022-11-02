import React, { useState, useEffect } from 'react';

export default function DataBaseUpdate(props) {
	const [ meterData, setMeterdata ] = useState(null);

	useEffect(() => {
		async function fetchData() {
			console.log('We are using effect in fetchData');
			const resquestType = {
				key: 'StartGRID2020',
				FirstName: props.MeterUser.FirstName,
				LastName: props.MeterUser.LastName,
				Region: props.MeterUser.Region,
				City: props.MeterUser.City,
				ErfNumber: props.MeterUser.ErfNumber,
				Constituency: props.MeterUser.Constituency,
				StreetName: props.MeterUser.StreetName,
				MeterNumber: props.MeterUser.MeterNumber,
				MeterPhoneNumber: props.MeterUser.MeterPhoneNumber,
				UserCategory: props.MeterUser.UserCategory,
				RistrationDate: props.MeterUser.RistrationDate
			};

			// Default options are marked with *
			const response = await fetch(`https://stargridx.net/PostUserInfo.php`, {
				method: 'POST', // *GET, POST, PUT, DELETE, etc.
				mode: 'cors', // no-cors, *cors, same-origin
				cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
				credentials: 'same-origin', // include, *same-origin, omit
				headers: {
					'Content-Type': 'application/json'
					// 'Content-Type': 'application/x-www-form-urlencoded',
				},
				redirect: 'follow', // manual, *follow, error
				referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
				body: JSON.stringify(resquestType) // body data type must match "Content-Type" header
			})
				.then((response) => response.json())
				.then((data) => {
					console.log('Success:', data);
				})
				.catch((error) => {
					console.error('Error:', error);
				});
			//console.error('Error:', response);
			//setMeterdata(response);
		}
		fetchData();
	}, []);
	return <div />;
}
