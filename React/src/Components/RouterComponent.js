import React, { Component } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Home'

export default class RouterComponent extends Component {
  render() {
    return (
    <React.Fragment>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
        </Routes>
    </React.Fragment>
    )
  }
}
