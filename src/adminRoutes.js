import React from 'react';
import $ from 'jquery';

window.jQuery = $;
window.$ = $;
global.jQuery = $;

const AdminDashboard = React.lazy(() => import('./pages/Admin/Default'));
const APIDocs = React.lazy(() => import('./pages/Admin/Docs'));

const routes = [
    { path: '/admin', exact: true, name: 'Статистика', component: AdminDashboard },
    { path: '/admin/docs', exact: true, name: 'Документация', component: APIDocs }
];

export default routes;