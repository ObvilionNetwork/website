import React from 'react';

import "../../../assets/scss/style.scss"
import "./Navbar.scss"

class Navbar extends React.Component {
    render() {
        return(
            <ul className="NavPanel">
                <li className="main">
                    <a href="/" className="b-brand">
                        <div className="b-bg">
                            <img src={require('../../../assets/images/logo.png')} />
                        </div>
                        <span className="b-title">Obvilion Network</span>
                    </a>
                </li>

                <li style={{marginLeft: '2.6vw'}} className="left">
                    <a href="/">
                        <p className="text">Донат</p>
                    </a>
                </li>

                <li className="left">
                    <a href="/">
                        <p className="text">Магазин</p>
                    </a>
                </li>

                <li className="left">
                    <a href="/">
                        <p className="text">Форум</p>
                    </a>
                </li>

                <li className="left">
                    <a>
                        <p className="text">Помощь</p>
                        <div className="arrow-2">
                            <div className="arrow-2-top"/>
                            <div className="arrow-2-bottom"/>
                        </div>
                    </a>
                    <ul className="submenu">
                        <li><a className="text" href="#">Личный кабинет</a></li>
                        <li><a className="text" href="#">Выйти из аккаунта</a></li>
                    </ul>
                </li>

                <li style={{ marginRight: '2.86vw' }} className="right">
                    <a href="/auth/signup">
                        <p className="text">Регистрация</p>
                    </a>
                </li>

                <li className="right">
                    <a href="/auth/signin">
                        <p className="text">Войти</p>
                    </a>
                </li>
            </ul>
        )
    }
}

export default (Navbar);
