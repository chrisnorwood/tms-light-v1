import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { handleUserLogin } from '../actions/auth'

const LoginPage = ({ dispatch, history }) => {
  const handleSubmit = (values, setSubmitting) => {
    const { email, password } = values
    const credentials = {email, password}
    // Pass credentials to API via action,
    // history in case success can redirect,
    // Formik setSubmitting for callback in case of error
    dispatch(handleUserLogin(credentials, history, setSubmitting))
  }

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
            <div className='text-center mt-4'>
              (Try email: "foo@bar.com" & password "foobar")
            </div>
            <Formik
              initialValues={{email: 'foo@bar.com', password: 'foobar'}}
              validate={values => {
                const errors = {};
                if (!values.email) errors.email = 'Required'
                if (!values.password) errors.password = 'Required'
                return errors
              }}
              onSubmit={(values, { setSubmitting }) => {
                // Passes values to submit handler, passes submitting for purposes of calling in action
                handleSubmit(values, setSubmitting)
              }}
              render={({ errors, touched, isSubmitting }) => (
                <Form className='bg-grey-lightest px-10 py-6'>
                  <div className='mb-3'>
                    <label className='block ml-2 mb-2 text-sm font-bold' htmlFor='email'>Email</label>
                    <Field
                      className={`border w-full p-3 ${errors.email && touched.email ? 'border-red-600' : 'border-grey'}`}
                      type='text'
                      name='email'
                      placeholder='Email'
                    />
                    <ErrorMessage name='email' component='div' className='ml-4 mt-2 text-red-600 text-xs' /> 
                  </div>
                  <div className='mb-3'>
                    <label className='block ml-2 mb-2 text-sm font-bold' htmlFor='password'>Password</label>
                    <Field
                      className={`border w-full p-3 ${errors.password && touched.password ? 'border-red-600' : 'border-grey'}`}
                      type='password'
                      name='password'
                      placeholder='**************'
                    />
                    <ErrorMessage name='password' component='div' className='ml-4 mt-2 text-red-600 text-xs' /> 
                  </div>
                  <div className='flex'>
                    <button
                      className='bg-primary w-full p-4 mt-3 text-sm text-white uppercase font-bold tracking-wider hover:bg-primary-dark disabled:opacity-75 disabled:cursor-not-allowed'
                      type='submit'
                      disabled={isSubmitting}
                    >
                      Login
                    </button>
                  </div>
                </Form>
              )}
            />

            <div className='border-t border-grey px-10 py-6'>
              <div className='flex justify-around'>
                <Link
                  className='font-bold text-primary hover:text-primary-dark no-underline'
                  to='/signup'
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

export default connect()(LoginPage)