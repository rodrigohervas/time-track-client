import React from 'react';
import { shallow } from 'enzyme'
import DashBoard from './../Dashboard'
import {BrowserRouter as Router} from 'react-router-dom'

describe('DashBoard component Test Suite', () => {
  it('renders without crashing', () => {
    shallow(
    <Router>
      <DashBoard />
    </Router>)
  })
})