import React from 'react';
import Virusim from '../sim/sketch.js'
import Rectangle from '../sim/rectangle.js';
import QuadTree from '../sim/quadtree.js'
import Point from '../sim/point.js'

class Home extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          //params
          time: 0,
          timeStep: 1,
          width : 400,
          height : 400,
          number_nodes : 100,
          number_infected_start : 1,
          number_vaccinated_start : 0,
          dot_radius : 4,
          fps : 120,
          velocity_scale : .5,
          center_x: 400/2,
          center_y: 400/2,

          //bounds
          boundary: null,
          qt: null,
          points: [],
          
      }
    }

    componentWillMount() {
        let {center_x, center_y, width, height, dot_radius, velocity_scale, number_nodes, } = this.state
        let boundary = new Rectangle(center_x, center_y, width/2, height/2)
        let qt = new QuadTree(this.state.boundary, 8)

        for(let i=0; i<number_nodes; i++) {
            let p = new Point(Math.random()*width, Math.random()*height, dot_radius, (Math.random()-.5)*velocity_scale, (Math.random()-.5)*velocity_scale);
            points.push(p);
            qt.insert(p);
        }

        this.setState({
            boundary: boundary,
            qt: qt
        })
    }

    componentDidMount() {
        let intervalInt = setInterval(function(){this.setState({time: this.state.time+1})}.bind(this), 1000)
        this.setState({interval: intervalInt})
    }

    componentDidUpdate() {
        console.log(this.state.boundary)
    }

    componentWillUnmount() {
        clearInterval(this.state.interval)
    }

    testFunc() {
        this.setState({time: 1})
    }

    render() {
      return(
        <p>{this.state.time}</p>
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