import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { handleCreateShipper } from '../../../actions/shippers'
// import { optionsArrayOfShipperContactsById } from '../../../utils/formHelpers'
import ModalContainer from '../ModalContainer'
import ShipperForm from '../../forms/ShipperForm'

const NewShipper = ({ shippers, contacts, closePath, dispatch, history }) => {
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
    dispatch(handleCreateShipper(shipperValues, history, setSubmitting))
  }

  // const contactSelectOptions = optionsArrayOfShipperContactsById(contacts, )

  // If initial value desired for `parent` property, that is the 'select', it must be in the form of { type: string, id: int }
  const initialFormValues = {
    companyName: '',
    notes: '',
    primaryContactId: '',
  }

  return (
    <ModalContainer closePath={closePath}>
      <div className='border-b border-grey py-2 font-bold text-black text-center text-lg tracking-widest uppercase'>
        Create New Shipper
      </div>
      <ShipperForm
        initialValues={initialFormValues}
        // selectOptionsArray={contactSelectOptions}
        buttonText='Create'
        submitFunction={handleSubmit}
      />
    </ModalContainer>
  )
}

NewShipper.propTypes = {
  shippers: PropTypes.object.isRequired,
  contacts: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  closePath: PropTypes.string.isRequired,
}

function mapStateToProps ({ shippers, contacts }) {
  return {
    shippers,
    contacts
  }
}

export default connect(mapStateToProps)(NewShipper)