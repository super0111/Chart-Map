import React from 'react';
import { Link } from 'react-router-dom';

import DashboardIcon from '@mui/icons-material/Dashboard';
import BarChartIcon from '@mui/icons-material/BarChart';
import MapIcon from '@mui/icons-material/Map';
import { ListItem, ListItemIcon } from '@mui/material';

// const handleMapClick = () => {
// 	if(document.getElementById("main-collapse")) document.getElementById("main-collapse").click();
// }

export const mainListItems = (
	<div>
		<ListItem>
			<Link to='/MapDash/Dashboard' className='slider-item'>
				<ListItemIcon>
					<DashboardIcon />
				</ListItemIcon>
				Dashboard
			</Link>
		</ListItem>
		{/* <ListItem>
			<Link to='/MapDash/Home2' onClick={handleMapClick} className={"MuiButtonBase-root MuiListItem-root MuiListItem-gutters MuiListItem-button"}>
				<ListItemIcon>
					<MapIcon />
				</ListItemIcon>
				Map
			</Link>
		</ListItem> */}
		<ListItem>
			<Link to='/MapDash/Grid' className='slider-item'>
				<ListItemIcon>
					<BarChartIcon />
				</ListItemIcon>
				Meter List
			</Link>
		</ListItem>
		{/*<ListItem>*/}
		{/*	<Link to='/MapDash/Analysis' className={"MuiButtonBase-root MuiListItem-root MuiListItem-gutters MuiListItem-button"}>*/}
		{/*		<ListItemIcon>*/}
		{/*			<BarChartIcon />*/}
		{/*		</ListItemIcon>*/}
		{/*		Analysis*/}
		{/*	</Link>*/}
		{/*</ListItem>*/}
	</div>
);

export const SecondaryListItems = (
	<div>
		<ListItem button>
			<ListItemIcon>
				<DashboardIcon />
			</ListItemIcon>
			<Link to='/MapDash/Home'>Water Meters</Link>
		</ListItem>
		<ListItem button>
			<ListItemIcon>
				<BarChartIcon />
			</ListItemIcon>
			<Link to='/MapDash/Grid'>Electricity Meters </Link>
		</ListItem>
		<ListItem button>
			<ListItemIcon>
				<BarChartIcon />
			</ListItemIcon>
			<Link to='/MapDash/Grid'>Traffic Controllers </Link>
		</ListItem>
		<ListItem button>
			<ListItemIcon>
				<BarChartIcon />
			</ListItemIcon>
			<Link to='/MapDash/Grid'>Power Stations </Link>
		</ListItem>
		<ListItem button>
			<ListItemIcon>
				<BarChartIcon />
			</ListItemIcon>
			<Link to='/MapDash/Grid'>Substations </Link>
		</ListItem>
	</div>
);
