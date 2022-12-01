import React from 'react'
import { RouterProvider } from 'react-router-dom'

import routes from './routes'

import './shared/styles/index.scss'

const App = () =>
  (
    <div className="app">
      <RouterProvider router={routes} />
    </div>
  )

export default App
