import React, { Component } from 'react';

import Aux from "../../App/components/_Aux";
import Navbar from "../../App/layout/Public/Navbar";
import Description from "../../App/layout/Public/Description";

import "../../assets/scss/style.scss"
import './Home.scss'

class Home extends Component{
    render() {
        return (
            <Aux>
                <div className="first-bg">
                    <img src={require('../../assets/images/bg.png')} />
                </div>
                <Navbar />
                <Description />
            </Aux>
         )
    }
}


export default Home;
