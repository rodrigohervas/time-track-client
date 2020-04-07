import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import App from './../App'
import {BrowserRouter as Router} from 'react-router-dom'

describe('App component Test Suite', () => {
  it('renders App without crashing', () => {
    shallow(
    <Router>
      <App />
    </Router>)
  })
})
