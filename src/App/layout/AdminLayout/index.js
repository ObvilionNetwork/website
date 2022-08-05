import React, { Component, Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Fullscreen from "react-full-screen";
import windowSize from 'react-window-size';

import Navigation from './Navigation';
import NavBar from './NavBar';
import Breadcrumb from './Breadcrumb';
import Loader from "../Loader";
import routes from "../../../adminRoutes";
import Aux from "../../components/_Aux";
import * as actionTypes from "../../../store/actions";

import './app.scss';
import "../../../assets/scss/style.scss"
import '../../../pages/Public/Oops.scss'
import '../../../pages/Public/Cabinet.scss'
import Navbar from "../Public/Navbar";
import Contacts from "../Public/Contacts";

class AdminLayout extends Component {

    fullScreenExitHandler = () => {
        if (!document.fullscreenElement && !document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement) {
            this.props.onFullScreenExit();
        }
    };

    componentDidMount() {
        if (this.props.windowWidth > 992 && this.props.windowWidth <= 1024 && this.props.layout !== 'horizontal') {
            this.props.onComponentDidMount();
        }
    }

    mobileOutClickHandler() {
        if (this.props.windowWidth < 992 && this.props.collapseMenu) {
            this.props.onComponentDidMount();
        }
    }

    render() {
        if (!window.localStorage.getItem('user')) {
            return (
               <Aux>
                   <div className="first">
                       <div className="first-bg">
                           <img src={require('../../../assets/images/bg.jpg')} />
                       </div>

                       <Navbar />

                       <div className="title2" style={{ marginTop: '4vw', fontSize: '4.9vw', lineHeight: '5.2vw' }}>
                           Авторизируйтесь, <br/> прежде чем просматривать эту страницу
                       </div>

                       <div className="title2 title3">
                           Вы можете вернуться <br/>
                           на главную страницу или проверить <br/>
                           правильность своего запроса.
                       </div>
                   </div>

                   <div className="first-bg endBg">
                       <img src={require('../../../assets/images/bg5.png')} />
                   </div>
                   <div className="end">
                       <Contacts />
                   </div>
               </Aux>
            )
        }

        /* full screen exit call */
        document.addEventListener('fullscreenchange', this.fullScreenExitHandler);
        document.addEventListener('webkitfullscreenchange', this.fullScreenExitHandler);
        document.addEventListener('mozfullscreenchange', this.fullScreenExitHandler);
        document.addEventListener('MSFullscreenChange', this.fullScreenExitHandler);

        const menu = routes.map((route, index) => {
            return (route.component) ? (
                <Route
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    name={route.name}
                    render={props => (
                        <route.component {...props} />
                    )} />
            ) : (null);
        });

        let nav;
        let bar;

        if(this.props.location.pathname.startsWith('/admin')) { // Добавляет админ меню
            nav = <Navigation />;
            bar = <NavBar />;
        }

        return (
            <Aux>
                <Fullscreen enabled={this.props.isFullScreen}>
                    {nav}
                    {bar}

                    <div className="pcoded-main-container" onClick={() => this.mobileOutClickHandler}>
                        <div className="pcoded-wrapper">
                            <div className="pcoded-content">
                                <div className="pcoded-inner-content">
                                    <Breadcrumb />
                                    <div className="main-body">
                                        <div className="page-wrapper">
                                            <Suspense fallback={<Loader/>}>
                                                <Switch>
                                                    {menu}
                                                    <Redirect from="/" to={this.props.defaultPath} />
                                                </Switch>
                                            </Suspense>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Fullscreen>
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        defaultPath: state.defaultPath,
        isFullScreen: state.isFullScreen,
        collapseMenu: state.collapseMenu,
        configBlock: state.configBlock,
        layout: state.layout
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onFullScreenExit: () => dispatch({type: actionTypes.FULL_SCREEN_EXIT}),
        onComponentDidMount: () => dispatch({type: actionTypes.COLLAPSE_MENU})
    }
};

export default connect(mapStateToProps, mapDispatchToProps) (windowSize(AdminLayout));