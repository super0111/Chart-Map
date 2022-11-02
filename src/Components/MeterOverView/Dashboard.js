import React, { useState, useEffect } from 'react';

import { styled, useTheme } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import { Container, List, Divider, IconButton } from '@mui/material';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import useMediaQuery from '@mui/material/useMediaQuery';

import { mainListItems } from './listItems';
import Routing from './PropertiesManager/Routing';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function Dashboard() {
	const [open, setOpen] = React.useState(true);
  const matches = useMediaQuery('(min-width:685px)');

  useEffect(() => {
    setOpen(matches);
  }, [matches])

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

	return (
		<div style={{display: 'flex'}}>
			<Drawer 
        variant="permanent" 
        open={open}
        sx={{
          "& .MuiPaper-root": {
            backgroundColor: "white",
						paddingTop: "60px !important",
          }
        }}
      >
        <DrawerHeader
          sx={{
            padding: "20px 0 10px 0",
            position: "relative"
          }}
        >
          {
						open === false ?
						<IconButton sx={{marginRight: "10px"}} className='draw_icon' onClick={handleDrawerOpen}>
							<ChevronRightIcon className=''/>
						</IconButton> : 
						<IconButton sx={{marginRight: "18px"}} className='draw_icon' onClick={handleDrawerClose}>
							<ChevronLeftIcon className=''/>
						</IconButton>
          }
        </DrawerHeader>
        <Divider color="white" />
				<List>{mainListItems}</List>
				<Divider />
      </Drawer>

			<main style={{
				flexGrow: 1,
				height: '80vh',
				overflow: 'auto'
			}}>
				<Container maxWidth='lg'>
					<Routing />
				</Container>
			</main>
		</div>
	);
}
