import React from 'react';
import { useLocation } from 'react-router';
import MeterGrid from './MeterGrid';

export default function MeterAnalyse() {
	const { location } = useLocation();
	const state = {
		meterData: location.state.meters
	};

	return (
		<div>
			<MeterGrid meters={state.meterData} />
		</div>
	);
}
