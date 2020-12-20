import React from 'react';
import { createOrbitControls, WalkingAnimation, RotatingAnimation, RunningAnimation, FXAASkinViewer } from 'skinview3d';

import "./Skin.scss"

class Skin extends React.Component {
    componentDidMount() {
        let skinViewer = new FXAASkinViewer({
            canvas: this.refs.skinContainer,
            alpha: true,
        });
        skinViewer.renderer.setClearColor(0x5a76f3)

        skinViewer.loadSkin('https://obvilionnetwork.ru/api/users/get/Makc/skin');

        skinViewer.width = 300;
        skinViewer.height = 400;

    }

    render() {

        return(
            <div>
                <canvas id="skinContainer" ref="skinContainer" />
            </div>
        )
    }
}

export default (Skin);
