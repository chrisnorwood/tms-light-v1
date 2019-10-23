import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { handleDeleteLoad } from '../../../actions/loads'
import ModalContainer from '../ModalContainer'

const DeleteLoad = ({ closePath, loads, match, history, dispatch }) => {
  const handleDelete = (loadId) => {
    dispatch(handleDeleteLoad(loadId, history))
  }

  const { loadId } = match.params
  const load = loads[loadId]

  if (!load) return <ModalContainer closePath={closePath}><div className='text-center text-xl'>That is not a valid load.</div></ModalContainer>

  return (
    <ModalContainer closePath={closePath}>
      <div className='border-b border-grey py-2 font-bold text-black text-center text-lg tracking-widest uppercase'>
        Are you sure?
      </div>
      <div className='m-4'>
        <h3 className='italic text-lg uppercase font-bold'>Delete:</h3>
        <p className='p-2'>
          <span className='italic pr-2'>ID:</span><span>{load.id}</span>
          <br />
          <span className='italic pr-2'>Origin:</span><span>{load.origin}</span>
          <br />
          <span className='italic pr-2'>Destination:</span><span>{load.destination}</span>
          <br />
          <span className='italic pr-2'>Pick Up:</span><span>{load.pick_up}</span>
          <br />
          <span className='italic pr-2'>Delivery:</span><span>{load.delivery}</span>
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
          onClick={() => handleDelete(loadId)}
        >
          Delete
        </button>
      </div>
    </ModalContainer>
  )
}

DeleteLoad.propTypes = {
  loads: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  closePath: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
}

function mapStateToProps ({ loads }) {
  return {
    loads
  }
}

export default connect(mapStateToProps)(DeleteLoad)