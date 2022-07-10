import React from 'react';

import "../../../assets/scss/style.scss"
import "./Navbar.scss"

const apiLink = 'https://obvilion.ru/api/';

class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
        };
        this.update = this.update.bind(this);

        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');

        if (code) {
            fetch(apiLink + 'auth/discord?code=' + code, {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: "GET"
            }).then(async result => {
                const res = await result.json();
                if (!res.token) return;

                window.localStorage.setItem('token', res.token);
                this.update(true);
            })
        }

        this.update(false);
    }

    async update(skip) {
        if (!window.localStorage.getItem('token')) {
            return;
        }

        if (!skip) {
            let last_update = +window.localStorage.getItem('last_update');
            if (last_update + 10000 > new Date().getTime()) {
                return;
            }
        }

        fetch(apiLink + 'users/@me', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': window.localStorage.getItem('token'),
            },
            method: "GET"
        }).then(async result => {
            const res = await result.json();
            if (res.name) {
                window.localStorage.setItem('user', JSON.stringify(res));
                window.localStorage.setItem('last_update', new Date().getTime());
                
                this.setState({
                    user: res,
                })
            }
        })
    }

    render() {
        return(
            <ul className="NavPanel">
                <li className="main">
                    <a href="/" className="b-brand">
                        <div className="b-bg">
                            <img src={require('../../../assets/images/logo.png')} />
                        </div>
                        <span className="b-title">Obvilion Network</span>
                    </a>
                </li>

                <li style={{marginLeft: '2.6vw'}} className="left">
                    <a href="/donate">
                        <p className="text">Донат</p>
                    </a>
                </li>

                <li className="left">
                    <a href="/shop">
                        <p className="text">Магазин</p>
                    </a>
                </li>

                <li className="left">
                    <a href="https://discord.gg/cg82mjh">
                        <p className="text">Discord</p>
                    </a>
                </li>

                <li className="left">
                    <a href="/forum">
                        <p className="text">Форум</p>
                    </a>
                </li>

                <li className="left">
                    <a href="/rules">
                        <p className="text">Правила</p>
                    </a>
                </li>

                <li className="left">
                    <a>
                        <p style={{color: 'rgb(255, 255, 255)'}} className="text">Помощь</p>
                        <div className="arrow-2">
                            <div className="arrow-2-top"/>
                            <div className="arrow-2-bottom"/>
                        </div>
                    </a>
                    <ul className="submenu">
                        <li><a className="text" href="/banlist">Бан-лист</a></li>
                        <li><a className="text" href="/bugreport">Отправить баг-репорт</a></li>
                    </ul>
                </li>

                {
                    this.state.user ? <div>
                        {
                            this.state.user.group ?
                            this.state.user.group.permissions.indexOf('ADMIN_PANE') !== -1 ?
                                <li style={{ marginRight: '2vw', color: '#d0cfcf' }} className="right">
                                    <a href="/admin">
                                        <i className="feather icon-settings"/>
                                    </a>
                                </li> : null : null
                        }

                        <li style={{ marginRight: '2.86vw', marginTop: '0.62vw', color: '#d0cfcf', cursor: 'pointer' }} className="right">
                            <li onClick={() => {
                                window.localStorage.removeItem('token');
                                this.setState({
                                    user: null,
                                })
                            }}>
                                <i className="feather icon-log-out"/>
                            </li>
                        </li>

                        <li style={{ marginRight: '0.7vw' }} className="right">
                            <a href="/cabinet">
                                <p style={{ fontSize: '0.9vw', marginRight: '0.6vw', marginTop: '-0.1vw' }} className="text">{this.state.user.name}</p>
                                <div className="b-bg">
                                    <img style={{ borderRadius: '10vw' }} src={`${apiLink}users/${this.state.user.name}/avatar`} />
                                </div>
                            </a>
                        </li>
                    </div> :
                    <div>
                        <li style={{ marginRight: '2.86vw' }} className="right">
                            <a href="/auth/signup">
                                <p className="text">Регистрация</p>
                            </a>
                        </li>

                        <li className="right">
                            <a href="/auth/signin">
                                <p className="text">Войти</p>
                            </a>
                        </li>
                    </div>
                }

            </ul>
        )
    }
}

export default (Navbar);
