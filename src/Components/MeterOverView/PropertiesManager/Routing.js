import React from 'react';
import { Switch, Route } from 'react-router-dom';
import DataOverview from './DataOverview';
import TransactionHistory from './TransactionHistory';
import Controls from './Controls';
import Orders from './Orders';
import HistoricData from './HistoricData';
import Networking from './Networking';

const Routing = () => (
	<Switch>
		<Route path='/MeterProps' component={DataOverview} />
		<Route exact path='/MeterProps/TransactionHistory' component={TransactionHistory} />
		<Route exact path='/MeterProps/Controls' component={Controls} />
		<Route exact path='/MeterProps/DataOverview' component={DataOverview} />
		<Route exact path='/MeterProps/Networking' component={Networking} />
		<Route exact path='/MeterProps/Power' component={HistoricData} />
	</Switch>
);
export default Routing;
