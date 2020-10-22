/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-has-content */
import React from 'react';
import "../../../assets/scss/style.scss"
import "./app.scss"



class HomePanel extends React.Component {
    
        render() {

            return(

                        <div className="HomePanel">
                            <div className="HomePanelL" />
                            
                            
                            <div className="HomePanelR" />
                            <div className="HomeContent">
                               Получи удовольствие от игры на
                                лучших серверах Obvilion Network.
                                <br />
                                <ul>
                                <li>  <a className="l" href="#">Скачать лаунчер  Windows</a></li>
                                <li> <a className="r" href="#">Скачать лаунчер  Windows</a></li>
                                </ul>
                              
                               
                            </div>
                            
                        </div>

            )
        }
    
}

export default (HomePanel);