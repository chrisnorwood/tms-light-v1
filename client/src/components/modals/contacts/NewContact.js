import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import Select from 'react-select';
import { handleCreateContact } from '../../../actions/contacts'
import ModalContainer from '../ModalContainer'

const NewContact = ({ shippers, carriers, closePath, dispatch, history }) => {
  const handleSubmit = (values, setSubmitting) => {
    // Pass new data to API via action,
    // history in case success can redirect,
    // Formik setSubmitting for callback in case of error
    // dispatch(handleUserSignup(values, history, setSubmitting))
    const contact = {
      contact: {
        name: values.name,
        email: values.email,
        phone: values.phone,
        notes: values.notes,
        contactable_type: values.parent.type,
        contactable_id: values.parent.id
      }
    }

    console.log('Contact object: ', contact)
    dispatch(handleCreateContact(contact, history, setSubmitting))
  }

  // Refactor this select options generation down into new helper function????
  // Could add
  const shippersArray = Object.values(shippers).map(item => ({
    value: {
      type: 'Shipper',
      id: item.id,
    },
    label: item.company_name,
  }))

  const carriersArray = Object.values(carriers).map(item => ({
    value: {
      type: 'Carrier',
      id: item.id,
    },
    label: item.company_name,
  }))

  const parentSelectOptions = shippersArray.concat(carriersArray)

  return (
    <ModalContainer closePath={closePath}>
      <div className='border-b border-grey py-2 font-bold text-black text-center text-lg tracking-widest uppercase'>
        Create New Contact
      </div>
      <Formik
        initialValues={{name: '', phone: '', email: '', notes: '', parent: {} }}
        validate={values => {
          const errors = {};
          if (!values.name) errors.name = 'Required'
          if (!values.phone) errors.phone = 'Required'
          if (!values.email) errors.email = 'Required'
          if (Object.keys(values.parent).length === 0 && values.parent.constructor === Object) errors.parent = 'Required'
          return errors
        }}
        onSubmit={(values, { setSubmitting }) => {
          // Passes values to submit handler, passes submitting for purposes of calling in action
          handleSubmit(values, setSubmitting)
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
                name='parent'
                component={MySelect}
                options={parentSelectOptions}
              />
              <ErrorMessage name='parent' component='div' className='ml-4 mt-2 text-red-600 text-xs' /> 
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
    </ModalContainer>
  )
}

const MySelect = ({ options, field, form }) => {
  const customStyles = {
    control: (base) => ({ ...base, borderColor: '#d5d9e3', padding: '0.25rem', borderRadius: '0px', color: '#626471'}),
    placeholder: (base) => ({...base, color: '#adb4c2'}),
    input: (base) => ({...base, color: '#626471'}),
    singleValue: (base) => ({...base, color: '#626471'}),
  }

  return (
    <Select
      options={options}
      placeholder='Select Shipper or Carrier...'
      name={field.name}
      value={options ? options.find(option => option.value === field.value) : ''}
      onChange={(option) => form.setFieldValue(field.name, option.value)}
      onBlur={field.onBlur}
      styles={customStyles}
    />
  )
}

NewContact.propTypes = {
  shippers: PropTypes.object.isRequired,
  carriers: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  closePath: PropTypes.string.isRequired,
}

function mapStateToProps ({ carriers, shippers }) {
  return {
    shippers,
    carriers
  }
}

export default connect(mapStateToProps)(NewContact)