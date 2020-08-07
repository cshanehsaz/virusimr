import React from 'react'
import Virusim from './virusim.js'
import './css/page.css'
import './css/sim.css'

export default class CustomSim extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            temp: {},
            number_nodes: 100,
            number_infected_start: 2,
            number_vaccinated_start: 0,
            number_masked_start: 0,
            infectionDuration: 5,
            lethalityRate: 10,
            width: 300,
            height: 225,
            loading: false,
            fps: 42,
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
    }

    onChangeHandler(e) {
        if(!Number(e.target.value)) {
            if(!e.target.value==="") {return}
        }
        let temp = this.state
        temp[e.target.id] = Number(e.target.value);
        this.setState({temp: temp})
        console.log(e.target.id)
    }

    onSubmit(e) {
        let temp = this.state;
        this.setState({
            width: temp.width,
            height: temp.height,
            number_nodes: temp.number_nodes,
            number_infected_start: temp.number_infected_start,
            number_vaccinated_start: temp.number_vaccinated_start,
            number_masked_start: temp.number_masked_start,
            infectionDuration: temp.infectionDuration,
            lethalityRate: temp.lethalityRate,
            loading: true,
        })
    }

    componentDidUpdate() {
        if(this.state.loading) {this.setState({loading: false})}
    }

    render() {
        let { width, height, number_nodes, number_infected_start, number_vaccinated_start,
             number_masked_start, infectionDuration, lethalityRate, loading, fps } = this.state;

        if(loading){
            return(<p>loading...</p>)
        }

        return (
            <div className="page">
                <p>Your turn! Feel free to customize the simulation!</p>
                <div className="sim">
                    <Virusim 
                        width={width} height={height} number_nodes={number_nodes} 
                        number_infected_start={number_infected_start} 
                        number_vaccinated_start={number_vaccinated_start} 
                        velocity_scale={1.5} number_masked_start={number_masked_start}
                        infectionDuration={infectionDuration} lethalityRate={lethalityRate}
                    />
                </div>
                <div className="customsim-submit">
                        <button className="customsim-submit-button" onClick={this.onSubmit}>Run new sim</button>
                    </div>
                <div className="customsim-inputs">
                    <div className="customsim-inputs-col1">
                        <div className="customsim-inputs-individual"><label>Number of Balls: <input id="number_nodes" type="text" value={number_nodes} onChange={this.onChangeHandler} className='customsim-input-box'></input></label></div> 
                        <div className="customsim-inputs-individual"><label>Number Infected: <input id="number_infected_start" type="text" value={number_infected_start} onChange={this.onChangeHandler} className='customsim-input-box'></input></label></div>
                        <div className="customsim-inputs-individual"><label>Number Vaccinated: <input id="number_vaccinated_start" type="text" value={number_vaccinated_start} onChange={this.onChangeHandler} className='customsim-input-box'></input></label></div>
                    </div>
                    <div className="customsim-inputs-col2">
                        <div className="customsim-inputs-individual"><label>Number Wearing Masks: <input id="number_masked_start" type="text" value={number_masked_start} onChange={this.onChangeHandler} className='customsim-input-box'></input></label></div>
                        <div className="customsim-inputs-individual"><label>Infection Duration (seconds): <input id="infectionDuration" type="text" value={infectionDuration} onChange={this.onChangeHandler} className='customsim-input-box'></input></label></div>
                        <div className="customsim-inputs-individual"><label>Lethality Rate (0-100%): <input id="lethalityRate" type="text" value={lethalityRate} onChange={this.onChangeHandler} className='customsim-input-box'></input></label></div>
                    </div>
                    <button className="customsim-startover-button" onClick={this.props.onClickHelper}> Start Over </button>
                </div>
            </div>
            
        )
    }
}