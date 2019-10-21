import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { handleCreateContact } from '../../../actions/contacts'
import { optionsArrayForShippersAndCarriers } from '../../../utils/formHelpers'
import ModalContainer from '../ModalContainer'
import ContactForm from '../../forms/ContactForm'

const NewContact = ({ shippers, carriers, closePath, dispatch, history }) => {
  const handleSubmit = (values, setSubmitting) => {
    // Pass new data to API via action, history in case success can redirect,
    // Formik setSubmitting for callback in case of error
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

  const parentSelectOptions = optionsArrayForShippersAndCarriers(shippers, carriers)

  // If initial value desired for `parent` property, that is the 'select', it must be in the form of { type: string, id: int }
  const initialFormValues = {
    name: '',
    phone: '',
    email: '',
    notes: '',
    parent: {},
  }

  return (
    <ModalContainer closePath={closePath}>
      <div className='border-b border-grey py-2 font-bold text-black text-center text-lg tracking-widest uppercase'>
        Create New Contact
      </div>
      <ContactForm
        initialValues={initialFormValues}
        selectOptionsArray={parentSelectOptions}
        buttonText='Create'
        submitFunction={handleSubmit}
      />
    </ModalContainer>
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