import React, { Component } from 'react';

export class Header extends Component {
	handleChange(e) {
		const MetersRequest = { Location: e.target.value };
	}
	render() {
		return (
			<div>
				<h1> Please enter Name</h1>
				<input onChange={this.handleChange.bind(this)} />
				<h1> Please enter Surname</h1>
			</div>
		);
	}
}

export default Header;
