import React from 'react';
import logo from './logo.svg';
import './App.css';
import Virusim from './components/virusim.js'
import Slide from 'react-reveal/Slide'
import Page0 from './components/page0.js'
import Page1 from './components/page1.js'
import Page2 from './components/page2.js'
import Page3 from './components/page3.js'
import Page4 from './components/page4.js'
import Page5 from './components/page5.js'
import Page6 from './components/page6.js'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      page: 0,
      interval: null
    }

    this._onClick = this._onClick.bind(this)
  }

  _onClick() {
    this.setState({page: this.state.page===6 ? 0 : this.state.page + 1})
  }

  render() {

    switch(this.state.page) {
      case 0:
        return(
          <div className="backdrop">
            <div style={{
            position: 'absolute', left: '50%', top: '50%',
            transform: 'translate(-50%, -50%)'
            }}>
              <Page0 />
              <button onClick={this._onClick} > Boop doop </button>
          </div>
          </div>
          
          )

      case 1:
        return(
        <div className="backdrop">
          <Page1 />
          <button onClick={this._onClick} > Boop doop </button>
        </div>
        )

      case 2:
        return(
        <div className="backdrop">
          <Page2 />
          <button onClick={this._onClick} > Boop doop </button>
        </div>
        )

      case 3:
        return(
        <div className="backdrop">
          <Page3 />
          <button onClick={this._onClick} > Boop doop </button>
        </div>
        )  

      case 4:
        return(
        <div className="backdrop">
          <Page4 />
          <button onClick={this._onClick} > Boop doop </button>
        </div>
        )

      case 5:
        return(
        <div className="backdrop">
          <Page5 />
          <button onClick={this._onClick} > Boop doop </button>
        </div>
        )
      case 6:
        return(
        <div className="backdrop">
          <Page6 />
          <button onClick={this._onClick} > Boop doop </button>
        </div>
        )
    }
  }
}
  

export default App;