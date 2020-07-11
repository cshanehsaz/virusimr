import React from 'react'
import Virusim from './virusim.js'
import './css/page.css'
import './css/sim.css'


class Page4 extends React.Component {

    render() {
        return (
            <div className="page">
                <p> Now, what happens if we social distance a bit? </p>
                <div className="sim">
                    <Virusim width={600} height={500} number_nodes={100} number_infected_start={2}
                        number_vaccinated_start={0} velocity_scale={1.5} number_masked_start={0}/>
                </div>
                <p> We see a big decrease. </p>
            </div>
            
        )
    }
}

export default Page4;