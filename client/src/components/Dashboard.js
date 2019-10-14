import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { FaBriefcase, FaTruck, FaAddressBook, FaTruckLoading, FaSignOutAlt, FaHome } from 'react-icons/fa'
import { connect } from 'react-redux'

class Dashboard extends Component {
  render() {
    return (
      <div className='bg-grey-lighter text-base text-grey-darkest font-normal relative min-h-screen'>
        <div 
          className='fixed w-56 min-h-screen text-grey-darkest font-bold shadow-2xl bg-grey-light'
        >
          <div className='h-2 bg-primary'></div>
          <div className='mt-8 mb-5 text-center text-2xl'>
            TMS
          </div>
          <ul className='sidebar-nav'>
            <li>
              <NavLink
                to='/dash'
                className='nav-link'
              >
                <FaHome className='menu-icon'/>
                <span className='ml-8'>Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to='/loads'
                className='nav-link'
              >
                <FaTruckLoading className='menu-icon'/>
                <span className='ml-8'>Loads</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to='/contacts'
                className='nav-link'
              >
                <FaAddressBook className='menu-icon'/>
                <span className='ml-8'>Contacts</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to='/shippers'
                className='nav-link'
              >
                <FaBriefcase className='menu-icon'/>
                <span className='ml-8'>Shippers</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to='/carriers'
                className='nav-link'
              >
                <FaTruck className='menu-icon'/>
                <span className='ml-8'>Carriers</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to='/logout'
                className='nav-link'
              >
                <FaSignOutAlt className='menu-icon'/>
                <span className='ml-8'>Logout</span>
              </NavLink>
            </li>
          </ul>
        </div>
        <div id='content' className='ml-56'>
          <div className='h-2 bg-primary'></div>
          
          <div className='w-full mt-8'>
            <div className='w-3/4 mx-auto bg-white rounded shadow'>
              Content
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect()(Dashboard)