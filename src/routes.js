import React from 'react';
import $ from 'jquery';

window.jQuery = $;
window.$ = $;
global.jQuery = $;

const SignUp1 = React.lazy(() => import('./pages/Authentication/SignUp'));
const Signin1 = React.lazy(() => import('./pages/Authentication/SignIn'));

const routes = [
    { path: '/auth/signup', exact: true, name: 'Signup', component: SignUp1 },
    { path: '/auth/signin', exact: true, name: 'Signin', component: Signin1 },
];

export default routes;