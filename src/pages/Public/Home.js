import React, { Component } from 'react';

import Aux from "../../App/components/_Aux";
import Navbar from "../../App/layout/Public/Navbar";

import "../../assets/scss/style.scss"
import './Home.scss'
import Description from "../../App/layout/Public/Description";
import Servers from "../../App/layout/Public/Servers";
import WhyObvilion from "../../App/layout/Public/WhyObvilion";
import BottomPane from "../../App/layout/Public/BottomPane";
import Contacts from "../../App/layout/Public/Contacts";

class Home extends Component{
    render() {
        return (
            <Aux>
                <div className="first">
                    <div className="first-bg">
                        <img src={require('../../assets/images/bg.png')} />
                    </div>
                    <Navbar />
                    <Description  />
                </div>

                <div className="first-bg firstbg">
                    <img src={require('../../assets/images/bg6.png')} />
                </div>
                <div className="servers">
                    <a id="servers"/>
                    <Servers />
                </div>

                <div className="first-bg">
                    <img src={require('../../assets/images/bg3.png')} />
                </div>
                <div className="whyObvilion">
                    <WhyObvilion />
                </div>

                <div className="first-bg endbg">
                    <img src={require('../../assets/images/bg4.png')} />
                </div>
                <div className="end">
                    <BottomPane />
                    <Contacts />
                </div>
            </Aux>
         )
    }
}


export default Home;
