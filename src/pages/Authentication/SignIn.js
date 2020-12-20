import React from 'react';
import {NavLink} from 'react-router-dom';

import './../../assets/scss/style.scss';
import '../../assets/scss/buttons.css';
import Aux from "../../App/components/_Aux";
import Breadcrumb from "../../App/layout/AdminLayout/Breadcrumb";
import discordLogo from '../../assets/images/discord.png';

const apiLink = 'https://obvilionnetwork.ru/api/';

class SignUp1 extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            name: '',
            password: '',
            inputStylePass: {border: '0', color: '#d1d6e0', background: '#1d2131'},
            inputStyleLogin: {border: '0', color: '#d1d6e0', background: '#1d2131'},
            stateText: 'Авторизация',
        };
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangePass = this.handleChangePass.bind(this);
        this.login = this.login.bind(this);
    }

    async login() {
        fetch(apiLink + 'auth/login', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({
                name: this.state.name,
                password: this.state.password,
            })
        })
            .then(value => {
                value.json().then(result => {
                    if (result.token) {
                        window.localStorage.setItem('token', result.token);
                        window.location.assign('/');
                    } else {
                        if (result.message === 'User not found.') {
                            this.setState({
                                inputStyleLogin: { borderWidth: '1px', borderColor: '#7591ff', color: '#d1d6e0', background: '#1d2131' },
                                inputStylePass: { border: '0', color: '#d1d6e0', background: '#1d2131' },
                                stateText: 'Неверный логин'
                            });
                        } else if (result.message === 'Invalid login data.') {
                            this.setState({
                                inputStylePass: { borderWidth: '1px', borderColor: '#7591ff', color: '#d1d6e0', background: '#1d2131' },
                                inputStyleLogin: { border: '0', color: '#d1d6e0', background: '#1d2131' },
                                stateText: 'Неверный пароль'
                            });
                        } else if (result.message === 'Too many requests. Please wait 1 minute.') {
                            this.setState({
                                inputStylePass: { borderWidth: '1px', borderColor: '#7591ff', color: '#d1d6e0', background: '#1d2131' },
                                inputStyleLogin: { border: '0', color: '#d1d6e0', background: '#1d2131' },
                                stateText: 'Слишком много попыток ввода. Подождите 1 минуту'
                            });
                        } else {
                            this.setState({
                                inputStylePass: { borderWidth: '1px', borderColor: '#7591ff', color: '#d1d6e0', background: '#1d2131' },
                                inputStyleLogin: { borderWidth: '1px', borderColor: '#7591ff', color: '#d1d6e0', background: '#1d2131' },
                                stateText: 'Ведутся тех. работы'
                            });
                        }
                    }
                }).catch(reason => {
                    this.setState({
                        inputStylePass: { borderWidth: '1px', borderColor: '#7591ff', color: '#d1d6e0', background: '#1d2131' },
                        inputStyleLogin: { borderWidth: '1px', borderColor: '#7591ff', color: '#d1d6e0', background: '#1d2131' },
                        stateText: 'Ведутся тех. работы'
                    });
                })
            })
            .catch((e) => {
                this.setState({
                    inputStylePass: { borderWidth: '1px', borderColor: '#7591ff', color: '#d1d6e0', background: '#1d2131' },
                    inputStyleLogin: { borderWidth: '1px', borderColor: '#7591ff', color: '#d1d6e0', background: '#1d2131' },
                    stateText: 'Ведутся тех. работы'
                });
            });
    }

    handleChangeName (e) {
        this.setState({
            name: e.target.value
        })
    }
    handleChangePass (e) {
        this.setState({
            password: e.target.value
        })
    }

    render () {
        return(
            <Aux>
                <Breadcrumb/>
                <div className="auth-wrapper">
                    <div className="auth-content">
                        <div className="auth-bg">
                            <span className="r"/>
                            <span className="r s"/>
                            <span className="r s"/>
                            <span className="r"/>
                        </div>
                        <div className="card">
                            <div className="card-body text-center">
                                <div className="mb-4">
                                    <i className="feather icon-unlock auth-icon"/>
                                </div>
                                <h3 className="mb-4">{this.state.stateText}</h3>
                                <div className="input-group mb-3">
                                    <input onChange={this.handleChangeName} type="text" style={this.state.inputStyleLogin} className="form-control" placeholder="Никнейм или почта"/>
                                </div>
                                <div className="input-group mb-4">
                                    <input onChange={this.handleChangePass} type="password" style={this.state.inputStylePass} className="form-control" placeholder="Пароль"/>
                                </div>
                                <div className="form-group text-left">
                                    <div className="checkbox checkbox-fill d-inline">
                                        <input type="checkbox" name="checkbox-fill-1" id="checkbox-fill-a1" />
                                            <label htmlFor="checkbox-fill-a1" className="cr">Оставаться в аккаунте</label>
                                    </div>
                                </div>
                                    <div className="d-inline">
                                        <button onClick={this.login} className="btn btn-primary shadow-2 mb-4" style={{background: '#5a8cd6', border: 'none'}}>Войти в аккаунт</button>

                                        <label style={{color: '#b2bdc8', verticalAlign: '10px', marginRight: '3px'}}>или</label>

                                        <button onClick={() => {
                                            window.location.assign('https://discord.com/api/oauth2/authorize?client_id=657878741703327754&redirect_uri=https%3A%2F%2Fobvilionnetwork.ru&response_type=code&scope=identify');
                                        }} className='button-discord'>
                                            <img src={discordLogo} style={{ width: '40px', marginBottom: '22px' }} />
                                        </button>
                                    </div>
                                <p className="mb-2" style={{color: '#a8b0b7', fontSize: '13px'}}>Забыли пароль? <NavLink to="/auth/resetpassword">Востановить</NavLink></p>
                                <p className="mb-0" style={{color: '#a8b0b7', fontSize: '13px'}}>Нет аккаунта? <NavLink to="/auth/signup">Зарегестрироваться</NavLink></p>
                            </div>
                        </div>
                    </div>
                </div>
            </Aux>
        );
    }
}

export default SignUp1;