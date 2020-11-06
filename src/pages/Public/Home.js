import React, { Component } from 'react';

import Aux from "../../App/components/_Aux";
import Navbar from "../../App/layout/Public/Navbar";

import "../../assets/scss/style.scss"
import './Home.scss'
import Description from "../../App/layout/Public/Description";
import Servers from "../../App/layout/Public/Servers";

class Home extends Component{
    render() {
        return (
            <Aux>
                <div className="first">
                    <div className="first-bg">
                        <img src={require('../../assets/images/bg.png')} />
                    </div>
                    <Navbar />
                    <Description />
                </div>

                <div className="first-bg">
                    <img src={require('../../assets/images/bg2.png')} />
                </div>
                <div className="servers">
                    <a id="servers"/>
                    <Servers />
                </div>
            </Aux>
         )
    }
}


export default Home;
