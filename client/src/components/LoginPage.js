import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleUserLogin } from '../actions/auth'

class LoginPage extends Component {
  state = {
    email: '',
    password: '',
    loading: false,
  }

  handleInputChange = (e) => {
    const { value, name } = e.target
    this.setState(() => ({
      [name]: value
    }))
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { email, password } = this.state
    const credentials = {email, password}
    this.props.dispatch(handleUserLogin(credentials, this.props.history))
  }

  isDisabled = () => {
    const { email, password } = this.state

    return email === '' || password === ''
  }
  
  render() {
    const { email, password } = this.state
    const { authError } = this.props

    return (
      <div className='bg-grey-lighter text-base text-grey-darkest font-normal relative h-screen'>
        <div className='h-2 bg-primary'></div>

        <div className='container mx-auto p-8'>
          <div className='mx-auto max-w-sm'>
            <div className='my-10 text-center'></div> 

            <div className='bg-white rounded shadow'>
              <div className='border-b border-grey py-8 font-bold text-black text-center text-xl tracking-widest uppercase'>
                Welcome back!
              </div>

              <form
                className='bg-grey-lightest px-10 py-10'
                onSubmit={this.handleSubmit}
              >
                <div className='mb-3'>
                  <input
                    className='border border-grey w-full p-3'
                    name='email'
                    type='text'
                    placeholder='Email'
                    onChange={this.handleInputChange}
                    value={email}
                  />
                </div>
                <div className='mb-6'>
                  <input
                    className='border border-grey w-full p-3'
                    name='password'
                    type='password'
                    placeholder='**************'
                    onChange={this.handleInputChange}
                    value={password}
                  />
                </div>
                <div className='flex'>
                  <button
                    className='bg-primary w-full p-4 text-sm text-white uppercase font-bold tracking-wider hover:bg-primary-dark'
                    type='submit'
                  >
                    Login
                  </button>
                </div>
              </form>

              <div className='border-t border-grey px-10 py-6'>
                <div className='flex justify-around'>
                  <Link
                    className='font-bold text-primary hover:text-primary-dark no-underline'
                    to='/register'
                  >
                    Don't have an account?
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps({ auth }) {
  return {
    authError: auth.error,
  }
}

export default connect(mapStateToProps)(LoginPage)