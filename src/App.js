import React, {Component} from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      playerName: null,
      playerStats: {}
    }
  }

handleSubmit = (e) => {
  e.preventDefault();
  this.getPlayerId()
  console.log(this.state.playerName)
}

handleChange = (event) => {
  const replace = event.target.value.split(" ").join("_");
  if (replace.length > 0) {
    this.setState({playerName: replace})
  } else {
    alert("Please type players name!")
  }
}

  getPlayerId = () => {
    axios.get(`https://www.balldontlie.io/api/v1/players?search=${this.state.playerName}`)
    .then(async res => {
      // console.log(res.data.data)
      if (res.data.data[0] === undefined) {
        alert("This player is either injured or hasn't player yet")
      } else if(res.data.data.length > 1) {
        alert("Please specify the name more")
      } else {
        await this.getPlayerStats(res.data.data[0].id)
      }
    }).catch(error => {
      console.log(error)
    })
  }

  getPlayerStats = (playerId) => {
    axios.get(`https://www.balldontlie.io/api/v1/season_averages?season=2022&player_ids[]=${playerId}`)
.then(async res=> {
  console.log(res.data.data)
  this.setState({ playerStats: res.data.data[0]})
}).catch(error => {
  console.log(error)
})
}

  // componentDidMount() {
  //   this.getPlayerId()
  //   this.getPlayerStats()
  // }

  render() {
  return (
    <div className="App">
      <form onSubmit={this.handleSubmit}>
        <label>
          Name
          <input
          type="text"
          value = {this.state.value}
          onChange={this.handleChange}
          placeholder="please enter players name"
          />
        </label>
        <input type="submit" value="Submit"/>
      </form>
      games played: {this.state.playerStats["games_played"]}
    </div>
  );
}
}

export default App;
