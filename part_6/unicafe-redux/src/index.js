import React from 'react';
import ReactDOM from 'react-dom/client'
import { configureStore } from '@reduxjs/toolkit';
import reducer from './reducer'
import "./app.css"

const store = configureStore({reducer})

const App = () => {
  const good = () => {
    store.dispatch({
      type: 'GOOD'
    })
  }

  const bad = () => {
    store.dispatch({
      type: 'BAD'
    })
  }

  const reset = () => {
    store.dispatch({
      type: 'ZERO'
    })
  }

  return (
    <div className="app">
      <button onClick={good}>Good</button>
      <button onClick={bad}>Bad</button>
      <button onClick={reset}>Reset Stats</button>
      <div>Good: {store.getState().good}</div>
      <div>Ok: {store.getState().ok}</div>
      <div>Bad: {store.getState().bad}</div>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
const renderApp = () => {
  root.render(<App/>)
}

renderApp()
store.subscribe(renderApp)
