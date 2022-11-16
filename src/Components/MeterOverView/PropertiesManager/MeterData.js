import React, { useState, useEffect } from 'react';
import { Grid, Paper, Card } from '@mui/material';

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
			const data = await api_call.json();
      console.log("datat vaaaalueee", data)

      for(let i=0; i<= data.length; i++) {
        let datas = [];
        console.log(" data[i].voltage",  data[i].voltage)
        console.log(" data[i].record_time",  data[i].record_time)
        const time = new Date(data[i].record_time);
        console.log("timememee", time.toString());

        datas.push(...datas, data[i].voltage);  
        // setState({ valtageValues: datas });
      console.log("dataaaaaa", datas)

      }

			setState(...state, data);
		}
		fetchPosts();
	}, [])

  console.log("statatate", state.valtageValues)


  

  return (
    <Grid container spacing={3}>
      {/* Chart */}
      <Grid item lg={12} md={12} xl={12} xs={12}>
        <Paper elevation={0}>
          
        </Paper>
      </Grid>
      {/* Recent Deposits md={4} lg={3}*/}
      <Grid item lg={8} md={12} xl={9} xs={12}>
        <Paper elevation={0}>
          <WeeklyBargraphs />
        </Paper>
      </Grid>
      {/* Recent Deposits md={4} lg={3}*/}
      <Grid item lg={4} md={6} xl={3} xs={12}>
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
          <Voltage 
            // valtageValues={state.valtageValues} 
          />
        </Card>
      </Grid>
      <Grid item lg={6} md={6} xl={6} xs={12}>
        <Card>
          <Current />
        </Card>
      </Grid>
      <Grid item lg={6} md={6} xl={6} xs={12}>
        <Card>
          <RealPower />
        </Card>
      </Grid>
      <Grid item lg={6} md={6} xl={6} xs={12}>
        <Card>
          <ActivePower />
        </Card>
      </Grid>
      <Grid item lg={6} md={6} xl={6} xs={12}>
        <Card>
          <ReactivePower />
        </Card>
      </Grid>
      <Grid item lg={6} md={6} xl={6} xs={12}>
        <Card>
          <ApparentPower />
        </Card>
      </Grid>
      <Grid item lg={6} md={6} xl={6} xs={12}>
        <Card>
          <Frequency />
        </Card>
      </Grid>

    </Grid>
  )
}

export default MeterData
		