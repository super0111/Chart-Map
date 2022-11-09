import React, { Component } from 'react';

export default function Header() {
	const handleChange = (e) => {
		const MetersRequest = { Location: e.target.value };
	}
	return (
		<div>
			<h1> Please enter Name</h1>
			<input onChange={ (e) => handleChange(e)} />
			<h1> Please enter Surname</h1>
		</div>
	);
}