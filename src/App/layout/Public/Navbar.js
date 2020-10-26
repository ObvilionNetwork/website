import React from 'react';

import "../../../assets/scss/style.scss"
import "./app.scss"



class Navbar extends React.Component {
    render() {
        return(
            <ul className="NavPanel">
                <li className="main">
                    <a href="/" className="b-brand">
                        <div className="b-bg" />
                    <span className="b-title">Obvilion Network</span>
                    </a>
                </li>

                <li style={{marginLeft: '4%'}} className="left">
                    <a href="/">
                        <p className="text">Профиль</p>
                        <div className="arrow-2">
                            <div className="arrow-2-top"/>
                            <div className="arrow-2-bottom"/>
                        </div>
                    </a>
                </li>

                <li className="left">
                    <a href="/">
                        <p className="text">Магазин</p>
                    </a>
                </li>

                <li className="left">
                    <a href="/">
                        <p className="text">Сервера</p>
                    </a>
                </li>

                <li className="left">
                    <a href="/">
                        <p className="text">Форум</p>
                    </a>
                </li>

                <li className="left">
                    <a href="/">
                        <p className="text">Помощь</p>
                    </a>
                </li>

                <li className="right"><a href="/admin" className="feather icon-settings"/></li>
            </ul>
        )
    }
}

export default (Navbar);
