import React from 'react';
import { shallow } from 'enzyme'
import UpdatePto from './../Pto/UpdatePto'
import {BrowserRouter as Router} from 'react-router-dom'

describe('UpdatePto component Test Suite', () => {
  it('renders without crashing', () => {
    shallow(
    <Router>
      <UpdatePto />
    </Router>)
  })
})