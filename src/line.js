import React from 'react';
import {Line} from 'react-chartjs-2';
import { Grid, Select, MenuItem, Typography } from '@material-ui/core';
import 'chart.js';
import 'chartjs-plugin-trendline';

class LineGraph extends React.Component{
  render() {
    var data = {
      labels: this.props.labels,
      datasets: [{
        label: this.props.name,
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(66, 129, 245,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: this.props.vals,
        trendlineLinear: {
          style: "rgba(255,255,255,0.8",
          lineStyle: "solid",
          width: 3,
        },
      }],
    }
    let average = (array) => array.reduce((a, b) => a + b) / array.length;
    var valArray = [0,0];
    if (this.props.vals.length !== 0)
      valArray = this.props.vals;
    var averageValue = +average(valArray).toPrecision(4);
    return (
      <div >
        <Grid container direction={"row"} justify="center" alignItems="center">
          <Grid item xs={1}></Grid>
          <Grid item xs={2}>
            <Select onChange={this.props.changeDialogState} defaultValue={'hall-effect|speed'}>
              <MenuItem value="hall-effect|rpm">RPM</MenuItem>
              <MenuItem value="hall-effect|speed">Speed</MenuItem>
              <MenuItem value="hall-effect|throttle">Throttle</MenuItem>
              <MenuItem value="accelerometer|acceleration x">Acceleration X</MenuItem>
              <MenuItem value="accelerometer|acceleration y">Acceleration Y</MenuItem>
              <MenuItem value="accelerometer|acceleration z">Acceleration Z</MenuItem>
              <MenuItem value="joulemeter|current">Current</MenuItem>
              <MenuItem value="joulemeter|power">Power</MenuItem>
              <MenuItem value="joulemeter|voltage">Voltage</MenuItem>
              <MenuItem value="magnetometer|MagX">MagX</MenuItem>
              <MenuItem value="magnetometer|MagY">MagY</MenuItem>
              <MenuItem value="magnetometer|MagZ">MagZ</MenuItem>
              <MenuItem value="gyroscope|GyX">GyX</MenuItem>
              <MenuItem value="gyroscope|GyY">GyY</MenuItem>
              <MenuItem value="gyroscope|GyZ">GyZ</MenuItem>
              <MenuItem value="gyroscope|heading">Heading</MenuItem>
              <MenuItem value="gyroscope|pitch">Pitch</MenuItem>
              <MenuItem value="gyroscope|roll">Roll</MenuItem>
              <MenuItem value="gps|latitude">Latitude</MenuItem>
              <MenuItem value="gps|longitude">Longitude</MenuItem>
              <MenuItem value="environment|altitude">Altitude</MenuItem>
              <MenuItem value="environment|temperature">Temperature</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body1">Average: {averageValue}</Typography>
          </Grid>
          <Grid item xs={5}></Grid>
          <Grid item xs={2}>
            <Select onChange={this.props.changeTrial} defaultValue={"1"}>
              {this.props.trials.map(item => {
                return ([
                  <MenuItem value={item}>
                    {"Trial " + item}
                  </MenuItem>
                ])
              })}
            </Select>
          </Grid>
        </Grid>
        <Grid container direction={"row"}>
          <Grid item xs={12}>
            <div className="card">
              <div className="card-image">
                <Line data={data} height={125}/>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
};

export default LineGraph; 