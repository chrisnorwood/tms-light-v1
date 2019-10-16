import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Formik, Form, Field, ErrorMessage } from 'formik'

class NewContact extends Component {
  handleSubmit = (values, setSubmitting) => {
    // Pass new data to API via action,
    // history in case success can redirect,
    // Formik setSubmitting for callback in case of error
    // this.props.dispatch(handleUserSignup(values, this.props.history, setSubmitting))
    console.log('Form data: ', values)
  }
  
  render() {
    return (
      <Fragment>
        <div className='border-b border-grey py-2 font-bold text-black text-center text-lg tracking-widest uppercase'>
          Create New Contact
        </div>
        <Formik
          initialValues={{name: '', phone: '', email: '', notes: ''}}
          validate={values => {
            const errors = {};
            if (!values.name) errors.name = 'Required'
            if (!values.phone) errors.phone = 'Required'
            if (!values.email) errors.email = 'Required'
            return errors
          }}
          onSubmit={(values, { setSubmitting }) => {
            // Passes values to submit handler, passes submitting for purposes of calling in action
            this.handleSubmit(values, setSubmitting)
          }}
          render={({ errors, touched, isSubmitting }) => (
            <Form className='bg-grey-lightest px-10 py-10'>
              <div className='mb-3'>
                <Field
                  className={`border w-full p-3 ${errors.name && touched.name ? 'border-red-600' : 'border-grey'}`}
                  type='text'
                  name='name'
                  placeholder='Name'
                />
                <ErrorMessage name='name' component='div' className='ml-4 mt-2 text-red-600 text-xs' /> 
              </div>
              <div className='mb-3'>
                <Field
                  className={`border w-full p-3 ${errors.phone && touched.phone ? 'border-red-600' : 'border-grey'}`}
                  type='phone'
                  name='phone'
                  placeholder='Phone #'
                />
                <ErrorMessage name='phone' component='div' className='ml-4 mt-2 text-red-600 text-xs' /> 
              </div>
              <div className='mb-3'>
                <Field
                  className={`border w-full p-3 ${errors.email && touched.email ? 'border-red-600' : 'border-grey'}`}
                  type='text'
                  name='email'
                  placeholder='Email'
                />
                <ErrorMessage name='email' component='div' className='ml-4 mt-2 text-red-600 text-xs' /> 
              </div>
              <div className='mb-3'>
                <Field
                  className={`border w-full p-3 border-grey`}
                  component='textarea'
                  rows='3'
                  name='notes'
                  placeholder='Notes'
                />
              </div>
              <div className='flex'>
                <button
                  className='bg-primary w-full p-4 mt-3 text-sm text-white uppercase font-bold tracking-wider hover:bg-primary-dark disabled:opacity-75 disabled:cursor-not-allowed'
                  type='submit'
                  disabled={isSubmitting}
                >
                  Create
                </button>
              </div>
            </Form>
          )}
        />
      </Fragment>
    )
  }
}

export default connect()(NewContact)