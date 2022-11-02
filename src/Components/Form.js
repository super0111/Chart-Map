import React, { Component } from 'react';

export class Form extends Component {
	handleChange = async (event) => {
		//event.preventDefualt();
		//const MetersRequest = { Location: event.target.elements.meterNumber.value };
		this.props.getMeterBylocation(event);
	};

	render() {
		return (
			<form onSubmit={this.handleChange} style={{ marginBottom: '2rem' }}>
				<input className='form__input' type='text' name='meterName' />
				<button className='form__button'>Search</button>
			</form>
		);
	}
}

export default Form;
