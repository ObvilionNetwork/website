import React from 'react';

import "../../../assets/scss/style.scss"
import "./Description.scss"

class Description extends React.Component {
    render() {
        return(
            <div className="Description">
                <div className="logo">
                    <img src={require('../../../assets/images/logo.png')} />
                </div>

                <h3 className="text">
                    Получи удовольствие от игры на лучших <br/>
                    серверах Obvilion Network.
                </h3>

                <h3 className="text2">
                    Целый комплекс серверов с отзывчивой администрацией и высоким качеством.
                </h3>

                <div className="buttons-container">
                    <a className="first" href="/">
                        <p className="button-download">Скачать лаунчер</p>

                        <div className="button-icon">
                            <img src={require('../../../assets/images/windows.png')} />
                        </div>
                        <p className="button-windows">Windows</p>
                    </a>

                    <a className="next" href="/">
                        <p className="button-download">Скачать лаунчер</p>
                        <div className="button-icon button-icon-linux">
                            <img src={require('../../../assets/images/linux.png')} />
                        </div>
                        <p className="button-windows">Linux, Mac</p>
                    </a>
                </div>

                <div className="to-servers">
                    <a onClick={() => document.getElementById('servers').scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    })}>К серверам</a>
                    <div className="arrow-8 servers-arrow" />
                </div>
            </div>
        )
    }
}

export default (Description);
