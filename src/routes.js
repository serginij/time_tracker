import { renderRoutes } from 'react-router-config'
import { createBrowserHistory } from 'history'

import { Main } from '@components/main'
import { Stats } from '@components/stats/stats'
import { Settings } from '@components/settings'
import { About } from '@components/about/about'

export const history = createBrowserHistory()

export const Routes = () =>
  renderRoutes([
    { component: Main, path: '/', exact: true },
    { component: Stats, path: '/stats', exact: true },
    { component: Settings, path: '/settings', exact: true },
    { component: About, path: '/about', exact: true }
  ])
