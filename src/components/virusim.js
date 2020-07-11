import React from 'react';
import Rectangle from '../sim/rectangle.js';
import QuadTree from '../sim/quadtree.js'
import Point from '../sim/point.js'
import './virusim.css'

class Virusim extends React.Component {
    constructor(props) {
      super(props);

      let { width, height, number_nodes, number_infected_start,
            number_vaccinated_start, velocity_scale, number_masked_start } = this.props

      this.state = {
          //params
          time: 0,
          timeStep: 1,
          width : width,
          height : height,
          number_nodes : number_nodes,
          number_infected_start : number_infected_start,
          number_vaccinated_start : number_vaccinated_start,
          number_masked_start : number_masked_start,
          dot_radius : 2,
          fps : 100,
          velocity_scale : velocity_scale,
          center_x: width/2,
          center_y: height/2,

          //bounds
          boundary: null,
          qt: null,
          points: [],

          //other
          time: 0,
          
      }
    }

    componentWillMount() {
        let {center_x, center_y, width, height, dot_radius, velocity_scale, number_nodes, points,
             number_infected_start, number_vaccinated_start, number_masked_start } = this.state
        let boundary = new Rectangle(center_x, center_y, width/2, height/2)

        let qt = new QuadTree(boundary, 10, dot_radius)

        for(let i=0; i<number_nodes; i++) {
            let p = new Point(Math.random()*width, Math.random()*height, dot_radius, (Math.random()-.5)*velocity_scale, (Math.random()-.5)*velocity_scale);
            points.push(p);
            qt.insert(p);
        }

        QuadTree.infectSetup(points, number_infected_start);
        QuadTree.vaccinateSetup(points, number_vaccinated_start);
        console.log('setup: ' + number_masked_start)
        QuadTree.maskSetup(points, number_masked_start);

        this.setState({
            boundary: boundary,
            qt: qt
        })
    }

    componentDidMount() {
        let { qt, timeStep, points, width, height, boundary, dot_radius, fps, time } = this.state
        let intervalInt = setInterval(
            function() {
                qt.advance(timeStep, points, width, height)

                qt = new QuadTree(boundary, 10, dot_radius);
                for(let p of points) {
                    qt.insert(p);
                }

                this.setState({
                    qt: qt,
                    points: points
                })

            }.bind(this), 1000/fps)

        let timer = setInterval(
            function() {
                time++;
                this.setState({time: time})
            }.bind(this), 1000)

        this.setState({
            interval: intervalInt,
            timer: timer
        })
    }

    componentWillUnmount() {
        clearInterval(this.state.interval)
        clearInterval(this.state.timer)
    }

    render() {
        let { points } = this.state
        return(
            <>
                <svg className="canvas" style={{height: this.state.height, width: this.state.width}}>
                    {points.map(point =>
                        <circle cx={point.x} cy={point.y} r={point.r} fill={point.color} />
                    )}
                </svg>  
                <p> Time: {this.state.time} </p>
            </>
        )
    }
}

export default Virusim;