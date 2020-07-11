import React from 'react'
import './css/page.css'

class Page1 extends React.Component {
    
    render() {
        return (
            <div className="page1">
                <p> Recently I've noticed a surprising amount of controversy around Coronavirus and the steps we can take to prevent it.
                    For months it's been drilled into our brains that social distancing, masks, hand-washing, etc. can slow the spread of Covid dramatically, 
                    yet many seem to ignore these practices.
                    Hearing their effectiveness is one thing, but seeing them in action hopefully opens some eyes.
                </p>
                <p> Disclaimer: This is <b>NOT</b> a scientifically accurate model. It's just a simulation that hopefully helps people
                    understand the facts more effectively. Also, this is a live, randomized simulation that will turn out
                    differently each run. You may get strange results, so I encourage you to watch 
                    multiple times!
                </p>
                <p> Let's see if we can get a better view. </p>
            </div>
        )
    }
}

export default Page1;