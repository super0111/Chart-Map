import React, { Component } from 'react';
import Header from './Header';

export class Layout extends Component {
	constructor() {
		super();
		this.state = {
			title: 'Personal Profile',
			Name: '',
			Surname: ''
		};
	}

	changeNames(Name, Surname) {
		this.setState({ Name: Name, Surname: Surname });
	}

	render() {
		return (
			<div>
				<Header changeNames={this.changeNames.bind(this)} title={this.state.title} />
			</div>
		);
	}
}

export default Layout;
