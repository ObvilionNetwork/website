import React from 'react';
import $ from 'jquery';

window.jQuery = $;
window.$ = $;
global.jQuery = $;

const DashboardDefault = React.lazy(() => import('./pages/Admin/Default'));

const UIBasicButton = React.lazy(() => import('./pages/UIElements/Basic/Button'));
const UIBasicBadges = React.lazy(() => import('./pages/UIElements/Basic/Badges'));
const UIBasicBreadcrumbPagination = React.lazy(() => import('./pages/UIElements/Basic/BreadcrumbPagination'));

const UIBasicCollapse = React.lazy(() => import('./pages/UIElements/Basic/Collapse'));
const UIBasicTabsPills = React.lazy(() => import('./pages/UIElements/Basic/TabsPills'));
const UIBasicBasicTypography = React.lazy(() => import('./pages/UIElements/Basic/Typography'));

const FormsElements = React.lazy(() => import('./pages/Forms/FormsElements'));

const BootstrapTable = React.lazy(() => import('./pages/Tables/BootstrapTable'));

const Nvd3Chart = React.lazy(() => import('./pages/Charts/Nvd3Chart/index'));

const GoogleMap = React.lazy(() => import('./pages/Maps/GoogleMap/index'));

const OtherSamplePage = React.lazy(() => import('./pages/Other/SamplePage'));
const OtherDocs = React.lazy(() => import('./pages/Other/Docs'));

const routes = [
    { path: '/admin', exact: true, name: 'Default', component: DashboardDefault },
    { path: '/admin/basic/button', exact: true, name: 'Basic Button', component: UIBasicButton },
    { path: '/admin/basic/badges', exact: true, name: 'Basic Badges', component: UIBasicBadges },
    { path: '/admin/basic/breadcrumb-paging', exact: true, name: 'Basic Breadcrumb Pagination', component: UIBasicBreadcrumbPagination },
    { path: '/admin/basic/collapse', exact: true, name: 'Basic Collapse', component: UIBasicCollapse },
    { path: '/admin/basic/tabs-pills', exact: true, name: 'Basic Tabs & Pills', component: UIBasicTabsPills },
    { path: '/admin/basic/typography', exact: true, name: 'Basic Typography', component: UIBasicBasicTypography },
    { path: '/admin/forms/form-basic', exact: true, name: 'Forms Elements', component: FormsElements },
    { path: '/admin/tables/bootstrap', exact: true, name: 'Bootstrap Table', component: BootstrapTable },
    { path: '/admin/charts/nvd3', exact: true, name: 'Nvd3 Chart', component: Nvd3Chart },
    { path: '/admin/maps/google-map', exact: true, name: 'Google Map', component: GoogleMap },
    { path: '/admin/sample-page', exact: true, name: 'Sample Page', component: OtherSamplePage },
    { path: '/admin/docs', exact: true, name: 'Documentation', component: OtherDocs },
];

export default routes;