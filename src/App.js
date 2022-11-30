import React, { useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'

import routes from './routes'

import './shared/styles/index.scss'

function App() {
  useEffect(() => () => {

  })
  return (
    <div className="app">
      <RouterProvider router={routes} />
    </div>
  )
}

export default App
