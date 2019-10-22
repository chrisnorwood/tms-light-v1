import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Route, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import ReactTable from 'react-table'
import { FaEye, FaEdit, FaTrash, FaPlus } from 'react-icons/fa'
import NewCarrier from './modals/carriers/NewCarrier'
import ViewCarrier from './modals/carriers/ViewCarrier'
import EditCarrier from './modals/carriers/EditCarrier'
import DeleteCarrier from './modals/carriers/DeleteCarrier'

const CarriersPage = (props) => {
  const { carriers, contacts, match } = props
  const carriersArray = Object.values(carriers)

  const columns = [
    {
      Header: 'Carriers',
      headerClassName: 'text-left bg-grey-dark text-black text-2xl tracking-wide',
      columns: [
        {
          Header: 'ID',
          accessor: 'id',
          headerClassName: 'bg-grey-light text-lg',
          maxWidth: 50,
        },
        {
          Header: 'Company',
          accessor: 'company_name',
          headerClassName: 'bg-grey-light text-lg',
          
        },
        {
          Header: 'Notes',
          accessor: 'notes',
          headerClassName: 'bg-grey-light text-lg',
        },
        {
          Header: 'Primary Contact',
          headerClassName: 'bg-grey-light text-lg',
          maxWidth: 150,
          Cell: row => {
            const contactId = row.original.primary_contact_id
            const contact = contacts[contactId]
            const contactName = contact
              ? contact.name
              : <span className='italic'>None</span>

            return (
              <Fragment>
                {contactName}
              </Fragment>
            )
          }
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
            <span className='flex items-center'><FaPlus className='inline mr-1' />New Carrier</span>
        </Link>
      </div>
      <div className='bg-white shadow-xl rounded-lg w-full p-4'>
        <ReactTable
          data={carriersArray}
          columns={columns}
          defaultPageSize={10}
          defaultSorted={[{ id: 'id', desc: true }]}
          className='-striped -highlight'
        />

        <Route path={`${match.path}/new`} render={(props) => (
          <NewCarrier {...props} closePath={match.path} />
        )} />

        <Route path={`${match.path}/:carrierId/view`} render={(props) => (
          <ViewCarrier {...props} closePath={match.path}/>
        )} />

        {/* <Route path={`${match.path}/:carrierId/edit`} render={(props) => (
          <EditCarrier {...props} closePath={match.path}/>
        )} />

        <Route path={`${match.path}/:carrierId/delete`} render={(props) => (
          <DeleteCarrier {...props} closePath={match.path}/>
        )} /> */}
      </div>
    </Fragment>
  )
}

CarriersPage.propTypes = {
  match: PropTypes.object.isRequired,
  carriers: PropTypes.object.isRequired,
}

function mapStateToProps({ carriers, contacts }) {
  return {
    carriers,
    contacts
  }
}

export default connect(mapStateToProps)(CarriersPage)