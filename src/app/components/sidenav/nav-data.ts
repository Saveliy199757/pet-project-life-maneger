import {INavbarData} from "./helper";

export const navbarData: INavbarData[] = [
  {
    routeLink: 'dashboard',
    icon: 'fal fa-home',
    label: 'Dashboard'
  },
  {
    routeLink: 'products',
    icon: 'fal fa-box-open',
    label: 'Products',
    items: [
      {
        routeLink: 'products/level1.1',
        label: "level 1.1",
        items: [
          {
            routeLink: "products/level2.1",
            label: "level 2.1",
            items: [
              {
                routeLink: "products/level3.1",
                label: "level 3.1"
              },
              {
                routeLink: "products/level3.2",
                label: "level 3.2"
              },
              {
                routeLink: "products/level3.3",
                label: "level 3.3"
              },
              {
                routeLink: "products/level3.4",
                label: "level 3.5"
              }
            ]
          },
          {
            routeLink: "products/level2.2",
            label: "level 2.2"
          },
          {
            routeLink: "products/level2.3",
            label: "level 2.3"
          },
          {
            routeLink: "products/level2.4",
            label: "level 2.4"
          },
        ]
      },
      {
        routeLink: 'products/level1.2',
        label: "level 1.2"
      }
    ]
  },
  {
    routeLink: 'statistics',
    icon: 'fal fa-chart-bar',
    label: 'Statistics'
  },
  {
    routeLink: 'coupens',
    icon: 'fal fa-tags',
    label: 'Coupens',
    items: [
      {
        routeLink: 'coupens/list',
        label: 'List Coupens'
      },
      {
        routeLink: 'coupens/create',
        label: 'Coupens create'
      }
    ]
  },
  {
    routeLink: 'pages',
    icon: 'fal fa-file',
    label: 'Pages'
  },
  {
    routeLink: 'media',
    icon: 'fal fa-camera',
    label: 'Media'
  },
  {
    routeLink: 'settings',
    icon: 'fal fa-cog',
    label: 'Settings',
    expanded: true,
    items: [
      {
        routeLink: 'settings/profile',
        label: 'Profile'
      },
      {
        routeLink: 'settings/customize',
        label: 'Customize'
      }
    ]
  },
];
