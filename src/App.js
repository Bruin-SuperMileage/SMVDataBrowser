import React from 'react';
import firebase from './firebase';
import { Grid, withStyles, Paper, Typography, AppBar, Toolbar } from '@material-ui/core'
// import MenuIcon from '@material-ui/icons/Menu';
// import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
// import DirectionsCarIcon from '@material-ui/icons/DirectionsCar';
//import LineGraph from './line'
import LineGraph from './line'

const styles = theme => ({
  root: {
    minHeight: "100vh",
    // width: "100%",
    // position: "fixed",
    backgroundColor: "rgb(51, 48, 48)",
  },
  drawer: {
    width: "10rem",
    position: 'relative',
  },
  menuIcon: {
    marginRight: 32
  },
  title: {
    flexGrow: 1,
  },
})

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allData: {},
      trials: [],
      drawerOpen: false,
      graph1value: "hall-effect|speed",
      graph2value: "hall-effect|speed",
      graph3value: "hall-effect|speed",
      graph4value: "hall-effect|speed",
      graph1Data: [],
      graph2Data: [],
      graph3Data: [],
      graph4Data: [],
      trialTimes: [],
      graph1Times: [],
      graph2Times: [],
      graph3Times: [],
      graph4Times: [],
      graph1Trial: "1",
      graph2Trial: "1",
      graph3Trial: "1",
      graph4Trial: "1",
    }
  }

  componentDidMount() {
    let database = firebase.database();
    var trials = [];
    database.ref().on('value', (snapshot) => {
      var allData = snapshot.val();
      Object.keys(allData).forEach(key => {
        if (key[0]==='T')
          trials.push(Number(key.substring(6)))
      })
      database.ref("Trial 1").on('value', (snapshot) => {
        var times = snapshot.val();
        var trialTimes = [];
        var graph1Data = [];
        var graph2Data = [];
        var graph3Data = [];
        var graph4Data= [];
        var split1 = this.state.graph1value.split("|");
        var split2 = this.state.graph2value.split("|");
        var split3 = this.state.graph3value.split("|");
        var split4 = this.state.graph4value.split("|");
        Object.keys(times).forEach(key => {
          if (Number.isInteger(Number(key[0])))
            trialTimes.push(key);
            graph1Data.push(times[key][split1[0]][split1[1]]);
            graph2Data.push(times[key][split2[0]][split2[1]]);
            graph3Data.push(times[key][split3[0]][split3[1]]);
            graph4Data.push(times[key][split4[0]][split2[1]]);
        })
        this.setState({
          graph1Times: trialTimes,
          graph2Times: trialTimes,
          graph3Times: trialTimes,
          graph4Times: trialTimes,
          graph1Data: graph1Data,
          graph2Data: graph2Data,
          graph3Data: graph3Data,
          graph4Data: graph4Data,
        })
      })
      trials.sort(function(a,b){return a-b})
      this.setState({
        allData: allData,
        trials: trials,
      })
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.graph1value !== this.state.graph1value || prevState.graph1Trial !== this.state.graph1Trial) {
      let database = firebase.database();
      database.ref("Trial " + this.state.graph1Trial).on('value', (snapshot) => {
        var times = snapshot.val();
        var graph1Data = [];
        var trialTimes = [];
        var split1 = this.state.graph1value.split("|");
        Object.keys(times).forEach(key => {
          if (Number.isInteger(Number(key[0]))) {
            trialTimes.push(key);
            graph1Data.push(times[key][split1[0]][split1[1]]);
          }
        })
        this.setState({
          graph1Times: trialTimes,
          graph1Data: graph1Data,
        })
      })
    }
    if (prevState.graph2value !== this.state.graph2value || prevState.graph2Trial !== this.state.graph2Trial) {
      let database = firebase.database();
      database.ref("Trial " + this.state.graph2Trial).on('value', (snapshot) => {
        var times = snapshot.val();
        var graph2Data = [];
        var trialTimes = [];
        var split1 = this.state.graph2value.split("|");
        Object.keys(times).forEach(key => {
          if (Number.isInteger(Number(key[0]))) {
            trialTimes.push(key);
            graph2Data.push(times[key][split1[0]][split1[1]]);
          }
        })
        this.setState({
          graph2Times: trialTimes,
          graph2Data: graph2Data,
        })
      })
    }
    if (prevState.graph3value !== this.state.graph3value || prevState.graph3Trial !== this.state.graph3Trial) {
      let database = firebase.database();
      database.ref("Trial " + this.state.graph3Trial).on('value', (snapshot) => {
        var times = snapshot.val();
        var graph3Data = [];
        var trialTimes = [];
        var split1 = this.state.graph3value.split("|");
        Object.keys(times).forEach(key => {
          if (Number.isInteger(Number(key[0]))) {
            trialTimes.push(key);
            graph3Data.push(times[key][split1[0]][split1[1]]);
          }
        })
        this.setState({
          graph3Times: trialTimes,
          graph3Data: graph3Data,
        })
      })
    }
    if (prevState.graph4value !== this.state.graph4value || prevState.graph4Trial !== this.state.graph4Trial) {
      let database = firebase.database();
      database.ref("Trial " + this.state.graph4Trial).on('value', (snapshot) => {
        var times = snapshot.val();
        var graph4Data = [];
        var trialTimes = [];
        var split1 = this.state.graph4value.split("|");
        Object.keys(times).forEach(key => {
          if (Number.isInteger(Number(key[0]))) {
            trialTimes.push(key);
            graph4Data.push(times[key][split1[0]][split1[1]]);
          }
        })
        this.setState({
          graph4Times: trialTimes,
          graph4Data: graph4Data,
        })
      })
    }
  }

  toggleDrawer = () => {
      this.setState({
        drawerOpen: !this.state.drawerOpen,
      })
  }

  handleClose = () => {
    this.setState({drawerOpen: false})
  }

  setTrial = (trial) => {
    if (trial !== this.state.trialNumber)
      this.setState({trialNumber: trial})
  }

  changeDialogState1 = (event) => {
    this.setState({graph1value: event.target.value})
  }

  changeDialogState2 = (event) => {
    this.setState({graph2value: event.target.value})
  }

  changeDialogState3 = (event) => {
    this.setState({graph3value: event.target.value})
  }

  changeDialogState4 = (event) => {
    this.setState({graph4value: event.target.value})
  }

  changeTrial1 = (event) => {
    this.setState({graph1Trial: event.target.value.toString()})
  }

  changeTrial2 = (event) => {
    this.setState({graph2Trial: event.target.value.toString()})
  }

  changeTrial3 = (event) => {
    this.setState({graph3Trial: event.target.value.toString()})
  }

  changeTrial4 = (event) => {
    this.setState({graph4Trial: event.target.value.toString()})
  }

  render() {
    const {classes} = this.props;
    return(
      <Paper className={classes.root} square={true}>
        <AppBar position="static">
          <Toolbar>
            <Typography component="h1" variant="h6" className={classes.title}>
              Bruin Supermileage Data Browser
            </Typography>
            <img src={process.env.PUBLIC_URL + "/icon.png"} height="40rem" alt=""/>
          </Toolbar>
        </AppBar>
        <Grid container spacing={0}>
            <Grid container direction={"row"} alignItems={"stretch"}>
            <Grid item xs={6} className={classes.grid}>
                <LineGraph changeDialogState={this.changeDialogState1} vals={this.state.graph1Data} name={this.state.graph1value.split("|")[1].split(' ').map(capitalize).join(' ')} labels={this.state.graph1Times} trials={this.state.trials} changeTrial={this.changeTrial1}/>
                {/* <ApexLineGraph changeDialogState={this.changeDialogState1} vals={this.state.graph1Data} name={this.state.graph1value.split("|")[1].split(' ').map(capitalize).join(' ')} labels={this.state.graph1Times} trials={this.state.trials} changeTrial={this.changeTrial1}/> */}
            </Grid>
            <Grid item xs={6}>
                <LineGraph changeDialogState={this.changeDialogState2} vals={this.state.graph2Data} name={this.state.graph2value.split("|")[1].split(' ').map(capitalize).join(' ')} labels={this.state.graph2Times} trials={this.state.trials} changeTrial={this.changeTrial2}/>
            </Grid>
            </Grid>
            <Grid container direction={"row"}>
            <Grid item xs={6}>
                <LineGraph changeDialogState={this.changeDialogState3} vals={this.state.graph3Data} name={this.state.graph3value.split("|")[1].split(' ').map(capitalize).join(' ')} labels={this.state.graph3Times} trials={this.state.trials} changeTrial={this.changeTrial3}/>
            </Grid>
            <Grid item xs={6}>
                <LineGraph changeDialogState={this.changeDialogState4} vals={this.state.graph4Data} name={this.state.graph4value.split("|")[1].split(' ').map(capitalize).join(' ')} labels={this.state.graph4Times} trials={this.state.trials} changeTrial={this.changeTrial4}/>
            </Grid>
            </Grid>
        </Grid>
      </Paper>
    );
  }
}

export default withStyles(styles)(App);

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}