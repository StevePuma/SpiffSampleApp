export type MenuItemTypes = {
    key: string;
    label: string;
    isTitle?: boolean;
    icon?: string;
    url?: string;
    badge?: {
        variant: string;
        text: string;
    };
    parentKey?: string;
    target?: string;
    children?: MenuItemTypes[];
};

const MENU_ITEMS: MenuItemTypes[] = [
    { key: 'navigation', label: 'Home', isTitle: true },
    {
        key: 'dashboard',
        label: 'Home',
        isTitle: false,
        icon: 'mdi mdi-view-dashboard-outline',
        url: '/dashboard',
    },

    { key: 'apps', label: 'Overview', isTitle: true },
    {
        key: 'apps-contacts-list',
        label: 'Accounts',
        isTitle: false,
        icon: 'mdi mdi-office-building-outline',
        url: '/apps/contacts/list',
    },
    // {
    //     key: 'apps-projects',
    //     label: 'Opportunities',
    //     isTitle: false,
    //     icon: 'mdi mdi-cash-usd-outline',
    //     badge: { variant: 'primary', text: '2+' },
    //     url: '/apps/projects',
    // },
    {
        key: 'apps-insights',
        label: 'Insights',
        isTitle: false,
        icon: 'mdi mdi-monitor-dashboard',
        url: '/apps/insights',
    },
    // {
    //     key: 'apps-reports',
    //     label: 'Reports',
    //     isTitle: false,
    //     icon: 'mdi mdi-file-clock-outline',
    //     url: '/apps/reports',
    // },
    // {
    //     key: 'apps-alerts',
    //     label: 'Pulse Alerts',
    //     isTitle: false,
    //     icon: 'mdi mdi-bell-alert-outline',
    //     url: '/apps/alerts',
    // },
    { key: 'custom', label: 'Pipeline Generation', isTitle: true },
    {
        key: 'custom-campaigns',
        label: 'Campaigns',
        isTitle: false,
        icon: 'mdi mdi-billboard',
        url: '/apps/projects',
    },
    {
        key: 'custom-communication',
        label: 'Communication',
        isTitle: false,
        icon: 'mdi mdi-forum-outline',
        url: '/apps/chat',
    },
];

const HORIZONTAL_MENU_ITEMS: MenuItemTypes[] = [
    {
        key: 'dashboard',
        label: 'Home',
        isTitle: false,
        icon: 'mdi mdi-view-dashboard',
        url: '/dashboard',
    },
    {
        key: 'apps',
        icon: 'fe-grid',
        label: 'Overview',
        isTitle: true,
        children: [
            {
                key: 'apps-contacts-list',
                label: 'Accounts',
                isTitle: false,
                icon: 'mdi mdi-office-building-outline',
                url: '/apps/contacts/list',
                parentKey: 'apps',
            },
            {
                key: 'apps-projects',
                label: 'Opportunities',
                isTitle: false,
                icon: 'mdi mdi-cash-usd-outline',
                badge: { variant: 'primary', text: '2+' },
                url: '/apps/projects',
                parentKey: 'apps',
            },
            {
                key: 'apps-insights',
                label: 'Insights',
                isTitle: false,
                icon: 'mdi mdi-head-lightbulb-outline',
                url: '/apps/insights',
                parentKey: 'apps',
            },
        ],
    },
    {
        key: 'custom',
        icon: 'mdi mdi-cards-outline',
        label: 'Pipeline Generation',
        isTitle: true,
        children: [
            {
                key: 'custom-campaigns',
                label: 'Campaigns',
                url: '/apps/projects',
                icon: 'mdi mdi-billboard',
                parentKey: 'custom',
            },
            {
                key: 'custom-communication',
                label: 'Communication',
                url: '/apps/chat',
                icon: 'mdi mdi-forum-outline',
                parentKey: 'custom',
            },
            // example of nested menus - keeping for reference
            // {
            //     key: 'custom-1',
            //     label: 'Pages',
            //     isTitle: false,
            //     icon: 'ri-bug-line',
            //     parentKey: 'custom',
            //     children: [
            //         {
            //             key: 'custom-campaigns',
            //             label: 'Campaigns',
            //             url: '/apps/projects',
            //             icon: 'mdi mdi-billboard',
            //             parentKey: 'custom-1',
            //         },
            //         {
            //             key: 'custom-communication',
            //             label: 'Communication',
            //             url: '/apps/chat',
            //             icon: 'mdi mdi-forum-outline',
            //             parentKey: 'custom-1',
            //         },
            //     ],
            // },
        ],
    },
    // {
    //     key: 'extra-pages',
    //     label: 'Utility',
    //     isTitle: true,
    //     icon: 'ri-pages-line',
    //     parentKey: 'pages',
    //     children: [
    //         {
    //             key: 'page-pricing',
    //             label: 'Pricing',
    //             url: '/pages/pricing',
    //             parentKey: 'extra-pages',
    //         },
    //         {
    //             key: 'page-timeline',
    //             label: 'Timeline',
    //             url: '/pages/timeline',
    //             parentKey: 'extra-pages',
    //         },
    //         {
    //             key: 'page-invoice',
    //             label: 'Invoice',
    //             url: '/pages/invoice',
    //             parentKey: 'extra-pages',
    //         },
    //         {
    //             key: 'page-faq',
    //             label: 'FAQs',
    //             url: '/pages/faq',
    //             parentKey: 'extra-pages',
    //         },
    //         {
    //             key: 'page-gallery',
    //             label: 'Gallery',
    //             url: '/pages/gallery',
    //             parentKey: 'extra-pages',
    //         },
    //         {
    //             key: 'page-maintenance',
    //             label: 'Maintenance',
    //             url: '/maintenance',
    //             parentKey: 'extra-pages',
    //         },
    //         {
    //             key: 'page-coming-soon',
    //             label: 'Coming Soon',
    //             url: '/coming-soon',
    //             parentKey: 'extra-pages',
    //         },
    //     ],
    // },
];

export { MENU_ITEMS, HORIZONTAL_MENU_ITEMS };
