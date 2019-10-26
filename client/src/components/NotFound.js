import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = (props) => {
  return (
    <div className='bg-grey-lighter text-base text-grey-darkest font-normal relative h-screen'>
      <div className='h-2 bg-primary'></div>

      <div className='container mx-auto p-8'>
        <div className='mx-auto max-w-sm'>
          <div className='my-10 text-center'></div> 

          <div className='bg-white rounded shadow text-center'>
            <div className='border-b border-grey py-8 font-bold text-black text-center text-2xl tracking-widest uppercase'>
              404
            </div>
            <p className='p-4 italic'>
              This page does not exist.
            </p>

            <div className='border-t border-grey px-10 py-6'>
              <div className='flex justify-around'>
                <Link
                  className='font-bold text-primary hover:text-primary-dark no-underline'
                  to='/'
                >
                  ← Return home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFound