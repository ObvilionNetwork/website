/* eslint-disable jsx-a11y/anchor-has-content */
import React from 'react';
// eslint-disable-next-line no-unused-vars
import {Dropdown} from 'react-bootstrap';
import "../../../assets/scss/style.scss"
import "./app.scss"



class Navbar extends React.Component {
    
        render() {

            return(

                    <ul className="Navul">
                        <li className="left">
                            <a href="/" className="b-brand">
                                <div className="b-bg" />
                            <   span className="b-title">Obvilion Network</span>
                            </a>
                        </li>
                        <li className="left"><a href="/">Профиль</a></li>
                        <li className="left"><a href="/">Магазин</a></li>
                        <li className="left"><a href="/">Сервера</a></li>
                        <li className="left"><a href="/">Форум</a></li>
                        <li className="left"><a href="/">Помощь</a></li>
                        <li className="right"><a href="/admin" className="feather icon-settings"/></li>
                        <li className="right"></li>
                        
                        
                    </ul>
    
            )
        }
    
}

export default (Navbar);
