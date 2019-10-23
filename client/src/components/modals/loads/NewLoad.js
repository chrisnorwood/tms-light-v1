import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
// import { handleCreateLoad } from '../../../actions/loads'
import { optionsArrayOfCompanies } from '../../../utils/formHelpers'
import ModalContainer from '../ModalContainer'
import LoadForm from '../../forms/LoadForm'

const NewLoad = ({ shippers, carriers, closePath, dispatch, history }) => {
  const handleSubmit = (values, setSubmitting) => {
    // Pass new data to API via action, history in case success can redirect,
    // Formik setSubmitting for callback in case of error
    const loadValues = {
      load: {
        origin: values.origin,
        destination: values.destination,
        pick_up: values.pickUp ? values.pickUp.toISOString().slice(0,10) : '',
        delivery: values.delivery ? values.delivery.toISOString().slice(0,10): '',
        amt_charged: values.amtCharged,
        amt_paid: values.amtPaid,
        weight: values.weight,
        dims: values.dims,
        equipment: values.weight,
        notes: values.notes,
        shipper_id: values.shipperId,
        carrier_id: values.carrierId,
      }
    }

    console.log('Load object: ', loadValues)
    // dispatch(handleCreateLoad(loadValues, history, setSubmitting))
  }

  const carrierSelectOptions = optionsArrayOfCompanies(carriers)
  const shipperSelectOptions = optionsArrayOfCompanies(shippers)

  const initialFormValues = {
    origin: '',
    destination: '',
    pickUp: '',
    delivery: '',
    amtCharged: '',
    amtPaid: '',
    weight: '',
    dims: '',
    equipment: '',
    notes: '',
    shipperId: '',
    carrierId: '',
  }

  return (
    <ModalContainer closePath={closePath}>
      <div className='border-b border-grey py-2 font-bold text-black text-center text-lg tracking-widest uppercase'>
        Create New Load
      </div>
      <LoadForm
        initialValues={initialFormValues}
        shipperOptionsArray={shipperSelectOptions}
        carrierOptionsArray={carrierSelectOptions}
        buttonText='Create'
        submitFunction={handleSubmit}
      />
    </ModalContainer>
  )
}

NewLoad.propTypes = {
  shippers: PropTypes.object.isRequired,
  carriers: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  closePath: PropTypes.string.isRequired,
}

function mapStateToProps ({ shippers, carriers }) {
  return {
    shippers,
    carriers
  }
}

export default connect(mapStateToProps)(NewLoad)