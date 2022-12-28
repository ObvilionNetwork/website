import React from 'react';
import "./Skin.scss"
import Config from "../../../config";

class Skin extends React.Component {
    top = document.getElementById('top-cape');
    left = document.getElementById('left-cape');
    front = document.getElementById('front-cape');
    right = document.getElementById('right-cape');
    back = document.getElementById('back-cape');
    bottom = document.getElementById('bottom-cape');

    constructor() {
        super();

        // let i = 0;
        // const frames = 43;
        //
        // setInterval(() => {
        //     const v = (-9.178 * i - 0.5729) + 'vw';
        //
        //     if (!this.top) {
        //         return
        //     }
        //
        //     this.top.style.backgroundPositionY = v
        //     this.left.style.backgroundPositionY = v
        //     this.front.style.backgroundPositionY = v
        //     this.right.style.backgroundPositionY = v
        //     this.back.style.backgroundPositionY = v
        //     this.bottom.style.backgroundPositionY = v
        //
        //     i++;
        //     if (i >= frames) i = 0;
        // }, 100);

        let d = false;

        document.addEventListener('mousedown', (event) => {
            d = true;
            document.getElementById('skin-viewer').className = document.getElementById('skin-viewer').className.replace(' spin', '');
        });

        document.addEventListener('mousemove', (event) => {
            if (d) {
                document.getElementById('skin-viewer').style.transform = 'rotateY(' + event.clientX / 400 * 360 + 'deg)'
            }
        });

        document.addEventListener('mouseup', (event) => {
            d = false;
            document.getElementById('skin-viewer').className += ' spin';
        });
    }

    componentDidMount() {
        this.top = document.getElementById('top-cape');
        this.left = document.getElementById('left-cape');
        this.front = document.getElementById('front-cape');
        this.right = document.getElementById('right-cape');
        this.back = document.getElementById('back-cape');
        this.bottom = document.getElementById('bottom-cape');
    }

    render() {
        const user = this.props.user;
        const animated = false;

        // https://mc.obvilion.ru/api/files/capes/animated-2.png
        return(
            <div>
                <style>
                    {"#skin-viewer *{ background-image: url('" + Config.api_link + "users/" + (user.name ? user.name : 'Admin') + "/skin'); } #skin-viewer .cape{ background-image: url('" + Config.api_link + "users/" + user.name + "/cape'); }"}
                </style>

                <div id="skin-viewer" className={'mc-skin-viewer-11x legacy spin ' + (animated ? 'animated-cape' : 'legacy-cape')} style={{marginLeft: '31vw', marginTop: '2vw'}}>
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

                        <div id='skin-viewer-c' className="cape">
                            <div id='top-cape' className="top"></div>
                            <div id='left-cape' className="left"></div>
                            <div id='front-cape' className="front"></div>
                            <div id='right-cape' className="right"></div>
                            <div id='back-cape' className="back"></div>
                            <div id='bottom-cape' className="bottom"></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default (Skin);
