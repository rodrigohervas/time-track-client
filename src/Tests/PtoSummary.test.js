import React from 'react';
import { shallow } from 'enzyme'
import PtoSummary from './../Pto/PtoSummary'
import {BrowserRouter as Router} from 'react-router-dom'

describe('PtoSummary component Test Suite', () => {
  it('renders without crashing', () => {
    shallow(
    <Router>
      <PtoSummary />
    </Router>)
  })
})