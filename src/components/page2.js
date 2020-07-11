import React from 'react'
import Virusim from './virusim.js'
import './css/page.css'
import './css/sim.css'

class Page2 extends React.Component {

    render() {
        return (
            <div className="page">
                <p> Here's our baseline of what the spread of Coronavirus looks like without any safety precautions. 
                    We have 100 people and 2 infected. </p>
                <div className="sim">
                    <Virusim width={400} height={300} number_nodes={100} number_infected_start={2}
                        number_vaccinated_start={0} velocity_scale={1.5} number_masked_start={0}/>
                </div>
                <p> It doesn't take long at all to infect almost the entire population. </p>
            </div>
            
        )
    }
}

export default Page2;