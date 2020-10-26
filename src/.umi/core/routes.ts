// @ts-nocheck
import React from 'react';
import { ApplyPluginsType, dynamic } from '/media/quangtruong/589E832C9E8301AC/umijs/boilerplate-Umijs/node_modules/@umijs/runtime';
import * as umiExports from './umiExports';
import { plugin } from './plugin';
import LoadingComponent from '@/components/PageLoading/index';

export function getRoutes() {
  const routes = [
  {
    "path": "/login",
    "exact": true,
    "wrappers": [dynamic({ loader: () => import(/* webpackChunkName: 'wrappers' */'@/layouts/UserLayout'), loading: LoadingComponent})],
    "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__users__LoginForm' */'@/pages/users/LoginForm'), loading: LoadingComponent})
  },
  {
    "path": "/",
    "component": dynamic({ loader: () => import(/* webpackChunkName: 'layouts__BasicLayout' */'@/layouts/BasicLayout'), loading: LoadingComponent}),
    "wrappers": [dynamic({ loader: () => import(/* webpackChunkName: 'wrappers' */'@/layouts/SecurityLayout'), loading: LoadingComponent})],
    "exact": false,
    "routes": [
      {
        "path": "/",
        "redirect": "/dashboard",
        "exact": true
      },
      {
        "path": "/dashboard",
        "name": "dashboard",
        "exact": true,
        "icon": "DashboardOutlined",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__dashboard' */'@/pages/dashboard'), loading: LoadingComponent})
      },
      {
        "path": "/user",
        "exact": false,
        "name": "User",
        "icon": "AuditOutlined",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__users__index' */'@/pages/users/index'), loading: LoadingComponent})
      }
    ]
  }
];

  // allow user to extend routes
  plugin.applyPlugins({
    key: 'patchRoutes',
    type: ApplyPluginsType.event,
    args: { routes },
  });

  return routes;
}
