import React from 'react';
import { Layout, Navigation, Content, Header, HeaderRow } from 'react-mdl';
import { NavLink } from 'react-router-dom';

import { Box } from '@mui/material';

import Main from './Components/main';

import img from './Data/Logo.png';
import img2 from './Data/Logo_burned.png';
import homeImage from './home_icon_white.png';
import gridImage from './grid_icon_white.png';
import meterNotificationImage from './bell_icon_white.png';
import newMeterImage from './add_icon_white.png';
import settingImage from './settings_icon_white.png';
import {AppProvider} from './Context/AppContext';
import './App.css';

const handleMapClick = () => {
	if(document.getElementById("main-collapse")) document.getElementById("main-collapse").click();
}

function App() {
	return (
		<div>
			<AppProvider>
				<Layout>
					<Header>
						<HeaderRow className='header-color'>
							<img src={img2} className='photo' />
							<Navigation>
								<NavLink to='/MapDash/Dashboard' className="header-a" activeClassName="selected"
								>
									<Box component="img" src={homeImage} sx={{
										height: 20,
										width: "auto",
										marginRight: "10px",
										marginTop: "-5px",									
									}} />
									Home 
								</NavLink>
								<NavLink to='/gridTopology' className="header-a">
									<Box component="img" src={gridImage} sx={{
										height: 20,
										width: "auto",
										marginRight: "10px",
										marginTop: "-5px",									
									}} />
									Grid Topology
								</NavLink>
								<NavLink to='/alarms' className="header-a">
									<Box component="img" src={meterNotificationImage} sx={{
										height: 20,
										width: "auto",
										marginRight: "10px",
										marginTop: "-5px",									
									}} />
									Meter Notifications
								</NavLink>
								<NavLink to='/FormMeter' className="header-a">
									<Box component="img" src={newMeterImage} sx={{
										height: 20,
										width: "auto",
										marginRight: "10px",
										marginTop: "-5px",										
									}} />
									New Meter
								</NavLink>
								<NavLink to='/SystemSetting/ProfileInfo' className="header-a">
									<Box component="img" src={settingImage} sx={{
										height: 20,
										width: "auto",
										marginRight: "10px",
										marginTop: "-5px",									
									}} />
									System Settings
								</NavLink>
								<NavLink to='/MapDash/Home2' onClick={handleMapClick} className="header-a">
									Map
								</NavLink>
								<NavLink to='/MapDash/Analysis' className="header-a">
									Analysis
								</NavLink>
							</Navigation>
						</HeaderRow>
					</Header>

					<Content>
						<Main />
					</Content>
				</Layout>
			</AppProvider>
		</div>
	);
}

export default App;
