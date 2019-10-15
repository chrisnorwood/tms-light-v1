import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import SideNav from './SideNav'
import Dashboard from './Dashboard'
import LoadsPage from './LoadsPage'

class MainContainer extends Component {
  componentDidMount() {
    console.log('MainContainer did mount.')
  }
  
  render() {
    const { match } = this.props

    return (
      <div className='bg-grey-lighter text-base text-grey-darkest font-normal relative min-h-screen'>
        <div className='h-2 bg-primary'></div>
        <SideNav />
        <div id='content' className='ml-56 mt-10'>
          <div className='w-full'>
            <div className='w-3/4 mx-auto pt-4'>
              <Route path={`${match.path}`} exact component={Dashboard} />
              <Route path={`${match.path}/loads`} component={LoadsPage} />
            </div>
          </div>
        </div>
      </div>
    )
  }
} 

export default MainContainer