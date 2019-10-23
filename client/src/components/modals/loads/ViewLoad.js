import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import ModalContainer from '../ModalContainer'

const ViewLoad = ({ load, shipper, carrier, closePath }) => {
  if (!load) return <ModalContainer closePath={closePath}><div className='text-center text-xl'>That is not a valid load.</div></ModalContainer>

  return (
    <ModalContainer closePath={closePath}>
      <div className='border-b border-grey py-2 font-bold text-black text-center text-lg tracking-widest uppercase'>
        Load Details
      </div>
      <div className='m-4'>
        <ul className='labeled-list'>
          <li>
            <label>Pick Up</label>
            <div>{load.pick_up}</div>
          </li>
          <li>
            <label>Delivery</label>
            <div>{load.delivery}</div>
          </li>
          <li>
            <label>Shipper</label>
            <div>
              { shipper
                ? shipper.company_name
                : <span className='italic'>None</span>}
            </div>
          </li>
          <li>
            <label>Carrier</label>
            <div>
              { carrier
                ? carrier.company_name
                : <span className='italic'>None</span>}
            </div>
          </li>
          <li>
            <label>Charged</label>
            <div>
              {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(load.amt_charged)}
            </div>
          </li>
          <li>
            <label>Paid</label>
            <div>
              {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(load.amt_paid)}
            </div>
          </li>
          <li>
            <label>Origin</label>
            <div>{load.origin}</div>
          </li>
          <li>
            <label>Destination</label>
            <div>{load.destination}</div>
          </li>
          <li>
            <label>Weight</label>
            <div>{load.weight}</div>
          </li>
          <li>
            <label>Dims.</label>
            <div>{load.dims}</div>
          </li>
          <li>
            <label>Equipment</label>
            <div>{load.equipment}</div>
          </li>
          <li>
            <label>Notes</label>
            <div>{load.notes}</div>
          </li>
        </ul>
      </div>
      <div className='flex'>
        <Link
          to={closePath}
          className='bg-primary text-center w-full p-4 mt-3 mx-2 text-sm text-white uppercase font-bold tracking-wider hover:bg-primary-dark disabled:opacity-75 disabled:cursor-not-allowed'
        >
          Close
        </Link>
      </div>
    </ModalContainer>
  )
}

ViewLoad.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  closePath: PropTypes.string.isRequired,
  load: PropTypes.object,
  shipper: PropTypes.object,
  carrier: PropTypes.object,
}

function mapStateToProps (state, ownProps) {
  const loadId = ownProps.match.params.loadId
  const load = state.loads[loadId]
  let shipper, carrier = {}

  if (load) {
    const shipperId = load.shipper_id
    const carrierId = load.carrier_id
    shipper = state.shippers[shipperId]
    carrier = state.carriers[carrierId]
  }

  return {
    load,
    shipper,
    carrier,
  }
}

export default connect(mapStateToProps)(ViewLoad)