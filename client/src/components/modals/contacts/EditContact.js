import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { handleUpdateContact } from '../../../actions/contacts'
import { optionsArrayForShippersAndCarriers } from '../../../utils/formHelpers'
import ModalContainer from '../ModalContainer'
import ContactForm from '../../forms/ContactForm'

const EditContact = ({ contact, shippers, carriers, closePath, dispatch, history }) => {
  if (!contact) return <ModalContainer closePath={closePath}><div className='text-center text-xl'>That is not a valid contact.</div></ModalContainer>

  const handleSubmit = (values, setSubmitting) => {
    // Pass new data to API via action, history in case success can redirect,
    // Formik setSubmitting for callback in case of error
    const contactValues = {
      contact: {
        name: values.name,
        email: values.email,
        phone: values.phone,
        notes: values.notes,
        contactable_type: values.parent.type,
        contactable_id: values.parent.id
      }
    }

    const contactId = contact.id

    dispatch(handleUpdateContact(contactId, contactValues, history, setSubmitting))
  }

  const parentSelectOptions = optionsArrayForShippersAndCarriers(shippers, carriers)

  // If initial value desired for parent property, that is the 'select', it must be in the form of { type: string, id: int }
  const initialFormValues = { 
    name: contact.name,
    phone: contact.phone,
    email: contact.email,
    notes: contact.notes,
    parent: {
      type: contact.contactable_type,
      id: contact.contactable_id,
    },
  }

  return (
    <ModalContainer closePath={closePath}>
      <div className='border-b border-grey py-2 font-bold text-black text-center text-lg tracking-widest uppercase'>
        Edit Contact
      </div>
      <ContactForm
        initialValues={initialFormValues}
        selectOptionsArray={parentSelectOptions}
        buttonText='Save'
        submitFunction={handleSubmit}
      />
    </ModalContainer>
  )
}

EditContact.propTypes = {
  contact: PropTypes.object,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  closePath: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
}

function mapStateToProps (state, ownProps) {
  const contactId = ownProps.match.params.contactId
  const contact = state.contacts[contactId]

  return {
    contact,
    carriers: state.carriers,
    shippers: state.shippers,
  }
}

export default connect(mapStateToProps)(EditContact)