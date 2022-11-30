import React from 'react'
import {
  createBrowserRouter
} from 'react-router-dom'

import {
  Counter,
  Leads,
} from './features'

const routes = createBrowserRouter([
  {
    path: '/leads',
    element: <Leads/>
  }, {
    path: '/counter',
    element: <Counter/>
  }
])

export default routes