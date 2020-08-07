import React from 'react'
import {ReactComponent as CoverIllustration} from '../assets/thumbnail4.svg'
import './css/page.css'

class Page0 extends React.Component {
    
    render() {
        return (
            <div className="page0">
                <CoverIllustration style={{height: '100vh'}}/>
                <button className="beginButton" onClick = {this.props.onClickHelper}> {'Begin'} </button>
            </div>
        )
    }
}

export default Page0;