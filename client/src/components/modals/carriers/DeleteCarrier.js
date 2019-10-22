import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { handleDeleteCarrier } from '../../../actions/carriers'
import ModalContainer from '../ModalContainer'

const DeleteCarrier = ({ closePath, carriers, match, history, dispatch }) => {
  const handleDelete = (carrierId) => {
    dispatch(handleDeleteCarrier(carrierId, history))
  }

  const { carrierId } = match.params
  const carrier = carriers[carrierId]

  if (!carrier) return <ModalContainer closePath={closePath}><div className='text-center text-xl'>That is not a valid carrier.</div></ModalContainer>

  return (
    <ModalContainer closePath={closePath}>
      <div className='border-b border-grey py-2 font-bold text-black text-center text-lg tracking-widest uppercase'>
        Are you sure?
      </div>
      <div className='m-4'>
        <h3 className='italic text-lg uppercase font-bold'>Delete:</h3>
        <p className='p-2'>
          <span className='italic pr-2'>ID:</span><span>{carrier.id}</span>
          <br />
          <span className='italic pr-2'>Name:</span><span>{carrier.company_name}</span>
        </p>
      </div>
      <div className='flex'>
        <Link
          to={closePath}
          className='bg-primary text-center w-1/2 p-4 mt-3 mx-2 text-sm text-white uppercase font-bold tracking-wider hover:bg-primary-dark disabled:opacity-75 disabled:cursor-not-allowed'
        >
          Cancel
        </Link>
        <button
          className='bg-red-700 w-1/2 p-4 mt-3 text-sm text-white uppercase font-bold tracking-wider hover:bg-red-800'
          onClick={() => handleDelete(carrierId)}
        >
          Delete
        </button>
      </div>
    </ModalContainer>
  )
}

DeleteCarrier.propTypes = {
  carriers: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  closePath: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
}

function mapStateToProps ({ carriers }) {
  return {
    carriers
  }
}

export default connect(mapStateToProps)(DeleteCarrier)