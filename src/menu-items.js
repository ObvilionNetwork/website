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
                    title: 'Загрузка серверов',
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
            title: 'Базы данных',
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
                            id: 'list',
                            title: 'Список',
                            type: 'item',
                            url: '/admin/users'
                        },
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
                            url: '/admin/users/control'
                        },
                        {
                            id: 'ban-list',
                            title: 'Бан-лист',
                            type: 'item',
                            url: '/admin/users/bans'
                        }
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
                            title: 'Список',
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
                            url: '/admin/servers/statistics'
                        },
                        {
                            id: 'control',
                            title: 'Управление',
                            type: 'item',
                            url: '/admin/servers/control'
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