import { login } from '@/services/users'; //
import { IRoute } from 'umi'
import { Component } from 'react'

export const routes: IRoute[] = [
  {
    path: '/login',
    exact: true,
    wrappers: ['@/layouts/UserLayout'],
    component: '@/pages/users/LoginForm',
  },
  {
    path: '/',
    component: '@/layouts/BasicLayout',
    wrappers: ['@/layouts/SecurityLayout'], //=> If user login, it's will handle logic. If return true => redirect into homepage, false => show notify
    exact: false,
    routes: [
      {
        path: '/',
        redirect: '/dashboard',
      },
      {
        path: '/dashboard',
        name: 'dashboard',
        exact: true,
        icon: 'DashboardOutlined',
        component: '@/pages/dashboard',
      },
      {
        path: '/user',
        exact: false,
        name: 'User',
        icon: 'AuditOutlined',
        component: '@/pages/users/index'
      },
    ],
  },
]
