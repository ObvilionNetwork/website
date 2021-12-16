import React from 'react';

import "../../../assets/scss/style.scss"
import "./Servers.scss"

import Slider from 'react-animated-slider';
import './Slider.scss';

const apiLink = 'https://obvilion.ru/api/';

class Servers extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            servers: [],
            rounds: []
        };

        this.loadServers = this.loadServers.bind(this);
    }

    loadServers() {
        fetch(apiLink + 'servers', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: "GET"
        }).then(val => {
            val.json().then(result => {
                const minecraft_servers = [];
                for (const s of result.servers) {
                    if (s.type === 'Minecraft')
                        minecraft_servers.push(s);
                }

                this.setState({
                    servers: minecraft_servers,
                });

                const cl = this.state.servers.map(server => {
                    return <div className="round" />
                })
                if (cl[0]) {
                    cl[0] = <div className="round filled" />;
                }

                this.setState({
                    rounds: cl
                });
            })
        })
    }

    componentDidMount() {
        this.loadServers();
    }

    render() {
        return(
            <div className="ServersPane">
                <Slider autoplay="5000ms" duration="900" infinite="true" onSlideChange={event => {
                    this.setState({
                        rounds: this.state.rounds.map((value, index) => {
                            if (event.slideIndex === index) return <div className="round filled" />;
                            if (value === <div className="round filled" />) return <div className="round" />;
                            return <div className="round" />;
                        })
                    })
                }}>
                    { this.state.servers.map(server => {
                        return <div>
                            <div className="name-container">
                                <h1>{server.name}</h1>
                                <svg className="circle-chart" viewBox="0 0 33.83098862 33.83098862" width="3.5416vw" height="3.5416vw" xmlns="http://www.w3.org/2000/svg">
                                    <circle className="circle-chart__background" stroke="#1f7abf" strokeWidth="0.156vw" fill="none" cx="16.91549431" cy="16.91549431" r="15.91549431"/>
                                    <circle className="circle-chart__circle" stroke="#dfdfdf" strokeWidth="0.156vw" strokeDasharray={ server.players === -1 ? '0 100' : server.players / server.maxPlayers * 100 + " 100"} strokeLinecap="round" fill="none" cx="16.91549431" cy="16.91549431" r="15.91549431"/>
                                    <text x="17" y="20" className="online-players">
                                        <tspan textAnchor="middle">
                                            {server.players === -1 ? 'Выкл.' : server.online + '/' + server.maxOnline}
                                        </tspan>
                                    </text>
                                </svg>
                            </div>
                            <div className="server-logo">
                                <img src="https://obvilion.ru/api/files/HiTechSpawn.png" />
                            </div>
                            <p className="description">
                                {server.description}
                            </p>
                            <h3 className="date-wipe">
                                Дата вайпа:
                                <div className="date">
                                    {
                                        new Date(server.wipeDate).toISOString()
                                           .replace('-', '.')
                                           .split('T')[0]
                                           .replace('-', '.')
                                    }
                                </div>
                            </h3>
                        </div>
                    })}
                </Slider>

                <div className="rounds">
                    { this.state.rounds }
                </div>
            </div>
        )
    }
}

export default (Servers);
