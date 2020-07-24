import React from 'react'
import Virusim from './virusim.js'
import './css/page.css'
import './css/sim.css'

class Page3 extends React.Component {

    render() {
        return (
            <div className="page">
                <p> In urban areas, it's even worse. </p>
                <div className="sim">
                    <Virusim width={400} height={300} number_nodes={300} number_infected_start={2}
                        number_vaccinated_start={0} velocity_scale={1.5} number_masked_start={0}/>
                </div>
            </div>
            
        )
    }
}

export default Page3;