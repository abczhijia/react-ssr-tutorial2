import Home from '../browser/pages/home';
import Detail from '../browser/pages/detail';
import NotFound from '../browser/pages/404';

const routes = [
    {
        path: '/',
        exact: true,
        component: Home,
    },
    {
        path: '/detail',
        exact: true,
        component: Detail,
    },
    {
        path: '*',
        component: NotFound,
    },
];

export default routes;