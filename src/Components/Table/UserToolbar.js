import React from 'react';
import PropTypes from 'prop-types';

import { Button } from '@mui/material';

const UsersToolbar = () => {

	return (
		<div>
			<div style={{
				height: '42px',
				display: 'flex',
				alignItems: 'center'
			}}>
				<span style={{flexGrow: 1}} />

				<Button>Download CSV</Button>
			</div>
		</div>
	);
};

UsersToolbar.propTypes = {
	className: PropTypes.string
};

export default UsersToolbar;
