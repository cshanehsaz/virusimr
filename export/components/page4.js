import React from 'react'
import Virusim from './virusim.js'
import './css/page.css'
import './css/sim.css'


class Page4 extends React.Component {

    render() {
        return (
            <div className="page">
                <p> But what if enough people get it - can't we get herd immunity? 
                    Let's say 20% of the population is immune (gray). </p>
                <div className="sim">
                    <Virusim width={400} height={300} number_nodes={100} number_infected_start={2}
                        number_vaccinated_start={20} velocity_scale={1.5} number_masked_start={0}/>
                </div>
                <p> Nope. You typically need 70-80% for herd immunity - it would take millions of deaths
                    to reach that point.
                </p>
            </div>
            
        )
    }
}

export default Page4;