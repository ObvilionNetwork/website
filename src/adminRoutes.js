import React from 'react';
import $ from 'jquery';

window.jQuery = $;
window.$ = $;
global.jQuery = $;

const AdminDashboard = React.lazy(() => import('./pages/Admin/Default'));
const APIDocs = React.lazy(() => import('./pages/Admin/Docs'));
const SystemUsage = React.lazy(() => import('./pages/Admin/SystemUsage'));
const TodoList = React.lazy(() => import('./pages/Admin/TodoList'));
const APITest = React.lazy(() => import('./pages/Admin/APITest'));

const routes = [
    { path: '/', exact: true, name: 'Статистика', component: AdminDashboard },
    { path: '/docs', exact: true, name: 'Документация', component: APIDocs },
    { path: '/systemusage', exact: true, name: 'Загрузка серверов', component: SystemUsage },
    { path: '/todo', exact: true, name: 'TODO лист', component: TodoList },
    { path: '/apitest', exact: true, name: 'Тестирование API', component: APITest },
];

export default routes;
