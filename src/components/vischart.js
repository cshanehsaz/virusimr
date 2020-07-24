import React from 'react'
import {XYPlot, XAxis, YAxis, HorizontalGridLines, AreaSeries} from 'react-vis';

export default class AreaChart extends React.PureComponent {
    constructor(props) {
      super(props);
      let { healthy, inf, rec, dead, vac, time } = this.props;


      this.state = {
        chealthy: [{x: 0, y: healthy+inf, y0: inf}, {x: .5, y: healthy+inf, y0: inf}],
        cinf: [{x: 0, y: inf, y0: 0}, {x: .5, y: inf, y0: 0}],
        crec: [{x: 0, y: rec+healthy+inf, y0: healthy+inf}, {x: .5, y: rec+healthy+inf, y0: healthy+inf}],
        cdead: [{x: 0, y: dead+healthy+inf+rec, y0: healthy+inf+rec}, {x: .5, y: dead+healthy+inf+rec, y0: healthy+inf+rec}],
        cvac: [{x: 0, y: vac+healthy+inf+rec+dead, y0: healthy+inf+rec+dead}, {x: .5, y: vac+healthy+inf+rec+dead, y0: healthy+inf+rec+dead}],
        time: 0
      }

    }

    componentDidUpdate() {
        if(this.props.time === this.state.time) {return}
        let { healthy, inf, rec, dead, vac, time } = this.props;
        let { chealthy, cinf, crec, cdead, cvac } = this.state;

        chealthy.push({x: time, y: healthy+inf, y0: inf})
        cinf.push({x: time, y: inf, y0: 0})
        crec.push({x: time, y: rec+healthy+inf, y0: healthy+inf})
        cdead.push({x: time, y: dead+healthy+inf+rec, y0: healthy+inf+rec})
        cvac.push({x: time, y: vac+healthy+inf+rec+dead, y0: healthy+inf+rec+dead})
        
        this.setState({
            chealthy: chealthy,
            cinf: cinf,
            crec: crec,
            cdead: cdead,
            cvac: cvac,
            time: time
        })
    }

    render() {

      let { chealthy, cinf, crec, cdead, cvac, time } = this.state;

      return (
        <XYPlot
        width={400}
        height={300}>
        <HorizontalGridLines />
        <AreaSeries
            data={chealthy}
            curve={'curveNatural'}
            opacity={.4}
            color={"#0AD48B"}
        />
        <AreaSeries
            data={cinf}
            curve={'curveNatural'}
            opacity={.4}
            color={"#C70039"}
        />
        <AreaSeries
            data={crec}
            curve={'curveNatural'}
            opacity={.4}
            color={"#004785"}
        />
        <AreaSeries
            data={cdead}
            curve={'curveNatural'}
            opacity={.4}    
            color={"#FF9933"}
        />
        <AreaSeries
            data={cvac}
            curve={'curveNatural'}
            opacity={.4}   
            color={"#C0C0C0"} 
        />
        <XAxis 
            tickTotal={Math.min(5, time)}
            style={{
                text: {fontSize: '10pt'}}
            }
        />
        <YAxis 
            tickTotal={4}
            style={{
                text: {fontSize: '10pt'}}
            }
        />
        </XYPlot>
      );
    }
  }