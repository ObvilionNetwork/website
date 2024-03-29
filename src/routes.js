import React from 'react';
import $ from 'jquery';

window.jQuery = $;
window.$ = $;
global.jQuery = $;

const SignUp = React.lazy(() => import('./pages/Authentication/SignUp'));
const Signin = React.lazy(() => import('./pages/Authentication/SignIn'));

const Home = React.lazy(() => import('./pages/Public/Home'));
const Cabinet = React.lazy(() => import('./pages/Public/Cabinet'));
const Oops = React.lazy(() => import('./pages/Public/Oops'));
const Donate = React.lazy(() => import('./pages/Public/Donate'));
const Rules = React.lazy(() => import('./pages/Public/Rules'));
const NewYearEvent = React.lazy(() => import('./pages/Public/NewYearEvent'));
const Buy = React.lazy(() => import('./pages/Public/Buy'));
const Offer = React.lazy(() => import('./pages/Public/Offer'));

const routes = [
    { path: '/oops', exact: true, name: 'Упс... Произошла ошибка.', component: Oops },

    { path: '/auth/signup', exact: true, name: 'Регистрация', component: SignUp },
    { path: '/auth/signin', exact: true, name: 'Вход', component: Signin },
    { path: '/', exact: true, name: 'Главная', component: Home },
    { path: '/cabinet', exact: true, name: 'Личный Кабинет', component: Cabinet },
    { path: '/donate', exact: true, name: 'Донат услуги', component: Donate },
    { path: '/rules', exact: true, name: 'Правила проекта', component: Rules },
    { path: '/event', exact: true, name: 'Новогодний ивент', component: NewYearEvent },
    { path: '/buy', exact: true, name: 'Покупка донат услуги', component: Buy },
    { path: '/buy/offer', exact: true, name: 'Оферта', component: Offer },
];

export default routes;
