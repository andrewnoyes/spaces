import {
  Home,
  Account,
  SpaceRoutes,
  SpaceList
} from 'components';

export const routes = [
  { name: 'Home', path: '/', iconName: 'Home', exact: true, component: Home },
  {
    name: 'Spaces',
    path: '/spaces',
    iconName: 'AppIconDefault',
    addTooltip: 'Create a space',
    component: SpaceRoutes,
    child: SpaceList
  },
  { name: 'Account', path: '/account', iconName: 'Accounts', component: Account },
];

export const getCurrentRoute = location => {
  for (let i = 0; i < routes.length; i++) {
    const route = routes[i];
    if (route.path === location.pathname) {
      return route;
    }
  }

  return null;
}