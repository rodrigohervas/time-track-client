import React from 'react';
import { shallow } from 'enzyme'
import ErrorMessage from './../ErrorManagement/ErrorMessage'
import {BrowserRouter as Router} from 'react-router-dom'

describe('ErrorMessage component Test Suite', () => {
  it('renders without crashing', () => {
    shallow(
    <Router>
      <ErrorMessage />
    </Router>)
  })
})