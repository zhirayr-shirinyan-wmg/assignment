import React from 'react'
import {
  createBrowserRouter
} from 'react-router-dom'

import {
  Leads,
} from './features'

const routes = createBrowserRouter([
  {
    path: '/',
    element: <Leads/>
  }
])

export default routes