import React, { Component } from 'react'

class Login extends Component {
  render() {
    return (
      <div className='login-container'>
        <h1>Login to TMS-Light</h1>
        <div>
          <label>Email Address</label>
          <input type='text' placeholder='Your Email' />
        </div>
        <div>
          <label>Password</label>
          <input type='text' placeholder='Your Email' />
        </div>
        <div>
          <button>Login</button>
        </div>
        <div>
          <p>Don't have an account? <a href='#'>Create an Account</a>.</p>
        </div>
      </div>
    )
  }
}

export default Login