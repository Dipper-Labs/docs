module.exports = {
    locales: {
        '/en/': {
            lang: 'en-US',
            title: "DipperNetwork Document",
            description: "Make You and Your Personal Network Unique\n"
        },
        '/': {
            lang: 'zh-CN',
            title: 'DipperNetwork文档',
            description: '去中心化的普惠金融网络\n'
        }
    },
    head: [
        ['link', {rel: 'icon', href: `/logo.png`}],
        ['link', {rel: 'manifest', href: '/manifest.json'}],
        ['meta', {name: 'theme-color', content: '#21a4e7'}],
        ['meta', {name: 'apple-mobile-web-app-capable', content: 'yes'}],
        ['meta', {name: 'apple-mobile-web-app-status-bar-style', content: 'black'}],
        ['link', {rel: 'apple-touch-icon', href: `/icons/apple-touch-icon-152x152.png`}]
    ],
    serviceWorker: true,
    themeConfig: {
        repo: 'DipperNetwork/docs',
        sidebarDepth: 5,
        editLinks: true,
        docsDir: 'docs',
        locales: {
            '/en/': {
                label: 'English',
                selectText: 'Languages',
                editLinkText: 'Edit on GitHub',
                lastUpdated: 'Last Updated',
                serviceWorker: {
                },
                nav: [
                    {
                        text: 'Introduction',
                        link: '/en/introduction/',
                    },
                    {
                        text: 'Getting Started',
                        link: '/en/get-started/',
                    },
                    {
                        text: 'Software',
                        link: '/en/software/how-to-install'
                    },
                    {
                        text: 'Applications',
                        link: '/en/applications/'
                    },
                    {
                        text: 'Advanced',
                        link: '/en/advanced/',
                    }
                ],
                sidebar: {
                    '/en/get-started/': genSidebarConfig ('get-started', 'Getting Started'),
                    '/en/software/': genSidebarConfig ('software', 'Software'),
                    '/en/applications/': genSidebarConfig ('applications', 'Applications'),
                    '/en/im/': genSidebarConfig ('im', 'IM Server Deploy'),
                    '/en/advanced/': genSidebarConfig('advanced', 'Advanced')
                }
            },
            '/': {
                label: '简体中文',
                selectText: '选择语言',
                editLinkText: '完善此文档',
                lastUpdated: '上次更新',
                serviceWorker: {
                },
                nav: [
                    {
                        text: '简介',
                        link: '/introduction/',
                    },
                    {
                        text: '开始',
                        link: '/get-started/',
                    },
                    {
                        text: '软件',
                        link: '/software/how-to-install'
                    },
                    {
                        text: '应用',
                        link: '/applications/'
                    },
                    {
                        text: '高级教程',
                        link: '/advanced/'
                    }
                ],
                sidebar: {
                    '/get-started/': genSidebarConfig ('get-started', '快速开始'),
                    '/software/': genSidebarConfig ('software', '软件'),
                    '/applications/': genSidebarConfig ('applications', '应用'),
                    '/advanced/': genSidebarConfig('advanced', '高级教程')
                }
            }
        }
    }
};

function genSidebarConfig (module, title) {
    if (module == 'get-started') {
        return [
            {
                title,
                collapsable: false,
                children: [
                    '',
                    'generate-genesis-file',
                    'how-to-join-testnet',
                    'how-to-become-validator',
                    'how-to-delegate'
                ]
            }
        ]
    }

    if (module === 'software') {
        return [
            {
                title,
                collapsable: false,
                children: [
                    'go-install',
                    'how-to-install',
                    'dipcli',
                    'monitor'
                ]
            }
        ];
    }

    if (module === 'advanced') {
        return [
            {
                title,
                collapsable: false,
                children: [
                    'api',
                    'multisig',
                    'keys',
                    'how-to-create-proposal',
                    'transaction',
                    'fee-payment',
                    'contract',
                    'Q&A'
                ]
            }
        ];
    }
}
