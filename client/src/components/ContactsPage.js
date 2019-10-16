import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactTable from 'react-table'

class ContactsPage extends Component {

  render() {
    const { contacts } = this.props
    const contactsArray = Object.values(contacts)
    const columns = [
      {
        Header: 'Contacts',
        columns: [
          {
            Header: 'Name',
            accessor: 'name',
          },
          {
            Header: 'Phone',
            accessor: 'phone',
          },
          {
            Header: 'Email',
            accessor: 'email',
          },
          {
            Header: 'Type',
            accessor: 'contactable_type',
          },
        ]
      }
    ]

    return (
      <div className='bg-white shadow-xl rounded-lg rounded-lg w-full p-6'>
        <div>
          <ReactTable
            data={contactsArray}
            columns={columns}
            className='-striped -highlight'
          />
        </div>
        <br /> <br />
        <table className='text-left w-full'>
          <thead className='text-black'>
            <tr>
              <th className='text-2xl bg-grey-dark p-2' colSpan='6'>Contacts</th>
            </tr>
            <tr className='text-xl bg-grey-light border-b-2 border-black italic mb-8'>
              <th className='p-2'>Name</th>
              <th className='p-2'>Phone</th>
              <th className='p-2'>Email</th>
              <th className='p-2'>Type</th>
              <th className='p-2'>Contactable ID</th>
              <th className='p-2'></th>
            </tr>
          </thead>
          <tbody className='text-lg'>
            {Object.keys(contacts).map(i => (
              <tr
                key={contacts[i].id}
                className='even:bg-grey-lighter'
              >
                <td className='p-2'>{contacts[i].name}</td>
                <td className='p-2'>{contacts[i].phone}</td>
                <td className='p-2'>{contacts[i].email}</td>
                <td className='p-2'>{contacts[i].contactable_type}</td>
                <td className='p-2'>{contacts[i].contactable_id}</td>
                <th className='p-2'>options here</th>
              </tr>
            ))}
          </tbody>
        </table>
        <pre>
          {JSON.stringify(contacts, null, 2)}
        </pre>
      </div>
    )
  }
}

function mapStateToProps({ contacts }) {
  return {
    contacts
  }
}

export default connect(mapStateToProps)(ContactsPage)