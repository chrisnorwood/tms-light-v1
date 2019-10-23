import React from 'react'
import PropTypes from 'prop-types'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import Select from 'react-select';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const LoadForm = ({ initialValues, shipperOptionsArray, carrierOptionsArray, buttonText, submitFunction }) => {
  return (
    <Formik
      initialValues={initialValues}
      validate={values => {
        const errors = {};
        if (!values.origin) errors.origin = 'Required'
        if (!values.destination) errors.destination = 'Required'
        if (!values.shipperId) errors.shipperId = 'Required'
        return errors
      }}
      onSubmit={(values, { setSubmitting }) => {
        // Passes values to submit handler, that was passed in as a prop, passes submitting for purposes of calling in action
        submitFunction(values, setSubmitting)
      }}
      render={({ errors, touched, isSubmitting, setFieldValue, values }) => (
        <Form className='bg-grey-lightest px-10 py-8'>
          <div className='mb-3 flex justify-between'>
            <div className='w-1/2 pr-2'>
              <label className='block ml-2 mb-2 text-sm font-bold' htmlFor='origin'>Origin</label>
              <Field
                className={`border w-full p-3 ${errors.origin && touched.origin ? 'border-red-600' : 'border-grey'}`}
                type='text'
                name='origin'
                placeholder='Origin'
              />
              <ErrorMessage name='origin' component='div' className='ml-4 mt-2 text-red-600 text-xs' />
            </div>
            <div className='w-1/2 pl-2'>
              <label className='block ml-2 mb-2 text-sm font-bold' htmlFor='destination'>Destination</label>
              <Field
                className={`border w-full p-3 ${errors.destination && touched.destination ? 'border-red-600' : 'border-grey'}`}
                type='text'
                name='destination'
                placeholder='Destination'
              />
              <ErrorMessage name='destination' component='div' className='ml-4 mt-2 text-red-600 text-xs' /> 
            </div>
          </div>
        
          <div className='mb-3 flex justify-between'>
            <div className='w-1/2 pr-2'>
              <label className='block ml-2 mb-2 text-sm font-bold' htmlFor='pickUp'>Pick Up</label>
              <DatePickerField
                name='pickUp'
                value={values.pickUp}
                onChange={setFieldValue}
              />
            </div>

            <div className='w-1/2 pl-2'>
              <label className='block ml-2 mb-2 text-sm font-bold' htmlFor='delivery'>Delivery</label>
              <DatePickerField
                name='delivery'
                value={values.delivery}
                onChange={setFieldValue}
              />
            </div>
          </div>

          <div className='mb-3 flex justify-between'>
            <div className='w-1/2 pr-2'>
              <label className='block ml-2 mb-2 text-sm font-bold' htmlFor='amtCharged'>Charged ($)</label>
              <Field
                className={`border w-full p-3 border-grey`}
                type='text'
                name='amtCharged'
                placeholder='Amount Charged...'
              />
            </div>
            <div className='w-1/2 pl-2'>
              <label className='block ml-2 mb-2 text-sm font-bold' htmlFor='amtPaid'>Paid ($)</label>
              <Field
                className={`border w-full p-3 border-grey`}
                type='text'
                name='amtPaid'
                placeholder='Amount Paid...'
              />
            </div>
          </div>

          <div className='mb-3'>
            <label className='block ml-2 mb-2 text-sm font-bold' htmlFor='shipperId'>Shipper</label>
            <Field
              name='shipperId'
              component={MySelect}
              options={shipperOptionsArray}
              placeholder='Select Shipper...'
            />
            {errors.shipperId
              ? <div className='ml-4 mt-2 text-red-600 text-xs'>{errors.shipperId}</div>
              : null}
          </div>

          <div className='mb-3'>
            <label className='block ml-2 mb-2 text-sm font-bold' htmlFor='carrierId'>Carrier</label>
            <Field
              name='carrierId'
              component={MySelect}
              options={carrierOptionsArray}
              placeholder='Select Carrier...'
              isClearable={true}
            />
          </div>

          <div className='mb-3 flex justify-between'>
            <div className='w-1/2 pr-2'>
              <label className='block ml-2 mb-2 text-sm font-bold' htmlFor='weight'>Weight (lbs)</label>
              <Field
                className={`border w-full p-3 border-grey`}
                type='text'
                name='weight'
                placeholder='Weight'
              />
            </div>
            <div className='w-1/2 pl-2'>
              <label className='block ml-2 mb-2 text-sm font-bold' htmlFor='dims'>Dimensions (LxWxH)</label>
              <Field
                className={`border w-full p-3 border-grey`}
                type='text'
                name='dims'
                placeholder='Dimensions'
              />
            </div>
          </div>

          <div className='mb-3'>
            <label className='block ml-2 mb-2 text-sm font-bold' htmlFor='equipment'>Equipment</label>
            <Field
              className={`border w-full p-3 border-grey`}
              type='text'
              name='equipment'
              placeholder='Equipment'
            />
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

LoadForm.propTypes = {
  initialValues: PropTypes.shape({
    origin: PropTypes.string.isRequired,
    destination: PropTypes.string.isRequired,
    pickUp: PropTypes.string.isRequired,
    delivery: PropTypes.string.isRequired,
    amtCharged: PropTypes.string.isRequired,
    amtPaid: PropTypes.string.isRequired,
    weight: PropTypes.string.isRequired,
    dims: PropTypes.string.isRequired,
    equipment: PropTypes.string.isRequired,
    notes: PropTypes.string.isRequired,
    shipperId: PropTypes.string.isRequired,
    carrierId: PropTypes.string.isRequired,
  }).isRequired,
  shipperOptionsArray: PropTypes.array.isRequired,
  carrierOptionsArray: PropTypes.array.isRequired,
  buttonText: PropTypes.string.isRequired,
  submitFunction: PropTypes.func.isRequired,
}

const MySelect = ({ options, field, form, placeholder, isClearable=false }) => {
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
      placeholder={placeholder}
      name={field.name}
      value={options ? options.find(option => option.value === field.value) : ''}
      onChange={(option) => {
        // the following variable allows for option to be reset to null via isClearable prop
        const newValue = option ? option.value : ''
        return form.setFieldValue(field.name, newValue)
      }}
      onBlur={field.onBlur}
      styles={customStyles}
      isClearable={isClearable}
    />
  )
}

const DatePickerField = ({ name, value, onChange }) => {
  return (
    <div className='customDatePickerWidth'>
      <DatePicker
        className={`border p-3 border-grey`}
        dateFormat='yyyy/MM/dd'
        selected={(value && new Date(value)) || null}
        onChange={val => {
          onChange(name, val)
        }}
      />
    </div>
  )
}

export default LoadForm