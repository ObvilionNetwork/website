import React, { Component } from 'react';

import Aux from "../../App/components/_Aux";
import Navbar from "../../App/layout/Public/Navbar";

import "../../assets/scss/style.scss"
import './Oops.scss'
import './Cabinet.scss'
import Contacts from "../../App/layout/Public/Contacts";
import Skin from "../../App/layout/Public/Skin";
import Info from "../../App/layout/Public/Info";
import News from "../../App/layout/Public/News";
import LCButtons from "../../App/layout/Public/LCButtons";

class Cabinet extends Component {
    componentDidMount() {
        document.title = "Личный кабинет | Obvilion Network";
    }

    render() {
        if (!window.localStorage.getItem('user') || !window.localStorage.getItem('token')) {
           return (
              <Aux>
                 <div className="first">
                    <div className="first-bg">
                       <img src={require('../../assets/images/bg.jpg')} alt='Фон' />
                    </div>

                    <Navbar />

                    <div className="title2" style={{ marginTop: '4vw', fontSize: '4.9vw', lineHeight: '5.2vw' }}>
                       Авторизируйтесь, <br/> прежде чем просматривать эту страницу
                    </div>

                    <div className="title2 title3">
                       Вы можете вернуться <br/>
                       на главную страницу или проверить <br/>
                       правильность своего запроса.
                    </div>
                 </div>

                 <div className="first-bg endBg">
                    <img src={require('../../assets/images/bg5.png')} alt='Фон' />
                 </div>
                 <div className="end">
                    <Contacts />
                 </div>
              </Aux>
           )
        }

        const user = JSON.parse(window.localStorage.getItem('user'))

        return (
            <Aux>
                <div className="first">
                    <div className="first-bg">
                        <img src={require('../../assets/images/bg.jpg')} alt='Фон' />
                    </div>
                    <Navbar />
                    <News />

                    <div className="title">
                        Личный кабинет
                    </div>

                    <Skin user={user} />
                    <Info user={user} />

                    <LCButtons />
                </div>

                <div className="first-bg endBg">
                    <img src={require('../../assets/images/bg5.png')} alt='Фон' />
                </div>
                <div className="end">
                    <Contacts />
                </div>
            </Aux>
        )
    }
}


export default Cabinet;
