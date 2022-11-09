import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Dashboard from './Dashboard/Dashboard';
import Home from './Maps/home';
import MeterAnalyse from './MeterAnalyse';
import MeterAnalysis from './MeterAnalysis';
import MainTable from './Table/MainTable';
import HomeMaps from './Maps/HomeMaps';
import MeterLog from './Dashboard/EChartBlocks/MeterLog';

const MapRouting = () => (
	<Switch>
		<Route exact path='/' component={Dashboard}  />
		<Route exact path='/MapDash/Grid' component={MainTable} />
		<Route exact path='/MapDash/Home2' component={Home} />
		<Route exact path='/MapDash/Dashboard' component={Dashboard} />
		<Route exact path='/MapDash/MeterLog' component={MeterLog} />
		<Route exact path='/MapDash/Analyse' component={MeterAnalyse} />
		<Route exact path='/MapDash/Analysis' component={MeterAnalysis} />
	</Switch>
);
export default MapRouting;
