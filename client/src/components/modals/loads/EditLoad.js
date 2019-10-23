import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { handleUpdateLoad } from '../../../actions/loads'
import { optionsArrayOfCompanies, isDateObject } from '../../../utils/formHelpers'
import ModalContainer from '../ModalContainer'
import LoadForm from '../../forms/LoadForm'

const EditLoad = ({ load, shippers, carriers, closePath, dispatch, history }) => {
  if (!load) return <ModalContainer closePath={closePath}><div className='text-center text-xl'>That is not a valid contact.</div></ModalContainer>

  const handleSubmit = (values, setSubmitting) => {
    // Pass new data to API via action, history in case success can redirect,
    // Formik setSubmitting for callback in case of error
    const loadValues = {
      load: {
        origin: values.origin,
        destination: values.destination,
        pick_up: isDateObject(values.pickUp) ? values.pickUp.toISOString().slice(0,10) : values.pickUp,
        delivery: isDateObject(values.delivery) ? values.delivery.toISOString().slice(0,10): values.pickUp,
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

    const loadId = load.id

    dispatch(handleUpdateLoad(loadId, loadValues, history, setSubmitting))
  }

  const carrierSelectOptions = optionsArrayOfCompanies(carriers)
  const shipperSelectOptions = optionsArrayOfCompanies(shippers)

  const initialFormValues = {
    origin: load.origin,
    destination: load.destination,
    pickUp: load.pick_up,
    delivery: load.delivery,
    amtCharged: load.amt_charged,
    amtPaid: load.amt_paid,
    weight: load.weight,
    dims: load.dims,
    equipment: load.equipment,
    notes: load.notes,
    shipperId: (load.shipper_id) ? load.shipper_id : '',
    carrierId: (load.carrier_id) ? load.carrier_id : '',
  }

  return (
    <ModalContainer closePath={closePath}>
      <div className='border-b border-grey py-2 font-bold text-black text-center text-lg tracking-widest uppercase'>
        Edit Load
      </div>
      <LoadForm
        initialValues={initialFormValues}
        shipperOptionsArray={shipperSelectOptions}
        carrierOptionsArray={carrierSelectOptions}
        buttonText='Save'
        submitFunction={handleSubmit}
      />
    </ModalContainer>
  )
}

EditLoad.propTypes = {
  load: PropTypes.object,
  shippers: PropTypes.object.isRequired,
  carriers: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  closePath: PropTypes.string.isRequired,
}

function mapStateToProps (state, ownProps) {
  const loadId = ownProps.match.params.loadId
  const load = state.loads[loadId]
  
  return {
    load,
    shippers: state.shippers,
    carriers: state.carriers,
  }
}

export default connect(mapStateToProps)(EditLoad)