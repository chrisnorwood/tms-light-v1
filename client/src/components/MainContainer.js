import React from 'react'
import SideNav from './SideNav'

const MainContainer = (props) => {
  return (
    <div className='bg-grey-lighter text-base text-grey-darkest font-normal relative min-h-screen'>
      <div className='h-2 bg-primary'></div>
      <SideNav />
      <div id='content' className='ml-56 mt-10'>
        <div className='w-full'>
          <div className='w-3/4 mx-auto pt-4'>
            {props.children}
          </div>
        </div>
      </div>
    </div>
  )
} 

export default MainContainer