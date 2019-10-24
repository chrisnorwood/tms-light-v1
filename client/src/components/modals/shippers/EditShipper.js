import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { handleUpdateShipper } from '../../../actions/shippers'
import { optionsArrayOfContacts } from '../../../utils/formHelpers'
import ModalContainer from '../ModalContainer'
import ShipperForm from '../../forms/ShipperForm'

const EditShipper = ({ shipper, shipperContacts, closePath, dispatch, history }) => {
  if (!shipper) return <ModalContainer closePath={closePath}><div className='text-center text-xl'>That is not a valid shipper.</div></ModalContainer>

  const handleSubmit = (values, setSubmitting) => {
    // Pass new data to API via action, history in case success can redirect,
    // Formik setSubmitting for callback in case of error
    const shipperValues = {
      shipper: {
        company_name: values.companyName,
        notes: values.notes,
        primary_contact_id: values.primaryContactId,
      }
    }

    console.log('Shipper object: ', shipperValues)
    const shipperId = shipper.id

    dispatch(handleUpdateShipper(shipperId, shipperValues, history, setSubmitting))
  }

  const contactSelectOptions = optionsArrayOfContacts(shipperContacts)

  const initialFormValues = {
    companyName: shipper.company_name,
    notes: shipper.notes,
    primaryContactId: (shipper.primary_contact_id) ? shipper.primary_contact_id : '',
  }

  return (
    <ModalContainer closePath={closePath}>
      <div className='border-b border-grey py-2 font-bold text-black text-center text-lg tracking-widest uppercase'>
        Edit Shipper
      </div>
      <ShipperForm
        initialValues={initialFormValues}
        selectOptionsArray={contactSelectOptions}
        buttonText='Save'
        submitFunction={handleSubmit}
      />
    </ModalContainer>
  )
}

EditShipper.propTypes = {
  shipper: PropTypes.object,
  shipperContacts: PropTypes.array,
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  closePath: PropTypes.string.isRequired,
}

function mapStateToProps (state, ownProps) {
  const shipperId = ownProps.match.params.shipperId
  const shipper = state.shippers[shipperId]
  // Use `==` in second comparator to implicitly convert contact.contactable_id from string to integer for comparison
  const shipperContacts = Object.values(state.contacts)
    // eslint-disable-next-line
    .filter(contact => contact.contactable_type === 'Shipper' && contact.contactable_id == shipperId)

  console.log(shipperContacts)

  return {
    shipper,
    shipperContacts,
  }
}

export default connect(mapStateToProps)(EditShipper)