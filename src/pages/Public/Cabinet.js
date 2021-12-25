import React, { Component } from 'react';

import Aux from "../../App/components/_Aux";
import Navbar from "../../App/layout/Public/Navbar";

import "../../assets/scss/style.scss"
import './Cabinet.scss'
import Contacts from "../../App/layout/Public/Contacts";
import Skin from "../../App/layout/Public/Skin";
import Info from "../../App/layout/Public/Info";
import News from "../../App/layout/Public/News";
import LCButtons from "../../App/layout/Public/LCButtons";

class Cabinet extends Component {
    render() {

        return (
            <Aux>
                <div className="first">
                    <div className="first-bg">
                        <img src={require('../../assets/images/bg.jpg')} />
                    </div>
                    <Navbar />
                    <News />

                    <div className="title">
                        Личный кабинет
                    </div>

                    <Skin />
                    <Info />
                    <LCButtons />
                </div>

                <div className="first-bg endBg">
                    <img src={require('../../assets/images/bg5.png')} />
                </div>
                <div className="end">
                    <Contacts />
                </div>
            </Aux>
        )
    }
}


export default Cabinet;
