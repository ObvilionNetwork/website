import React from 'react';
import "./Skin.scss"

class Skin extends React.Component {
    render() {
        const user = JSON.parse(window.localStorage.getItem('user'));

        return(
            <div>
                <style>
                    {"#skin-viewer *{ background-image: url('https://obvilion.ru/api/users/" + (user.name ? user.name : 'Admin') + "/skin'); } #skin-viewer .cape{ background-image: url('https://obvilionnetwork.ru/api/users/" + (user.name ? user.name : 'Admin') + "/cape'); }"}
                </style>

                <div id="skin-viewer" className="mc-skin-viewer-11x legacy legacy-cape spin" style={{marginLeft: '31vw', marginTop: '2vw'}}>
                    <div className="player">

                        <div className="head">
                            <div className="top"></div>
                            <div className="left"></div>
                            <div className="front"></div>
                            <div className="right"></div>
                            <div className="back"></div>
                            <div className="bottom"></div>
                            <div className="accessory">
                                <div className="top"></div>
                                <div className="left"></div>
                                <div className="front"></div>
                                <div className="right"></div>
                                <div className="back"></div>
                                <div className="bottom"></div>
                            </div>
                        </div>

                        <div className="body">
                            <div className="top"></div>
                            <div className="left"></div>
                            <div className="front"></div>
                            <div className="right"></div>
                            <div className="back"></div>
                            <div className="bottom"></div>
                            <div className="accessory">
                                <div className="top"></div>
                                <div className="left"></div>
                                <div className="front"></div>
                                <div className="right"></div>
                                <div className="back"></div>
                                <div className="bottom"></div>
                            </div>
                        </div>

                        <div className="left-arm">
                            <div className="top"></div>
                            <div className="left"></div>
                            <div className="front"></div>
                            <div className="right"></div>
                            <div className="back"></div>
                            <div className="bottom"></div>
                            <div className="accessory">
                                <div className="top"></div>
                                <div className="left"></div>
                                <div className="front"></div>
                                <div className="right"></div>
                                <div className="back"></div>
                                <div className="bottom"></div>
                            </div>
                        </div>

                        <div className="right-arm">
                            <div className="top"></div>
                            <div className="left"></div>
                            <div className="front"></div>
                            <div className="right"></div>
                            <div className="back"></div>
                            <div className="bottom"></div>
                            <div className="accessory">
                                <div className="top"></div>
                                <div className="left"></div>
                                <div className="front"></div>
                                <div className="right"></div>
                                <div className="back"></div>
                                <div className="bottom"></div>
                            </div>
                        </div>

                        <div className="left-leg">
                            <div className="top"></div>
                            <div className="left"></div>
                            <div className="front"></div>
                            <div className="right"></div>
                            <div className="back"></div>
                            <div className="bottom"></div>
                            <div className="accessory">
                                <div className="top"></div>
                                <div className="left"></div>
                                <div className="front"></div>
                                <div className="right"></div>
                                <div className="back"></div>
                                <div className="bottom"></div>
                            </div>
                        </div>

                        <div className="right-leg">
                            <div className="top"></div>
                            <div className="left"></div>
                            <div className="front"></div>
                            <div className="right"></div>
                            <div className="back"></div>
                            <div className="bottom"></div>
                            <div className="accessory">
                                <div className="top"></div>
                                <div className="left"></div>
                                <div className="front"></div>
                                <div className="right"></div>
                                <div className="back"></div>
                                <div className="bottom"></div>
                            </div>
                        </div>

                        <div className="cape">
                            <div className="top"></div>
                            <div className="left"></div>
                            <div className="front"></div>
                            <div className="right"></div>
                            <div className="back"></div>
                            <div className="bottom"></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default (Skin);
