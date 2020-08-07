import React from 'react'
import './css/page.css'

class Page1 extends React.Component {
    
    render() {
        return (
            <div className="page1">
                <p> Recently there's been a surprising amount of controversy around Coronavirus and the steps we can take to prevent its spread.
                    For months it has been drilled into our brains that social distancing, masks, and hand-washing, can slow the spread of Covid dramatically. 
                </p>
                <p> However, many seem to have trouble understanding how much of an impact these measures have.
                    Hearing facts is important, but maybe seeing them in action will open some eyes.
                </p>
                <p> Let's see if we can get a better view. </p>
                <button className="page1-button" onClick = {this.props.onClickHelper}> Next </button>

                <div style={{fontSize: '8pt', paddingTop: '0px'}}>
                    <p> Notes: 
                    </p>
                    <p> • This is <b>NOT</b> a scientifically accurate model. It is a simulation intended to help people
                        understand the facts more effectively.
                    </p>
                    <p> • These are live, randomized simulations and you will get varied results. I encourage you to watch 
                        multiple times!
                    </p>
                    <p style={{marginBottom: '0'}}> • Thanks to Harry Stevens at the Washington Post for inspiration for this visualization.
                        See the original article
                        <a href='https://www.washingtonpost.com/graphics/2020/world/corona-simulator/'
                           target="_blank" rel="noopener noreferrer" className="page1-link">here</a>
                    </p>
                </div>
            </div>
        )
    }
}

export default Page1;