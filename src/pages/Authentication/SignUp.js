import React from 'react';
import {NavLink} from 'react-router-dom';

import './../../assets/scss/style.scss';
import Aux from "../../App/components/_Aux";
import Breadcrumb from "../../App/layout/AdminLayout/Breadcrumb";
import DEMO from "../../store/constant";
import Config from "../../config";

const apiLink = Config.api_link;
const inputStyle = { border: '0', color: '#d1d6e0', background: '#1d2131' };

class SignUp1 extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            inputStylePass: {border: '0', color: '#d1d6e0', background: '#1d2131'},
            inputStyleEmail: {border: '0', color: '#d1d6e0', background: '#1d2131'},
            inputStyleLogin: {border: '0', color: '#d1d6e0', background: '#1d2131'},
            stateText: 'Регистрация',
        };
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangePass = this.handleChangePass.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.register = this.register.bind(this);
    }

    handleChangeName (e) {
        this.setState({
            name: e.target.value
        })
    }
    handleChangeEmail (e) {
        this.setState({
            email: e.target.value
        })
    }
    handleChangePass (e) {
        this.setState({
            password: e.target.value
        })
    }

    async register() {
        if (this.state.password.length < 6 || this.state.password.length > 30) {
            this.setState({
                inputStyleLogin: inputStyle,
                inputStyleEmail: inputStyle,
                inputStylePass: { borderWidth: '1px', borderColor: '#7591ff', color: '#d1d6e0', background: '#1d2131' },
                stateText: this.state.password.length < 6 ? 'Пароль слишком короткий' : 'Пароль слишком длинный'
            });
            return;
        }
        if (this.state.name.length < 3 || this.state.name.length > 16) {
            this.setState({
                inputStyleLogin: { borderWidth: '1px', borderColor: '#7591ff', color: '#d1d6e0', background: '#1d2131' },
                inputStyleEmail: inputStyle,
                inputStylePass: inputStyle,
                stateText: this.state.name.length < 3 ? 'Никнейм слишком короткий' : 'Никнейм слишком длинный'
            });
            return;
        }

        const re = /(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;
        if (!re.test(this.state.email)) {
            this.setState({
                inputStyleLogin: inputStyle,
                inputStyleEmail: { borderWidth: '1px', borderColor: '#7591ff', color: '#d1d6e0', background: '#1d2131' },
                inputStylePass: inputStyle,
                stateText: 'Неверный формат почты'
            });
            return;
        }

        fetch(apiLink + 'auth/register', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
            })
        }).then(async result => {
            const res = await result.json();
            if (res.token) {
                window.localStorage.setItem('token', res.token);
                window.location.assign('/');
            } else {
                if (res.message === 'User exists.') {
                    this.setState({
                        inputStyleLogin: { borderWidth: '1px', borderColor: '#7591ff', color: '#d1d6e0', background: '#1d2131' },
                        inputStyleEmail: inputStyle,
                        inputStylePass: inputStyle,
                        stateText: 'Никнейм занят'
                    });
                } else if (res.message === 'User with this email exists.') {
                    this.setState({
                        inputStyleLogin: inputStyle,
                        inputStyleEmail: { borderWidth: '1px', borderColor: '#7591ff', color: '#d1d6e0', background: '#1d2131' },
                        inputStylePass: inputStyle,
                        stateText: 'Почта уже использована'
                    });
                } else if (res.message === 'Invalid user name.') {
                    this.setState({
                        inputStyleLogin: inputStyle,
                        inputStyleEmail: { borderWidth: '1px', borderColor: '#7591ff', color: '#d1d6e0', background: '#1d2131' },
                        inputStylePass: inputStyle,
                        stateText: 'Никнейм содержит посторонние символы'
                    });
                }
            }
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
                                    <i className="feather icon-user-plus auth-icon"/>
                                </div>
                                <h3 className="mb-4">{this.state.stateText}</h3>
                                <div className="input-group mb-3">
                                    <input onChange={this.handleChangeName} type="text" style={this.state.inputStyleLogin} className="form-control" placeholder="Никнейм"/>
                                </div>
                                <div className="input-group mb-3">
                                    <input onChange={this.handleChangeEmail} type="email" style={this.state.inputStyleEmail} className="form-control" placeholder="Почта"/>
                                </div>
                                <div className="input-group mb-4">
                                    <input onChange={this.handleChangePass} type="password" style={this.state.inputStylePass} className="form-control" placeholder="Пароль"/>
                                </div>
                                <div className="form-group text-left">
                                    <div className="checkbox checkbox-fill d-inline">
                                        <input type="checkbox" name="checkbox-fill-2" id="checkbox-fill-2"/>
                                            <label htmlFor="checkbox-fill-2" className="cr">Отправлять мне <a href={DEMO.BLANK_LINK}> Новости</a> на почту.</label>
                                    </div>
                                </div>
                                <button onClick={this.register} className="btn btn-primary shadow-2 mb-4" style={{background: '#5a8cd6', border: 'none'}}>Регистрация</button>
                                <p className="mb-0" style={{color: '#a8b0b7', fontSize: '13px'}}>Уже есть аккаунт? <NavLink to="/auth/signin">Авторизируйтесь</NavLink></p>
                            </div>
                        </div>
                    </div>
                </div>
            </Aux>
        );
    }
}

export default SignUp1;
