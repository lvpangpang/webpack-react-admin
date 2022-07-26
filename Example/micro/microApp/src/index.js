import React from 'react'
import { BrowserRouter } from 'react-router-dom'

function App({ children }) {
  return <BrowserRouter>{children}</BrowserRouter>
}

export default App
