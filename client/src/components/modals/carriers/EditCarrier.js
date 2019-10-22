import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { handleUpdateCarrier } from '../../../actions/carriers'
import { optionsArrayOfContacts } from '../../../utils/formHelpers'
import ModalContainer from '../ModalContainer'
import CarrierForm from '../../forms/CarrierForm'

const EditCarrier = ({ carrier, carrierContacts, closePath, dispatch, history }) => {
  if (!carrier) return <ModalContainer closePath={closePath}><div className='text-center text-xl'>That is not a valid carrier.</div></ModalContainer>

  const handleSubmit = (values, setSubmitting) => {
    // Pass new data to API via action, history in case success can redirect,
    // Formik setSubmitting for callback in case of error
    const carrierValues = {
      carrier: {
        company_name: values.companyName,
        notes: values.notes,
        primary_contact_id: values.primaryContactId,
      }
    }

    console.log('Carrier object: ', carrierValues)
    const carrierId = carrier.id

    dispatch(handleUpdateCarrier(carrierId, carrierValues, history, setSubmitting))
  }

  const contactSelectOptions = optionsArrayOfContacts(carrierContacts)

  const initialFormValues = {
    companyName: carrier.company_name,
    notes: carrier.notes,
    primaryContactId: (carrier.primary_contact_id) ? carrier.primary_contact_id : '',
  }

  return (
    <ModalContainer closePath={closePath}>
      <div className='border-b border-grey py-2 font-bold text-black text-center text-lg tracking-widest uppercase'>
        Edit Carrier
      </div>
      <CarrierForm
        initialValues={initialFormValues}
        selectOptionsArray={contactSelectOptions}
        buttonText='Save'
        submitFunction={handleSubmit}
      />
    </ModalContainer>
  )
}

EditCarrier.propTypes = {
  carrier: PropTypes.object,
  carrierContacts: PropTypes.array,
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  closePath: PropTypes.string.isRequired,
}

function mapStateToProps (state, ownProps) {
  const carrierId = ownProps.match.params.carrierId
  const carrier = state.carriers[carrierId]
  // Use `==` in second comparator to implicitly convert contact.contactable_id from string to integer for comparison
  const carrierContacts = Object.values(state.contacts)
    .filter(contact => contact.contactable_type === 'Carrier' && contact.contactable_id == carrierId)

  return {
    carrier,
    carrierContacts,
  }
}

export default connect(mapStateToProps)(EditCarrier)