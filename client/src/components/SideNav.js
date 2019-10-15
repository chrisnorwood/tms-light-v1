import React from 'react'
import { NavLink } from 'react-router-dom'
import { FaBriefcase, FaTruck, FaAddressBook, FaTruckLoading, FaSignOutAlt, FaHome } from 'react-icons/fa'

const SideNav = () => {
  return (
    <div className='fixed w-56 min-h-screen text-grey-darkest font-bold shadow-2xl bg-grey-light'>
      <div className='py-4 text-center text-2xl border-b border-grey-dark'>
        TMS
      </div>
      <ul className='sidebar-nav'>
        <li>
          <NavLink
            exact
            to='/app'
            className='nav-link'
          >
            <FaHome className='menu-icon'/>
            <span className='ml-8'>Dashboard</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            exact
            to='/app/loads'
            className='nav-link'
          >
            <FaTruckLoading className='menu-icon'/>
            <span className='ml-8'>Loads</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            exact
            to='/app/contacts'
            className='nav-link'
          >
            <FaAddressBook className='menu-icon'/>
            <span className='ml-8'>Contacts</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            exact
            to='/app/shippers'
            className='nav-link'
          >
            <FaBriefcase className='menu-icon'/>
            <span className='ml-8'>Shippers</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            exact
            to='/app/carriers'
            className='nav-link'
          >
            <FaTruck className='menu-icon'/>
            <span className='ml-8'>Carriers</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            exact
            to='/logout'
            className='nav-link'
          >
            <FaSignOutAlt className='menu-icon'/>
            <span className='ml-8'>Logout</span>
          </NavLink>
        </li>
      </ul>
    </div>
  )
}

export default SideNav