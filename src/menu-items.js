export default {
    items: [
        {
            id: 'navigation',
            title: 'Навигация',
            type: 'group',
            icon: 'icon-navigation',
            children: [
                {
                    id: 'dashboard',
                    title: 'Статистика',
                    type: 'item',
                    url: '/admin',
                    icon: 'feather icon-home',
                },
                {
                    id: 'loading',
                    title: 'Загрузка хостов',
                    type: 'item',
                    url: '/admin/systemusage',
                    icon: 'feather icon-cpu',
                },
                {
                    id: 'finances',
                    title: 'Финансы',
                    type: 'item',
                    icon: 'feather icon-briefcase',
                    url: '/admin/finances'
                },
                {
                    id: 'launcher',
                    title: 'Лаунчер',
                    type: 'item',
                    url: '/admin/launcher',
                    icon: 'feather icon-file-text'
                }
            ]
        },
        {
            id: 'database',
            title: 'Управление',
            type: 'group',
            icon: 'icon-ui',
            children: [
                {
                    id: 'users',
                    title: 'Пользователи',
                    type: 'collapse',
                    icon: 'feather icon-users',
                    children: [
                        {
                            id: 'stats',
                            title: 'Статистика',
                            type: 'item',
                            url: '/admin/users/statistics'
                        },
                        {
                            id: 'control',
                            title: 'Управление',
                            type: 'item',
                            url: '/admin/users'
                        },
                        {
                            id: 'ban-list',
                            title: 'Бан-лист',
                            type: 'item',
                            url: '/admin/users/bans'
                        },
                    ]
                },
                {
                    id: 'roles',
                    title: 'Группы',
                    type: 'collapse',
                    icon: 'feather icon-package',
                    children: [
                        {
                            id: 'list',
                            title: 'Статистика',
                            type: 'item',
                            url: '/admin/roles'
                        },
                        {
                            id: 'control',
                            title: 'Управление',
                            type: 'item',
                            url: '/admin/roles/control'
                        }
                    ]
                },
                {
                    id: 'servers',
                    title: 'Сервера',
                    type: 'collapse',
                    icon: 'feather icon-server',
                    children: [
                        {
                            id: 'stats',
                            title: 'Статистика',
                            type: 'item',
                            url: '/admin/servers'
                        },
                        {
                            id: 'control',
                            title: 'Настройка',
                            type: 'item',
                            url: '/admin/servers/control'
                        },
                        {
                            id: 'console',
                            title: 'Консоль',
                            type: 'item',
                            url: '/admin/servers/console'
                        }
                    ]
                },
                {
                    id: 'clients',
                    title: 'Сборки',
                    type: 'collapse',
                    icon: 'feather icon-monitor',
                    children: [
                        {
                            id: 'control',
                            title: 'Управление',
                            type: 'item',
                            icon: 'feather icon-airplay',
                            url: '/admin/clients'
                        },
                        {
                            id: 'mods',
                            title: 'Моды',
                            type: 'item',
                            icon: 'feather icon-grid',
                            url: '/admin/clients/mods'
                        },
                        {
                            id: 'mods',
                            title: 'Клиентские моды',
                            type: 'item',
                            icon: 'feather icon-command',
                            url: '/admin/clients/clientmods'
                        },
                        {
                            id: 'control',
                            title: 'Конфиг',
                            type: 'item',
                            icon: 'feather icon-file-text',
                            url: '/admin/clients/config'
                        },
                        {
                            id: 'files',
                            title: 'Ядра',
                            type: 'item',
                            icon: 'feather icon-anchor',
                            url: '/admin/clients/cores'
                        },
                        {
                            id: 'files',
                            title: 'Библиотеки',
                            type: 'item',
                            icon: 'feather icon-book',
                            url: '/admin/clients/libraries'
                        },
                        {
                            id: 'files',
                            title: 'Нативные файлы',
                            type: 'item',
                            icon: 'feather icon-globe',
                            url: '/admin/servers'
                        },
                        {
                            id: 'files',
                            title: 'Ассеты',
                            type: 'item',
                            icon: 'feather icon-image',
                            url: '/admin/servers'
                        }
                    ]
                }
            ]
        },
        {
            id: 'ui-forms',
            title: 'Прочее',
            type: 'group',
            icon: 'icon-group',
            children: [
                {
                    id: 'todo',
                    title: 'TODO Лист',
                    type: 'item',
                    icon: 'feather icon-check-square',
                    url: '/admin/todo'
                },
                {
                    id: 'docs',
                    title: 'Документация API',
                    type: 'item',
                    icon: 'feather icon-help-circle',
                    url: '/admin/docs'
                },
                {
                    id: 'testApi',
                    title: 'Тестирование API',
                    type: 'item',
                    icon: 'feather icon-layers',
                    url: '/admin/apitest'
                },
                {
                    id: 'github',
                    title: 'Github',
                    type: 'item',
                    icon: 'feather icon-github',
                    url: '/admin/github'
                },
                {
                    id: 'exit',
                    title: 'На главную',
                    type: 'item',
                    icon: 'feather icon-power',
                    url: ''
                }
            ]
        }
    ]
}
