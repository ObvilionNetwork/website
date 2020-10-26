import React from 'react';
import $ from 'jquery';

window.jQuery = $;
window.$ = $;
global.jQuery = $;

const SignUp = React.lazy(() => import('./pages/Authentication/SignUp'));
const Signin = React.lazy(() => import('./pages/Authentication/SignIn'));
const Home = React.lazy(() => import('./pages/Public/Home'));

const routes = [
    { path: '/auth/signup', exact: true, name: 'Signup', component: SignUp },
    { path: '/auth/signin', exact: true, name: 'Signin', component: Signin },
    { path: '/', exact: true, name: 'Главная', component: Home}
];

export default routes;