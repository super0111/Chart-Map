import React, { useState, useEffect } from 'react';
import { Grid, Paper, Card } from '@mui/material';
import Moment from 'moment';

// import TransactionHistory from './TransactionHistory';
import Livechart from '../Livechart';
// import MeterInformation from './MeterInformation';
import WeeklyBargraphs from '../AreaPlot/WeeklyBargraphs';
import MapLocation from './MapLocation';
import Voltage from '../../Dashboard/EChartBlocks/Voltage';
import Current from '../../Dashboard/EChartBlocks/Current';
import RealPower from '../../Dashboard/EChartBlocks/RealRower';
import ActivePower from '../../Dashboard/EChartBlocks/ActivePower';
import ReactivePower from '../../Dashboard/EChartBlocks/ReactivePower';
import ApparentPower from '../../Dashboard/EChartBlocks/ApparentPower';
import Frequency from '../../Dashboard/EChartBlocks/Frequency';

function MeterData() {
	// const [ state, setState ] = useState([]);
	const [ state, setState ] = useState({
    valtageValues: [],
    currentValues: [],
    frequencyValues: [],
    active_powerValues: [],
    reactive_powerValues: [],
    apparent_powerValues: [],
    power_factorValues: [],
  });

  useEffect( ()=> {
		const fetchPosts = async () => {
			const request = new Request('http://gridx-meter-server-node-dev.us-east-1.elasticbeanstalk.com/meterPower/getAll', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZXRlckRSTiI6IjAwMDAwMzk5NjczNTEiLCJpYXQiOjE2NjMyOTE2NTl9.Q-5Sf02eatwT8UEHajmIBcdAuu1PmKsWrXQNU_oVGDI'
				}
			});
	
			const api_call = await fetch(request);
			let data = await api_call.json();
      console.log("originalllll dataa", data)
      const voltage_data = data.map((item) => {
        const time = new Date(item.record_time);
        const recodeTime = Moment(time).format('YYYY-MM-DD').toString();
        return [recodeTime, item.voltage]
      });
      const current_data = data.map((item) => {
        const time = new Date(item.record_time);
        const recodeTime = Moment(time).format('YYYY-MM-DD').toString();
        return [recodeTime, item.current]
      });
      const frequency_data = data.map((item) => {
        const time = new Date(item.record_time);
        const recodeTime = Moment(time).format('YYYY-MM-DD').toString();
        return [recodeTime, item.frequency]
      });
      const reactive_power_data = data.map((item) => {
        const time = new Date(item.record_time);
        const recodeTime = Moment(time).format('YYYY-MM-DD').toString();
        return [recodeTime, item.reactive_power]
      });
      const active_power_data = data.map((item) => {
        const time = new Date(item.record_time);
        const recodeTime = Moment(time).format('YYYY-MM-DD').toString();
        return [recodeTime, item.active_power]
      });
      const apparent_power_data = data.map((item) => {
        const time = new Date(item.record_time);
        const recodeTime = Moment(time).format('YYYY-MM-DD').toString();
        return [recodeTime, item.apparent_power]
      });
      const power_factor_data = data.map((item) => {
        const time = new Date(item.record_time);
        const recodeTime = Moment(time).format('YYYY-MM-DD').toString();
        return [recodeTime, item.power_factor]
      });

			setState({
        valtageValues: voltage_data,
        currentValues: current_data,
        frequencyValues: frequency_data,
        active_powerValues: active_power_data,
        reactive_powerValues: reactive_power_data,
        apparent_powerValues: apparent_power_data,
        power_factorValues: power_factor_data,
      });
		}
		fetchPosts();
	}, [])

  return (
    <Grid container spacing={3}>
      {/* Chart */}
      {/* <Grid item lg={12} md={12} xl={12} xs={12}>
        <Paper elevation={0}>
          
        </Paper>
      </Grid> */}
      {/* Recent Deposits md={4} lg={3}*/}
      <Grid item lg={7} md={12} xl={8} xs={12}>
        <Paper elevation={0}>
          <WeeklyBargraphs />
        </Paper>
      </Grid>
      {/* Recent Deposits md={4} lg={3}*/}
      <Grid item lg={5} md={6} xl={4} xs={12} sx={{
        paddingLeft: "1px !important"
      }}>
        <Paper elevation={0}>
          <MapLocation />
        </Paper>
      </Grid>
      {/* Recent Deposits md={4} lg={3}*/}
      <Grid item lg={12} md={12} xl={12} xs={12}>
        <Paper elevation={0}>
          <Livechart />
        </Paper>
      </Grid>
      {/* Charts for Detail of Meter Profile */}
      <Grid item lg={6} md={6} xl={6} xs={12}>
        <Card>
          <Voltage valtageValues={state.valtageValues} />
        </Card>
      </Grid>
      <Grid item lg={6} md={6} xl={6} xs={12}>
        <Card>
          <Current currentValues = {state.currentValues} />
        </Card>
      </Grid>
      <Grid item lg={6} md={6} xl={6} xs={12}>
        <Card>
          <RealPower power_factorValues={state.power_factorValues}/>
        </Card>
      </Grid>
      <Grid item lg={6} md={6} xl={6} xs={12}>
        <Card>
          <ActivePower active_powerValues={state.active_powerValues}/>
        </Card>
      </Grid>
      <Grid item lg={6} md={6} xl={6} xs={12}>
        <Card>
          <ReactivePower reactive_powerValues={state.reactive_powerValues}/>
        </Card>
      </Grid>
      <Grid item lg={6} md={6} xl={6} xs={12}>
        <Card>
          <ApparentPower apparent_powerValues={state.apparent_powerValues} />
        </Card>
      </Grid>
      <Grid item lg={6} md={6} xl={6} xs={12}>
        <Card>
          <Frequency frequencyValues={state.frequencyValues} />
        </Card>
      </Grid>

    </Grid>
  )
}

export default MeterData
		