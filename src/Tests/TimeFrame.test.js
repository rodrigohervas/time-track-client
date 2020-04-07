import React from 'react';
import { shallow } from 'enzyme'
import TimeFrame from './../Timeframes/TimeFrame'
import {BrowserRouter as Router} from 'react-router-dom'

describe('TimeFrame component Test Suite', () => {
  it('renders without crashing', () => {
    shallow(
    <Router>
      <TimeFrame />
    </Router>)
  })
})