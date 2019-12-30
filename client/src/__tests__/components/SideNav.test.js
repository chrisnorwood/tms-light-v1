import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { render, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import SideNav from '../../components/SideNav'

afterEach(cleanup)

it('renders the SideNav', () => {
  const { asFragment } = render(
    // Include Router to avoid rendering NavLink outside of Router errors
    <Router>
      <SideNav />
    </Router>
  )
  expect(asFragment()).toMatchSnapshot()
})
