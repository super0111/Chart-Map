import React, { Component } from 'react';
import { useState } from 'react';
import Header from './Header';

export default function Layout() {
	const [ state, setState ] = useState({
		title: 'Personal Profile',
		Name: '',
		Surname: ''
	})

	const changeNames = (Name, Surname) => {
		setState({ Name: Name, Surname: Surname });
	}

	return (
		<div>
			<Header changeNames={changeNames} title={this.state.title} />
		</div>
	);
}