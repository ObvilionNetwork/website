import React from 'react';

import "../../../assets/scss/style.scss"
import "./BottomPane.scss"

class Contacts extends React.Component {
    render() {
        return(
            <div style={{marginTop: '2vw'}} className="BottomPane">
                <div className="contacts">
                    <p className="title">Наши контакты:</p>
                    <div className="firstContainer">
                        <a href="https://vk.com/obvilionmc">
                            <p>Группа <p className="vk">ВКонтакте</p></p>
                        </a>
                        <a href="https://discord.gg/cg82mjh">
                            <p>Сервер <p className="ds">Discord</p></p>
                        </a>
                        <a href="https://www.youtube.com/channel/UCi-c4YwKOQUJ7Ep6lFqCRtg">
                            <p>Канал <p className="yt">YouTube</p></p>
                        </a>
                    </div>
                    <div className="nextContainer">
                        <a href="">
                            <p>Мы на <p className="mm">MonitoringMinecraft</p></p>
                        </a>
                        <a href="">
                            <p>Мы на <p className="tc">TopCraft</p></p>
                        </a>
                        <a href="">
                            <p>Мы на <p className="mr">MinecraftRating</p></p>
                        </a>
                    </div>
                </div>
                <div className="owners">
                    <a className="fatonn" href="">
                        <p>Code by <p className="own">Fatonn</p></p>
                    </a>
                    <a className="qwirner" href="">
                        <p>Design by <p className="own">Qwirner</p></p>
                    </a>
                    <p className="copyright">ObvilionNetwork &#169; 2020</p>
                </div>
            </div>
        )
    }
}

export default (Contacts);
