import React from 'react';
import { shallow } from 'enzyme'
import AuthWrapper from './../Authentication/AuthWrapper'
import {BrowserRouter as Router} from 'react-router-dom'

describe('AuthWrapper component Test Suite', () => {
  it('renders without crashing', () => {
    shallow(
    <Router>
      <AuthWrapper />
    </Router>)
  })
})
