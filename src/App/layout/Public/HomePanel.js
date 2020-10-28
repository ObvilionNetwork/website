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
                        <li className="left"><a href="/">Скачать для <br/>Windows</a></li>
                        <li className="right"><a href="/">Скачать для <br/>Linux</a></li>
                    </ul>
            
                </div>
            </div>
        )
    }
}

export default (HomePanel);
