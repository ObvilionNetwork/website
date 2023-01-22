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
const Clients = React.lazy(() => import('./pages/Admin/Clients'));
const CreateClient = React.lazy(() => import('./pages/Admin/CreateClient'));
const EditClient = React.lazy(() => import('./pages/Admin/EditClient'));
const Mods = React.lazy(() => import('./pages/Admin/Mods'));
const CreateMod = React.lazy(() => import('./pages/Admin/CreateMod'));
const EditMod = React.lazy(() => import('./pages/Admin/EditMod'));

const routes = [
    { path: '/admin/', exact: true, name: 'Статистика', component: AdminDashboard },
    { path: '/admin/docs', exact: true, name: 'Документация', component: APIDocs },
    { path: '/admin/systemusage', exact: true, name: 'Загрузка серверов', component: SystemUsage },
    { path: '/admin/todo', exact: true, name: 'TODO лист', component: TodoList },
    { path: '/admin/apitest', exact: true, name: 'Тестирование API', component: APITest },
    { path: '/admin/clients', exact: true, name: 'Управление сборками', component: Clients },
    { path: '/admin/clients/create', exact: true, name: 'Создание сборки', component: CreateClient },
    { path: '/admin/clients/edit', exact: true, name: 'Редактирование сборки', component: EditClient },
    { path: '/admin/clients/mods', exact: true, name: 'Управление модами', component: Mods },
    { path: '/admin/clients/mods/upload', exact: true, name: 'Загрузка мода', component: CreateMod },
    { path: '/admin/clients/mods/edit', exact: true, name: 'Редактирование мода', component: EditMod },
];

export default routes;
