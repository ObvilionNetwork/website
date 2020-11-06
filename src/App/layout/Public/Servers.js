import React from 'react';

import "../../../assets/scss/style.scss"
import "./Servers.scss"

import Slider from 'react-animated-slider';
import './Slider.scss';

class Servers extends React.Component {
    render() {
        return(
            <div className="ServersPane">
                <Slider duration="900" infinite="true" onSlideChange={event => console.log(event.slideIndex)}>
                    <div>
                        <div className="name-container">
                            <h1>HiTech</h1>
                            <svg className="circle-chart" viewBox="0 0 33.83098862 33.83098862" width="3.5416vw" height="3.5416vw" xmlns="http://www.w3.org/2000/svg">
                                <circle className="circle-chart__background" stroke="#1f7abf" strokeWidth="0.156vw" fill="none" cx="16.91549431" cy="16.91549431" r="15.91549431"/>
                                <circle className="circle-chart__circle" stroke="#dfdfdf" strokeWidth="0.156vw" strokeDasharray="10 100" strokeLinecap="round" fill="none" cx="16.91549431" cy="16.91549431" r="15.91549431"/>
                                <text x="17" y="20" className="online-players">
                                    <tspan textAnchor="middle">
                                        4/45
                                    </tspan>
                                </text>
                            </svg>
                        </div>
                        <p className="description">
                            Это индустриальный сервер с большим кол-вом технических модов для кофортной игры, который открывает перед вами мир высоких технологий и громадных заводов! Теперь вам не придётся вручную собирать урожай, плавить руду или собирать дроп! Появилось множество вещей, упрощающих жизнь, помогающих в развитии. Тут вы найдёте ваши любимые моды, такие как: Industrial Craft 2, BuildCraft, Forestry, Applied Energistics 2, Thermal Expansion, а так же ещё много чего интересного. Присоединяйся! Иди в ногу со временем!
                        </p>
                        <h3 className="date-wipe">
                            Дата вайпа:
                            <div className="date">
                                01.11.2020
                            </div>
                        </h3>
                    </div>

                    <div>
                        <div className="name-container">
                            <h1>SkyBlock</h1>
                            <svg className="circle-chart" viewBox="0 0 33.83098862 33.83098862" width="3.5416vw" height="3.5416vw" xmlns="http://www.w3.org/2000/svg">
                                <circle className="circle-chart__background" stroke="#1f7abf" strokeWidth="0.156vw" fill="none" cx="16.91549431" cy="16.91549431" r="15.91549431"/>
                                <circle className="circle-chart__circle" stroke="#dfdfdf" strokeWidth="0.156vw" strokeDasharray="19 100" strokeLinecap="round" fill="none" cx="16.91549431" cy="16.91549431" r="15.91549431"/>
                                <text x="17" y="20" className="online-players">
                                    <tspan textAnchor="middle">
                                        8/45
                                    </tspan>
                                </text>
                            </svg>
                        </div>
                        <p className="description">
                            Это индустриальный сервер с большим кол-вом технических модов для кофортной игры, который открывает перед вами мир высоких технологий и громадных заводов! Теперь вам не придётся вручную собирать урожай, плавить руду или собирать дроп! Появилось множество вещей, упрощающих жизнь, помогающих в развитии. Тут вы найдёте ваши любимые моды, такие как: Industrial Craft 2, BuildCraft, Forestry, Applied Energistics 2, Thermal Expansion, а так же ещё много чего интересного. Присоединяйся! Иди в ногу со временем!
                        </p>
                        <h3 className="date-wipe">
                            Дата вайпа:
                            <div className="date">
                                01.11.2020
                            </div>
                        </h3>
                    </div>
                </Slider>
            </div>
        )
    }
}

export default (Servers);
