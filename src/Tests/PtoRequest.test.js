import React from 'react';
import { shallow } from 'enzyme'
import PtoRequest from './../Pto/PtoRequest'
import {BrowserRouter as Router} from 'react-router-dom'

describe('PtoRequest component Test Suite', () => {
  it('renders without crashing', () => {
    shallow(
    <Router>
      <PtoRequest />
    </Router>)
  })
})