import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './components/home.js'
import Slide from 'react-reveal/Slide'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      page: 2,
      interval: null
    }
  }

  componentDidMount() {
    let interval = setInterval(
      function() {
        console.log(this.state.page)
        if(this.state.page < 2) {this.setState({page: this.state.page+1})}
        
      }.bind(this), 2000)

    this.setState({interval: interval})
  }

  render() {
    if(this.state.page === 0) {
      return(
        <p>loading</p>
      )
    }

    if(this.state.page === 1) {
      return (
        <div className="App">
            <Slide left>
              <Home width={300} height={300} number_nodes={100} number_infected_start={10}
                    number_vaccinated_start={0} velocity_scale={.5}/>
              <Home width={400} height={200} number_nodes={100} number_infected_start={10}
                    number_vaccinated_start={0} velocity_scale={.5} />
            </Slide>
        </div>
      );
    }

    if(this.state.page === 2) {
      return (
        <div className="App">
            <Slide right>
              <Home width={300} height={300} number_nodes={100} number_infected_start={10}
                    number_vaccinated_start={0} velocity_scale={.5}/>
              <Home width={400} height={200} number_nodes={100} number_infected_start={10}
                    number_vaccinated_start={0} velocity_scale={.5} />
            </Slide>
        </div>
      );
    }
    
  }
}
  

export default App;


// width, height, number_nodes, number_infected_start,
//             number_vaccinated_start, velocity_scale