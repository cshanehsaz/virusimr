import React from 'react'
import './css/page.css'

export default class Counter extends React.Component {
    
    render() {
        let { healthy, inf, rec, dead, vac, time } = this.props
        return (
            <div className="container">
                <div className="counter">
                    <div style={{gridColumn: 1}}><span style={{color: '#0AD48B'}}>■</span> Healthy: {healthy} </div>
                    <div style={{gridColumn: 2}}><span style={{color: '#C70039'}}>■</span> Infected: {inf} </div>
                    <div style={{gridColumn: 3}}><span style={{color: '#004785'}}>■</span> Recovered: {rec} </div>
                    <div style={{gridColumn: 4}}><span style={{color: '#FF9933'}}>■</span> Dead: {dead} </div>
                    <div style={{gridColumn: 5}}><span style={{color: '#C0C0C0'}}>■</span> Vaccinated: {vac} </div>                
                    <div style={{gridColumn: 3, gridRow: 2, paddingTop: '10px'}}>Time: {Math.floor(time)}</div>
                </div>
            </div>

        )
    }
}