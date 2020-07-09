import React from 'react';
//import Virusim from '../sim/sketch.js'
import Rectangle from '../sim/rectangle.js';
import QuadTree from '../sim/quadtree.js'
import Point from '../sim/point.js'
import './home.css'

class Home extends React.Component {
    constructor(props) {
      super(props);

      let { width, height, number_nodes, number_infected_start,
            number_vaccinated_start, velocity_scale } = this.props

      this.state = {
          //params
          time: 0,
          timeStep: 1,
          width : width,
          height : height,
          number_nodes : number_nodes,
          number_infected_start : number_infected_start,
          number_vaccinated_start : number_vaccinated_start,
          dot_radius : 2,
          fps : 100,
          velocity_scale : velocity_scale,
          center_x: width/2,
          center_y: height/2,

          //bounds
          boundary: null,
          qt: null,
          points: [],
          
      }
    }

    componentWillMount() {
        let {center_x, center_y, width, height, dot_radius, velocity_scale, number_nodes, points,
             number_infected_start, number_vaccinated_start } = this.state
        let boundary = new Rectangle(center_x, center_y, width/2, height/2)

        let qt = new QuadTree(boundary, 10, dot_radius)

        for(let i=0; i<number_nodes; i++) {
            let p = new Point(Math.random()*width, Math.random()*height, dot_radius, (Math.random()-.5)*velocity_scale, (Math.random()-.5)*velocity_scale);
            points.push(p);
            qt.insert(p);
        }

        QuadTree.infectSetup(points, number_infected_start);
        QuadTree.vaccinateSetup(points, number_vaccinated_start);

        this.setState({
            boundary: boundary,
            qt: qt
        })
    }

    componentDidMount() {
        let { qt, timeStep, points, width, height, boundary, dot_radius, fps } = this.state
        let intervalInt = setInterval(
            function(){
                // this.setState({time: this.state.time+1})}.bind(this)
                // , 1000)
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

        this.setState({
            interval: intervalInt
        })
    }

    componentWillUnmount() {
        clearInterval(this.state.interval)
    }

    render() {
        let { points } = this.state
        return(
            <>
                <svg className="canvas" style={{height: this.state.height, width: this.state.width}}>
                    {points.map(point =>
                        <circle cx={point.x} cy={point.y} r={point.r} fill={point.color} />)}
                </svg>  
            </>
        )
    }
}

export default Home;

//border: solid; border-color: gray; border-width: 1px;

// wipe() {
//     d3.selectAll(".circle").remove();
// }

// circles(points) { 
//     d3.select(".canvas")
//     .selectAll(".circle")
//     .data(points)
//     .enter()
//     .append("circle")
//     .attr("cx", function(p) {return p.x})
//     .attr("cy", function(p) {return p.y})
//     .attr("r", function(p) {return p.r})
//     .attr("fill", function(p) {return p.color})
//     .attr("class", "circle")
// }