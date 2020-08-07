import React from 'react';
import './Virusimr.css';
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
      page: 0,
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
            <div
              style={{
                height: '100vh',
                width: '100%'
              }}
            >
              <Page0 onClickHelper={this._onClick}/>
          </div>
          </div>
          
          )

      case 1:
        return(
        <div className="backdrop">
          <Page1 onClickHelper={this._onClick}/>
        </div>
        )

      case 2:
        return(
        <div className="backdrop">
          <Page2 onClickHelper={this._onClick}/>
        </div>
        )

      case 3:
        return(
        <div className="backdrop">
          <Page3 onClickHelper={this._onClick}/>
        </div>
        )  

      case 4:
        return(
        <div className="backdrop">
          <Page4 onClickHelper={this._onClick}/>
        </div>
        )

      case 5:
        return(
        <div className="backdrop">
          <Page5 onClickHelper={this._onClick}/>
        </div>
        )
      case 6:
        return(
        <div className="backdrop">
          <Page6 onClickHelper={this._onClick}/>
        </div>
        )
      case 7:
        return(
        <div className="backdrop">
          <CustomSim onClickHelper={this._onClick}/>
        </div>
        )
    }
  }
}