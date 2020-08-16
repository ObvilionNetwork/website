import React from 'react';
import $ from 'jquery';

window.jQuery = $;
window.$ = $;
global.jQuery = $;

const SignUp = React.lazy(() => import('./pages/Authentication/SignUp'));
const Signin = React.lazy(() => import('./pages/Authentication/SignIn'));

const routes = [
    { path: '/auth/signup', exact: true, name: 'Signup', component: SignUp },
    { path: '/auth/signin', exact: true, name: 'Signin', component: Signin },
];

export default routes;