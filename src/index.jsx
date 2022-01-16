import React from 'react'
import ReactDOM from 'react-dom'
import Root from './root/root'

ReactDOM.render(
  <React.StrictMode>
    <Root away={ false }/>
  </React.StrictMode>,
  document.getElementById('root')
)
