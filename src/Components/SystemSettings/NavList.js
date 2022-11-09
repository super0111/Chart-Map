import React from 'react';
import { Link } from 'react-router-dom';
import { ListItem, ListItemIcon, ListItemText } from '@mui/material';
import BarChartIcon from '@mui/icons-material/BarChart';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LayersIcon from '@mui/icons-material/Layers';

export const mainListItems = (
	<div>
		<ListItem button>
			<ListItemIcon>
				<DashboardIcon />
			</ListItemIcon>
			<Link to='/SystemSetting/ProfileInfo'>Profile Information</Link>
		</ListItem>
		<ListItem button>
			<ListItemIcon>
				<BarChartIcon />
			</ListItemIcon>
			<Link to='/SystemSetting/Password'>Password Change </Link>
		</ListItem>
		<ListItem button>
			<ListItemIcon>
				<BarChartIcon />
			</ListItemIcon>
			<Link to='/SystemSetting/UserManagment'>User Management </Link>
		</ListItem>
	</div>
);
