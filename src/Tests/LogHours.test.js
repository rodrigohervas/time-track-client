import React from 'react';
import { shallow } from 'enzyme'
import LogHours from './../Timeframes/LogHours'
import {BrowserRouter as Router} from 'react-router-dom'

describe('LogHours component Test Suite', () => {
  it('renders without crashing', () => {
    shallow(
    <Router>
      <LogHours />
    </Router>)
  })
})