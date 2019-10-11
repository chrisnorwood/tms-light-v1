import React, { Component } from 'react'
import { Link } from 'react-router-dom'
class Login extends Component {
  render() {
    return (
      <div className='bg-grey-lighter text-base text-grey-darkest font-normal relative h-screen'>
        <div className='h-2 bg-primary'></div>

        <div className='container mx-auto p-8'>
          <div className='mx-auto max-w-sm'>
            <div className='py-10 text-center'>
              
            </div> 

            <div className='bg-white rounded shadow'>
              <div className='border-b border-grey py-8 font-bold text-black text-center text-xl tracking-widest uppercase'>
                Welcome back!
              </div>

              <form className='bg-grey-lightest px-10 py-10'>
                <div className='mb-3'>
                  <input className='border border-grey w-full p-3' name='email' type='text' placeholder='E-Mail' />
                </div>
                <div className='mb-6'>
                  <input className='border border-grey w-full p-3' name='password' type='password' placeholder='**************' />
                </div>
                <div className='flex'>
                  <button className='bg-primary hover:bg-primary-dark w-full p-4 text-sm text-white uppercase font-bold tracking-wider'>
                    Login
                  </button>
                </div>
              </form>

              <div className='border-t border-grey px-10 py-6'>
                <div className='flex justify-around'>
                    <Link to='/register' className='font-bold text-primary hover:text-primary-dark no-underline'>Don't have an account?</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Login