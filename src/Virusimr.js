import React from 'react';
import './App.css';
import Page0 from './components/page0.js'
import Page1 from './components/page1.js'
import Page2 from './components/page2.js'
import Page3 from './components/page3.js'
import Page4 from './components/page4.js'
import Page5 from './components/page5.js'
import Page6 from './components/page6.js'
import CustomSim from './components/customsim.js'

export default class Virusimr extends React.Component {
  constructor() {
    super()
    this.state = {
      page: 2,
      interval: null
    }

    this._onClick = this._onClick.bind(this)
  }

  _onClick() {
    this.setState({page: this.state.page===7 ? 0 : this.state.page + 1})
  }

  render() {

    switch(this.state.page) {

      default:
        return

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
      case 7:
        return(
        <div className="backdrop">
          <CustomSim />
          <button onClick={this._onClick} > Boop doop </button>
        </div>
        )
    }
  }
}