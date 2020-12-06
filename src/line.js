import React from 'react';
import { Grid, Select, MenuItem, Typography, Button } from '@material-ui/core';
import Chart from "react-apexcharts";
import { dark } from '@material-ui/core/styles/createPalette';
import './App.css'

class LineGraph extends React.Component {
  render() {
    var imgPath = "<img src=" + process.env.PUBLIC_URL + '/reset.png width="20">';
    console.log("test");
    console.log(this.props.labels);
    var series = [{
      name: this.props.name,
      data: this.props.vals
    }]
    var options = {
      chart: {
        animations: {
          enabled: true,
        },
        type: 'line',
        toolbar: {
          tools: {
            show: true,
            reset: imgPath,
          },
          export: {
            csv: {
              filename: this.props.name,
            },
            png: {
              filename: this.props.name,
            },
          }
        },
        fontFamily: 'Roboto',
      },
      colors: ['#3463d9'],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
        width: 2,
      },
      title: {
        text: this.props.name,
        align: 'center',
        style: {
          color: "#fafafa",
          fontWeight: 'normal',
          fontSize: "20px"
        }
      },
      grid: {
        borderColor: '#2e2d2d',
        row: {
          colors: ['transparent'],
          opacity: 0.5
        },
        column: {
          colors: ['transparent'],
          opacity: 0.5
        }
      },
      markers: {
        size: 1,
      },
      xaxis: {
        categories: this.props.labels,
        labels: {
          style: {
            colors: "#757171"
          }
        },
        axisBorder: {
          show: true,
          color: '#000000'
        },
        axisTicks: {
          show: false,
        }
      },
      yaxis: {
        labels: {
          style: {
            colors: "#757171"
          }
        },
        axisBorder: {
          show: true,
          color: '#000000'
        },
      },
      tooltip: {
        enabled: true,
        followCursor: false,
        fillSeriesColor: true,
        theme: "dark",
      },
    }
    let average = (array) => array.reduce((a, b) => a + b) / array.length;
    var valArray = [0,0];
    if (this.props.vals.length !== 0)
      valArray = this.props.vals;
    var averageValue = +average(valArray).toPrecision(4);
    return (
      <div>
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
          <Grid item xs={5}>
            {/* <Button onClick={()=>{this.ref.lineChart.chartInstance.resetZoom()}}>
                Reset Zoom
            </Button> */}
          </Grid>
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
                <Chart 
                options={options}
                series={series}
                type="line"
                height="430"
                />
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default LineGraph