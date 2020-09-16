import React from 'react';
import {NavLink} from 'react-router-dom';

import './../../assets/scss/style.scss';
import Aux from "../../App/components/_Aux";
import Breadcrumb from "../../App/layout/AdminLayout/Breadcrumb";

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
                                    <i className="feather icon-unlock auth-icon"/>
                                </div>
                                <h3 className="mb-4">Авторизация</h3>
                                <div className="input-group mb-3">
                                    <input type="text" className="form-control" placeholder="Никнейм или почта"/>
                                </div>
                                <div className="input-group mb-4">
                                    <input type="password" className="form-control" placeholder="Пароль"/>
                                </div>
                                <div className="form-group text-left">
                                    <div className="checkbox checkbox-fill d-inline">
                                        <input type="checkbox" name="checkbox-fill-1" id="checkbox-fill-a1" />
                                            <label htmlFor="checkbox-fill-a1" className="cr"> Сохранять пароль</label>
                                    </div>
                                </div>
                                <button className="btn btn-primary shadow-2 mb-4">Авторизация</button>
                                <p className="mb-2 text-muted">Забыли пароль? <NavLink to="/auth/reset-password-1">Востановить</NavLink></p>
                                <p className="mb-0 text-muted">Нет аккаунта? <NavLink to="/auth/signup">Зарегеструйтесь</NavLink></p>
                            </div>
                        </div>
                    </div>
                </div>
            </Aux>
        );
    }
}

export default SignUp1;