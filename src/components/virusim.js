import React from 'react';
import Rectangle from '../sim/rectangle.js';
import QuadTree from '../sim/quadtree.js'
import Point from '../sim/point.js'
import Counter from './counter.js'
import VisChart from './vischart.js'
import './css/virusim.css'

export default class Virusim extends React.Component {
    constructor(props) {
      super(props);

      let { width, height, number_nodes, number_infected_start,
            number_vaccinated_start, velocity_scale, number_masked_start,
            infectionDuration, lethalityRate } = this.props

      this.state = {
          //params
          timeStep: 1,
          width : width,
          height : height,
          number_nodes : number_nodes,
          number_infected_start : number_infected_start,
          number_vaccinated_start : number_vaccinated_start,
          number_masked_start : number_masked_start,
          dot_radius : 2,
          fps : 42,
          velocity_scale : velocity_scale,
          center_x: width/2,
          center_y: height/2,
          infectionDuration: infectionDuration,
          lethalityRate: lethalityRate,

          //bounds
          boundary: null,
          qt: null,
          points: [],

          //other
          time: 0,
          publicTime: 0,
          dataStep: 2500,
          
      }
    }

    componentWillMount() {
        let {center_x, center_y, width, height, dot_radius, velocity_scale, number_nodes, points,
             number_infected_start, number_vaccinated_start, number_masked_start,
             infectionDuration, lethalityRate } = this.state

        let boundary = new Rectangle(center_x, center_y, width/2, height/2)

        let qt = new QuadTree(boundary, 6, dot_radius, infectionDuration, lethalityRate)

        for(let i=0; i<number_nodes; i++) {
            let p = new Point(Math.random()*width, Math.random()*height, dot_radius, (Math.random()-.5)*velocity_scale, (Math.random()-.5)*velocity_scale);
            points.push(p);
            qt.insert(p);
        }

        QuadTree.infectSetup(points, number_infected_start);
        QuadTree.vaccinateSetup(points, number_vaccinated_start);
        QuadTree.maskSetup(points, number_masked_start);
        qt.countPoints(points)

        this.setState({
            boundary: boundary,
            qt: qt
        })
    }

    componentDidMount() {
        let { qt, timeStep, points, width, height, boundary, dot_radius, fps, time, publicTime, dataStep,
              infectionDuration, lethalityRate } = this.state
        let intervalInt = setInterval(
            function() {
                qt.advance(timeStep, points, width, height, fps)

                qt = new QuadTree(boundary, 6, dot_radius, infectionDuration, lethalityRate);
                for(let p of points) {
                    qt.insert(p);
                }

                qt.countPoints(points)

                this.setState({
                    qt: qt,
                    points: points
                })

            }.bind(this), 1000/fps)

        let timer = setInterval(
            function() {
                time = time+dataStep/1000;
                this.setState({time: time})
            }.bind(this), dataStep)

        let publicTimer = setInterval(
            function() {
                publicTime = publicTime + 1
                this.setState({publicTime: publicTime})
            }.bind(this), 1000)

        this.setState({
            interval: intervalInt,
            timer: timer,
            publicTimer: publicTimer
        })
    }

    componentDidUpdate() {
        let {qt} = this.state;
        if (qt.count_inf <= 0) {
            clearInterval(this.state.interval)
            clearInterval(this.state.timer)
            clearInterval(this.state.publicTimer)
        }
    }

    componentWillUnmount() {
        clearInterval(this.state.interval)
        clearInterval(this.state.timer)
        clearInterval(this.state.publicTimer)
    }

    render() {
        let { points, qt, time, publicTime } = this.state
        return(
            <>
                <div className="grid">
                    <svg className="canvas" style={{height: this.state.height, width: this.state.width}}>
                        {points.map(point =>
                            <circle cx={point.x} cy={point.y} r={point.r} fill={point.color} />
                        )}
                    </svg> 
                    <VisChart className="chart"
                        healthy={qt.count_not} inf={qt.count_inf} rec={qt.count_rec} 
                        dead={qt.count_dead} vac={qt.count_vac}
                        time={time}
                    /> 
                </div>
                <Counter className="counter"
                    healthy={qt.count_not} inf={qt.count_inf} rec={qt.count_rec} 
                    dead={qt.count_dead} vac={qt.count_vac}
                    time={publicTime} 
                />
            </>
        )
    }
}