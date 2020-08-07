import React from 'react'
import Virusim from './virusim.js'
import './css/page.css'
import './css/sim.css'
import {ReactComponent as Logo} from '../assets/restart.svg'

class Page6 extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            rerun: false
        }
        
        this.rerunHelper = this.rerunHelper.bind(this)
    }

    rerunHelper = function() {
        this.setState({ rerun: true })
    }
    
    render() {
        if(this.state.rerun) {
            this.setState({ rerun: false })
            return (
                <div></div>
            )
        }

        return (
            <div className="page">
                <div className="pageText-wrapper">
                    <p> On top of social distancing, what if everyone wears a mask that decreases the transmission rate by 50%? </p>
                    <p> It's unbelievable. </p>
                </div>
                <div className="sim">
                    <Virusim width={300} height={225} number_nodes={100} number_infected_start={2}
                        number_vaccinated_start={0} velocity_scale={1} number_masked_start={100}
                        infectionDuration={8} lethalityRate={5}/>
                </div>
                <button className="page1-button" onClick={this.props.onClickHelper}> Next </button>
                <Logo className="rerun-logo" onClick={this.rerunHelper}/>
            </div>
            
        )
    }
}

export default Page6;