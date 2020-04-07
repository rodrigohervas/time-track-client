import React from 'react';
import { shallow } from 'enzyme'
import Pto from './../Pto/Pto'
import {BrowserRouter as Router} from 'react-router-dom'

describe('Pto component Test Suite', () => {
  it('renders without crashing', () => {
    shallow(
    <Router>
      <Pto />
    </Router>)
  })
})