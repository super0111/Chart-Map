import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Trarrif from './Trarrif';
import UserManagment from './UserManagment';
import Password from './Password';
import ProfileInfo from './ProfileInfo';

const Routing = () => (
	<Switch>
		<Route path='/SystemSetting/Trarrif' component={Trarrif} />
		<Route path='/SystemSetting/UserManagment' component={UserManagment} />
		<Route path='/SystemSetting/Password' component={Password} />
		<Route path='/SystemSetting/ProfileInfo' component={ProfileInfo} />
	</Switch>
);
export default Routing;
