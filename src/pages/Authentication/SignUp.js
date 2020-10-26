import React from 'react';
import {NavLink} from 'react-router-dom';

import './../../assets/scss/style.scss';
import Aux from "../../App/components/_Aux";
import Breadcrumb from "../../App/layout/AdminLayout/Breadcrumb";
import DEMO from "../../store/constant";

const inputStyle = {border: 'none', color: '#d1d6e0', background: '#1d2131'};

class SignUp1 extends React.Component {
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
                                <h3 className="mb-4">Регистрация</h3>
                                <div className="input-group mb-3">
                                    <input type="text" style={inputStyle} className="form-control" placeholder="Никнейм"/>
                                </div>
                                <div className="input-group mb-3">
                                    <input type="email" style={inputStyle} className="form-control" placeholder="Почта"/>
                                </div>
                                <div className="input-group mb-4">
                                    <input type="password" style={inputStyle} className="form-control" placeholder="Пароль"/>
                                </div>
                                <div className="form-group text-left">
                                    <div className="checkbox checkbox-fill d-inline">
                                        <input type="checkbox" name="checkbox-fill-2" id="checkbox-fill-2"/>
                                            <label htmlFor="checkbox-fill-2" className="cr">Отправлять мне <a href={DEMO.BLANK_LINK}> Новости</a> на почту.</label>
                                    </div>
                                </div>
                                <button className="btn btn-primary shadow-2 mb-4" style={{background: '#5a8cd6', border: 'none'}}>Регистрация</button>
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