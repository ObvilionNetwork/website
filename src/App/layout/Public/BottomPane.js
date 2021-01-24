import React from 'react';

import "../../../assets/scss/style.scss"
import "./BottomPane.scss"

class BottomPane extends React.Component {
    render() {
        return(
            <div className="BottomPane">
                <div className="go">Начните играть уже сегодня!</div>
                <div className="comment">Погрузитесь в потрясающий и невероятный мир Obvilion Network</div>
                <div className="buttons-container">
                    <a className="first" href="/api/files/launchers/ObvilionNetworkLauncher.jar">
                        <p className="button-download">Скачать лаунчер</p>

                        <div className="button-icon">
                            <img src={require('../../../assets/images/windows.png')} />
                        </div>
                        <p className="button-windows">Windows</p>
                    </a>

                    <a className="next" href="/api/files/launchers/ObvilionNetworkLauncher.jar">
                        <p className="button-download">Скачать лаунчер</p>
                        <div className="button-icon button-icon-linux">
                            <img src={require('../../../assets/images/linux.png')} />
                        </div>
                        <p className="button-windows">Linux</p>
                    </a>
                </div>
            </div>
        )
    }
}

export default (BottomPane);
