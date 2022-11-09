import React, { Component } from 'react';

export default function Form(props) {
	const handleChange = async (event) => {
		//event.preventDefualt();
		//const MetersRequest = { Location: event.target.elements.meterNumber.value };
		props.getMeterBylocation(event);
	};

	return (
		<form onSubmit={handleChange} style={{ marginBottom: '2rem' }}>
			<input className='form__input' type='text' name='meterName' />
			<button className='form__button'>Search</button>
		</form>
	);
}