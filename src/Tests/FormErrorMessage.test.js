import React from 'react';
import { shallow } from 'enzyme'
import FormErrorMessage from './../ErrorManagement/FormErrorMessage'
import {BrowserRouter as Router} from 'react-router-dom'

describe('FormErrorMessage component Test Suite', () => {
  it('renders without crashing', () => {
    shallow(
    <Router>
      <FormErrorMessage />
    </Router>)
  })
})