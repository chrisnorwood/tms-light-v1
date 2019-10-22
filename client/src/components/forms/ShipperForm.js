import React from 'react'
import PropTypes from 'prop-types'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import Select from 'react-select';

const ShipperForm = ({ initialValues, selectOptionsArray, buttonText, submitFunction }) => {
  return (
    <Formik
      initialValues={initialValues}
      validate={values => {
        const errors = {};
        if (!values.companyName) errors.companyName = 'Required'
        return errors
      }}
      onSubmit={(values, { setSubmitting }) => {
        // Passes values to submit handler, that was passed in as a prop, passes submitting for purposes of calling in action
        submitFunction(values, setSubmitting)
      }}
      render={({ errors, touched, isSubmitting }) => (
        <Form className='bg-grey-lightest px-10 py-8'>
          <div className='mb-3'>
            <label className='block ml-2 mb-2 text-sm font-bold' htmlFor='companyName'>Company Name</label>
            <Field
              className={`border w-full p-3 ${errors.name && touched.name ? 'border-red-600' : 'border-grey'}`}
              type='text'
              name='companyName'
              placeholder='Company Name'
            />
            <ErrorMessage name='companyName' component='div' className='ml-4 mt-2 text-red-600 text-xs' /> 
          </div>
          
            <div className='mb-3'>
              <label className='block ml-2 mb-2 text-sm font-bold' htmlFor='primaryContactId'>Primary Contact</label>
              <Field
                name='primaryContactId'
                component={MySelect}
                options={selectOptionsArray}
              />
            </div>
          <div className='mb-3'>
            <label className='block ml-2 mb-2 text-sm font-bold' htmlFor='name'>Notes</label>
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

ShipperForm.propTypes = {
  initialValues: PropTypes.shape({
    companyName: PropTypes.string.isRequired,
    notes: PropTypes.string.isRequired,
    primaryContactId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  }).isRequired,
  selectOptionsArray: PropTypes.array,
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
      placeholder='Select Primary Contact...'
      name={field.name}
      value={options ? options.find(option => option.value === field.value) : ''}
      onChange={(option) => {
        // the following variable allows for option to be reset to null via isClearable prop
        const newValue = option ? option.value : ''
        return form.setFieldValue(field.name, newValue)
      }}
      onBlur={field.onBlur}
      styles={customStyles}
      isClearable={true}
    />
  )
}

export default ShipperForm