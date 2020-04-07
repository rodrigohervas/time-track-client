import React from 'react';
import { shallow } from 'enzyme'
import UpdateHours from './../Timeframes/UpdateHours'
import {BrowserRouter as Router} from 'react-router-dom'

describe('UpdateHours component Test Suite', () => {
  it('renders without crashing', () => {
    shallow(
    <Router>
      <UpdateHours />
    </Router>)
  })
})