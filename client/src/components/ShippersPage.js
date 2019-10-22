import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Route, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import ReactTable from 'react-table'
import { FaEye, FaEdit, FaTrash, FaPlus } from 'react-icons/fa'
import NewShipper from './modals/shippers/NewShipper'
import ViewShipper from './modals/shippers/ViewShipper'
// import EditShipper from './modals/shippers/EditShipper'
import DeleteShipper from './modals/shippers/DeleteShipper'

const ShippersPage = (props) => {
  const { shippers, match } = props
  const shippersArray = Object.values(shippers)

  const columns = [
    {
      Header: 'Shippers',
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

            return (
              <Fragment>
                {contactId
                  ? contactId
                  : <span className='italic'>None</span>}
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
            <span className='flex items-center'><FaPlus className='inline mr-1' />New Shipper</span>
        </Link>
      </div>
      <div className='bg-white shadow-xl rounded-lg w-full p-4'>
        <ReactTable
          data={shippersArray}
          columns={columns}
          defaultPageSize={10}
          defaultSorted={[{ id: 'id', desc: true }]}
          className='-striped -highlight'
        />

        <Route path={`${match.path}/new`} render={(props) => (
          <NewShipper {...props} closePath={match.path} />
        )} />

        <Route path={`${match.path}/:shipperId/view`} render={(props) => (
          <ViewShipper {...props} closePath={match.path}/>
        )} />

        <Route path={`${match.path}/:shipperId/delete`} render={(props) => (
          <DeleteShipper {...props} closePath={match.path}/>
        )} />
      </div>
    </Fragment>
  )
}

ShippersPage.propTypes = {
  match: PropTypes.object.isRequired,
  shippers: PropTypes.object.isRequired,
}

function mapStateToProps({ shippers, contacts }) {
  return {
    shippers,
    contacts
  }
}

export default connect(mapStateToProps)(ShippersPage)