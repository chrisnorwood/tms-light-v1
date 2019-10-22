import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { handleCreateCarrier } from '../../../actions/carriers'
import ModalContainer from '../ModalContainer'
import CarrierForm from '../../forms/CarrierForm'

const NewCarrier = ({ closePath, dispatch, history }) => {
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

    dispatch(handleCreateCarrier(carrierValues, history, setSubmitting))
  }

  const initialFormValues = {
    companyName: '',
    notes: '',
    primaryContactId: '',
  }

  return (
    <ModalContainer closePath={closePath}>
      <div className='border-b border-grey py-2 font-bold text-black text-center text-lg tracking-widest uppercase'>
        Create New Carrier
      </div>
      <CarrierForm
        initialValues={initialFormValues}
        selectOptionsArray={[]}
        buttonText='Create'
        submitFunction={handleSubmit}
      />
    </ModalContainer>
  )
}

NewCarrier.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  closePath: PropTypes.string.isRequired,
}

export default connect()(NewCarrier)