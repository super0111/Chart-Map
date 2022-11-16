import React from 'react';
import Tabs from 'react-tabs-with-components';

import MeterData from './MeterData';
import MeterConfigurations from './MeterConfigurations';

const tabs = [
  {
    title: 'Meter Data',
    component: <MeterData />,
    visible: true
  },
  {
    title: 'Meter Configurations',
    component: <MeterConfigurations />,
    visible: true
  }
];

function DataOverview(props) {

	return (
		<Tabs tabs={tabs} defaultActiveTab={0} />
	);
}

export default DataOverview;
