import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Route, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import ReactTable from 'react-table'
import { FaEye, FaEdit, FaTrash, FaPlus } from 'react-icons/fa'
import NewLoad from './modals/loads/NewLoad'
import ViewLoad from './modals/loads/ViewLoad'
import EditLoad from './modals/loads/EditLoad'
import DeleteLoad from './modals/loads/DeleteLoad'

const LoadsPage = (props) => {
  const { loads, shippers, carriers, match } = props
  const loadsArray = Object.values(loads)

  const columns = [
    {
      Header: 'Loads',
      headerClassName: 'text-left bg-grey-dark text-black text-2xl tracking-wide',
      columns: [
        {
          Header: 'ID',
          accessor: 'id',
          headerClassName: 'bg-grey-light text-lg',
          maxWidth: 50,
        },
        {
          Header: 'Pick Up',
          accessor: 'pick_up',
          maxWidth: 125,
          headerClassName: 'bg-grey-light text-lg',
          
        },
        {
          Header: 'Delivery',
          accessor: 'delivery',
          maxWidth: 125,
          headerClassName: 'bg-grey-light text-lg',
          
        },
        {
          Header: 'Shipper',
          accessor: 'shipper_id',
          headerClassName: 'bg-grey-light text-lg',
          Cell: props => (
            shippers[props.value]
              ? shippers[props.value].company_name
              : 'Loading shipper...'
          )
        },
        {
          Header: 'Carrier',
          accessor: 'carrier_id',
          headerClassName: 'bg-grey-light text-lg',
          Cell: props => (
            carriers[props.value]
              ? carriers[props.value].company_name
              : 'Loading carrier...'
          )
        },
        {
          Header: 'Origin',
          accessor: 'origin',
          headerClassName: 'bg-grey-light text-lg',
        },
        {
          Header: 'Destination',
          accessor: 'destination',
          headerClassName: 'bg-grey-light text-lg',
        },
        {
          Header: 'Charged',
          accessor: 'amt_charged',
          headerClassName: 'bg-grey-light text-lg',
          maxWidth: 125,
          Cell: props => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(props.value)
          
        },
        {
          Header: 'Paid',
          accessor: 'amt_paid',
          headerClassName: 'bg-grey-light text-lg',
          maxWidth: 125,
          Cell: props => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(props.value)
          
        },
        {
          Header: 'Actions',
          headerClassName: 'bg-grey-light text-lg',
          sortable: false,
          filterable: false,
          maxWidth: 150,
          Cell: row => (
            <div className='table-actions'>
              <Link to={`${match.path}/${row.original.id}/view`}>
                <button className='view'>
                  <FaEye />
                </button>
              </Link>
              <Link to={`${match.path}/${row.original.id}/edit`}>
                <button className='edit'>
                  <FaEdit />
                </button>
              </Link>
              <Link to={`${match.path}/${row.original.id}/delete`}>
                <button className='delete'>
                  <FaTrash />
                </button>
              </Link>
            </div>
          )
        }
      ]
    }
  ]

  return (
    <Fragment>
      <div className='flex mb-4 px-4 justify-end'>
        <Link to={`${match.path}/new`} className='new-item-btn'>
            <span className='flex items-center'><FaPlus className='inline mr-1' />New Load</span>
        </Link>
      </div>
      <div className='bg-white shadow-xl rounded-lg w-full p-4'>
        <ReactTable
          data={loadsArray}
          columns={columns}
          defaultPageSize={10}
          defaultSorted={[{ id: 'id', desc: true }]}
          className='-striped -highlight'
        />

        <Route path={`${match.path}/new`} render={(props) => (
          <NewLoad {...props} closePath={match.path} />
        )} />

        <Route path={`${match.path}/:loadId/view`} render={(props) => (
          <ViewLoad {...props} closePath={match.path}/>
        )} />

        <Route path={`${match.path}/:loadId/edit`} render={(props) => (
          <EditLoad {...props} closePath={match.path}/>
        )} />

        <Route path={`${match.path}/:loadId/delete`} render={(props) => (
          <DeleteLoad {...props} closePath={match.path}/>
        )} />
      </div>
    </Fragment>
  )
}

LoadsPage.propTypes = {
  match: PropTypes.object.isRequired,
  loads: PropTypes.object.isRequired,
  shippers: PropTypes.object.isRequired,
  carriers: PropTypes.object.isRequired,
}

function mapStateToProps({ loads, shippers, carriers }) {
  return {
    loads,
    shippers,
    carriers,
  }
}

export default connect(mapStateToProps)(LoadsPage)