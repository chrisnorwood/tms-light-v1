import React from 'react'
import PropTypes from 'prop-types'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import Select from 'react-select';

const ContactForm = ({ initialValues, selectOptionsArray, buttonText, submitFunction }) => {
  return (
    <Formik
      initialValues={initialValues}
      validate={values => {
        const errors = {};
        if (!values.name) errors.name = 'Required'
        if (!values.phone) errors.phone = 'Required'
        if (!values.email) errors.email = 'Required'
        if (Object.keys(values.parent).length === 0 && values.parent.constructor === Object) errors.parent = 'Required'
        return errors
      }}
      onSubmit={(values, { setSubmitting }) => {
        // Passes values to submit handler, that was passed in as a prop, passes submitting for purposes of calling in action
        submitFunction(values, setSubmitting)
      }}
      render={({ errors, touched, isSubmitting }) => (
        <Form className='bg-grey-lightest px-10 py-8'>
          <div className='mb-3'>
            <label className='block ml-2 mb-2 text-sm font-bold' htmlFor='name'>Name</label>
            <Field
              className={`border w-full p-3 ${errors.name && touched.name ? 'border-red-600' : 'border-grey'}`}
              type='text'
              name='name'
              placeholder='Name'
            />
            <ErrorMessage name='name' component='div' className='ml-4 mt-2 text-red-600 text-xs' /> 
          </div>
          <div className='mb-3'>
            <label className='block ml-2 mb-2 text-sm font-bold' htmlFor='phone'>Phone</label>
            <Field
              className={`border w-full p-3 ${errors.phone && touched.phone ? 'border-red-600' : 'border-grey'}`}
              type='phone'
              name='phone'
              placeholder='Phone #'
            />
            <ErrorMessage name='phone' component='div' className='ml-4 mt-2 text-red-600 text-xs' /> 
          </div>
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
            <label className='block ml-2 mb-2 text-sm font-bold' htmlFor='parent'>Carrier/Shipper</label>
            <Field
              name='parent'
              component={MySelect}
              options={selectOptionsArray}
            />
            <ErrorMessage name='parent' component='div' className='ml-4 mt-2 text-red-600 text-xs' /> 
          </div>
          <div className='mb-3'>
            <label className='block ml-2 mb-2 text-sm font-bold' htmlFor='notes'>Notes</label>
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
              {buttonText}
            </button>
          </div>
        </Form>
      )}
    />
  )
}

ContactForm.propTypes = {
  initialValues: PropTypes.shape({
    name: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    notes: PropTypes.string.isRequired,
    parent: PropTypes.object.isRequired,
  }).isRequired,
  selectOptionsArray: PropTypes.array.isRequired,
  buttonText: PropTypes.string.isRequired,
  submitFunction: PropTypes.func.isRequired,
}

const MySelect = ({ options, field, form }) => {
  const customStyles = {
    control: (base) => ({ ...base, borderColor: '#d5d9e3', padding: '0.25rem', borderRadius: '0px', color: '#626471'}),
    placeholder: (base) => ({...base, color: '#adb4c2'}),
    input: (base) => ({...base, color: '#626471'}),
    singleValue: (base) => ({...base, color: '#626471'}),
  }

  // For INITIAL VALUE in this select, found in the ternary of `value=` prop
  // I must compare both the id and type off of the value object
  // in order to do a deep object comparison
  return (
    <Select
      options={options}
      placeholder='Select Shipper or Carrier...'
      name={field.name}
      value={options ? options.find(option => (option.value.id === field.value.id) && (option.value.type === field.value.type)) : ''}
      onChange={(option) => form.setFieldValue(field.name, option.value)}
      onBlur={field.onBlur}
      styles={customStyles}
    />
  )
}

export default ContactForm