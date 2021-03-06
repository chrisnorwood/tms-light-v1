import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'
import SideNav from './SideNav'
// import Dashboard from './Dashboard'
import LoadsPage from './LoadsPage'
import ContactsPage from './ContactsPage'
import ShippersPage from './ShippersPage'
import CarriersPage from './CarriersPage'

const MainContainer = ({ match }) => {
  return (
    <div className='bg-grey-lighter text-base text-grey-darkest font-normal relative min-h-screen'>
      <SideNav />
      <div className='h-2 bg-primary'></div>
      <div id='content' className='ml-56 mt-10 pb-10'>
        <div className='w-full'>
          <div className='w-11/12 mx-auto pt-4'>
            <Route path={`${match.path}`} exact component={() => (
              <Redirect to={`${match.path}/loads`} />
            )} />
            <Route path={`${match.path}/loads`} component={LoadsPage} />
            <Route path={`${match.path}/contacts`} component={ContactsPage} />
            <Route path={`${match.path}/shippers`} component={ShippersPage} />
            <Route path={`${match.path}/carriers`} component={CarriersPage} />
          </div>
        </div>
      </div>
    </div>
  )
}

MainContainer.propTypes = {
  match: PropTypes.object.isRequired,
}

export default MainContainer