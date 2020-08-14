import React from 'react';

const SignUp1 = React.lazy(() => import('./pages/Authentication/SignUp/SignUp'));
const Signin1 = React.lazy(() => import('./pages/Authentication/SignIn/SignIn'));

const route = [
    { path: '/auth/signup', exact: true, name: 'Signup', component: SignUp1 },
    { path: '/auth/signin', exact: true, name: 'Signin', component: Signin1 }
];

export default route;