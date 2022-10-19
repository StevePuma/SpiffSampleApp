import React, { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';

// layouts
import DefaultLayout from '../layouts/Default';
import VerticalLayout from '../layouts/Vertical';
import HorizontalLayout from '../layouts/Horizontal/';

// components
import PrivateRoute from './PrivateRoute';
import Root from './Root';

// constants
import { LayoutTypes } from '../constants';

// hooks
import { useRedux } from '../hooks';

// lazy load all the views
// auth
const Login = React.lazy(() => import('../pages/auth/Login'));
const Register = React.lazy(() => import('../pages/auth/Register'));
const Confirm = React.lazy(() => import('../pages/auth/Confirm'));
const ForgetPassword = React.lazy(() => import('../pages/auth/ForgetPassword'));
const LockScreen = React.lazy(() => import('../pages/auth/LockScreen'));
const Logout = React.lazy(() => import('../pages/auth/Logout'));

// dashboards
const DashBoard1 = React.lazy(() => import('../pages/dashboards/DashBoard1/'));

// apps
const CalendarApp = React.lazy(() => import('../pages/apps/Calendar'));
const Insights = React.lazy(() => import('../pages/apps/Insights'));
const Reports = React.lazy(() => import('../pages/apps/Reports'));
const Alerts = React.lazy(() => import('../pages/apps/Alerts'));
const ChatApp = React.lazy(() => import('../pages/apps/Chat'));
const Inbox = React.lazy(() => import('../pages/apps/Email/Inbox'));
const Kanban = React.lazy(() => import('../pages/apps/Tasks/Board'));
const TaskDetail = React.lazy(() => import('../pages/apps/Tasks/Detail'));
const Projects = React.lazy(() => import('../pages/apps/Projects'));
const List = React.lazy(() => import('../pages/apps/Contacts/List'));
const Profile = React.lazy(() => import('../pages/apps/Contacts/Profile'));

// extra pages
const Starter = React.lazy(() => import('../pages/other/Starter'));
const Pricing = React.lazy(() => import('../pages/other/Pricing'));
const Timeline = React.lazy(() => import('../pages/other/Timeline'));
const Invoice = React.lazy(() => import('../pages/other/Invoice'));
const FAQ = React.lazy(() => import('../pages/other/FAQ'));
const Gallery = React.lazy(() => import('../pages/other/Gallery'));
const Error404 = React.lazy(() => import('../pages/other/Error404'));
const Error500 = React.lazy(() => import('../pages/other/Error500'));
const Maintenance = React.lazy(() => import('../pages/other/Maintenance'));
const ComingSoon = React.lazy(() => import('../pages/other/ComingSoon'));

const loading = () => <div className=""></div>;

type LoadComponentProps = {
    component: React.LazyExoticComponent<() => JSX.Element>;
};

const LoadComponent = ({ component: Component }: LoadComponentProps) => (
    <Suspense fallback={loading()}>
        <Component />
    </Suspense>
);

const AllRoutes = () => {
    const { appSelector } = useRedux();

    const { layout } = appSelector((state) => ({
        layout: state.Layout,
    }));

    const getLayout = () => {
        let layoutCls: React.ComponentType = VerticalLayout;

        switch (layout.layoutType) {
            case LayoutTypes.LAYOUT_HORIZONTAL:
                layoutCls = HorizontalLayout;
                break;
            default:
                layoutCls = VerticalLayout;
                break;
        }
        return layoutCls;
    };
    let Layout = getLayout();

    return useRoutes([
        { path: '/', element: <Root /> },
        {
            // public routes
            path: '/',
            element: <DefaultLayout />,
            children: [
                {
                    path: 'auth',
                    children: [
                        { path: 'login', element: <LoadComponent component={Login} /> },
                        { path: 'register', element: <LoadComponent component={Register} /> },
                        { path: 'confirm', element: <LoadComponent component={Confirm} /> },
                        { path: 'forget-password', element: <LoadComponent component={ForgetPassword} /> },
                        { path: 'lock-screen', element: <LoadComponent component={LockScreen} /> },
                        { path: 'logout', element: <LoadComponent component={Logout} /> },
                    ],
                },
                {
                    path: 'error-404',
                    element: <LoadComponent component={Error404} />,
                },
                {
                    path: 'error-500',
                    element: <LoadComponent component={Error500} />,
                },
                {
                    path: 'maintenance',
                    element: <LoadComponent component={Maintenance} />,
                },
                {
                    path: 'coming-soon',
                    element: <LoadComponent component={ComingSoon} />,
                },
            ],
        },
        {
            // auth protected routes
            path: '/',
            element: <PrivateRoute roles={'Admin'} component={Layout} />,
            children: [
                {
                    path: 'dashboard',
                    element: <LoadComponent component={DashBoard1} />,
                },
                {
                    path: 'apps',
                    children: [
                        {
                            path: 'calendar',
                            element: <LoadComponent component={CalendarApp} />,
                        },
                        {
                            path: 'insights',
                            element: <LoadComponent component={Insights} />,
                        },
                        {
                            path: 'reports',
                            element: <LoadComponent component={Reports} />,
                        },
                        {
                            path: 'alerts',
                            element: <LoadComponent component={Alerts} />,
                        },
                        {
                            path: 'chat',
                            element: <LoadComponent component={ChatApp} />,
                        },
                        {
                            path: 'email/inbox',
                            element: <LoadComponent component={Inbox} />,
                        },
                        {
                            path: 'tasks/kanban',
                            element: <LoadComponent component={Kanban} />,
                        },
                        {
                            path: 'tasks/details',
                            element: <LoadComponent component={TaskDetail} />,
                        },
                        {
                            path: 'projects',
                            element: <LoadComponent component={Projects} />,
                        },
                        {
                            path: 'contacts/list',
                            element: <LoadComponent component={List} />,
                        },
                        {
                            path: 'contacts/profile',
                            element: <LoadComponent component={Profile} />,
                        },
                    ],
                },
                {
                    path: 'pages',
                    children: [
                        {
                            path: 'starter',
                            element: <LoadComponent component={Starter} />,
                        },
                        {
                            path: 'pricing',
                            element: <LoadComponent component={Pricing} />,
                        },
                        {
                            path: 'timeline',
                            element: <LoadComponent component={Timeline} />,
                        },
                        {
                            path: 'invoice',
                            element: <LoadComponent component={Invoice} />,
                        },
                        {
                            path: 'faq',
                            element: <LoadComponent component={FAQ} />,
                        },
                        {
                            path: 'gallery',
                            element: <LoadComponent component={Gallery} />,
                        },
                    ],
                },
            ],
        },
    ]);
};

export { AllRoutes };
