import React from 'react';
import { Switch, Route } from 'react-router-dom';
import MapDash from './MapDash';
import Dash from './GridTopology/Dash';
import Alarms from './Alarms/Alarms';
import FormManager from './Forms/FormManager';
import systemSetting from './SystemSettings/systemSetting';
import MeterProps from './MeterOverView/MeterProps';

const Main = () => (
	<Switch>
		<Route exact path='/' component={MapDash} />
		<Route exact path='/gridTopology' component={Dash} />
		<Route exact path='/alarms' component={Alarms} />
		<Route exact path='/FormMeter' component={FormManager} />
		<Route exact path='/SystemSetting/:id' component={systemSetting} />
		<Route exact path='/MeterProps/:id' component={MeterProps} />
		<Route exact path='/MapDash/:id' component={MapDash} />
	</Switch>
);
export default Main;
