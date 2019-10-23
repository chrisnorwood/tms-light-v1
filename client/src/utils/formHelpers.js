// Takes in Shippers and Carriers object collections and turns them into array
// to be used by react-select in my ContactForms 
export const optionsArrayForShippersAndCarriers = (shippers, carriers) => {
  const shippersArray = Object.values(shippers).map(item => ({
    value: {
      type: 'Shipper',
      id: item.id,
    },
    label: item.company_name,
  }))

  const carriersArray = Object.values(carriers).map(item => ({
    value: {
      type: 'Carrier',
      id: item.id,
    },
    label: item.company_name,
  }))

  const combinedArray = shippersArray.concat(carriersArray)

  return combinedArray
}

// Takes in array of Contacts (already filtered out by mapStateToProps) to return
// an options array to be used by react-select in my ShipperForm and CarrierForm
export const optionsArrayOfContacts = (contactsArray) => {
  return contactsArray.map(contact => ({
    value: contact.id,
    label: contact.name
  }))
}

// Takes in array of Carriers or Shippers to return
// an options array to be used by react-select in my LoadForm
export const optionsArrayOfCompanies = (companiesObj) => {
  const companiesArray = Object.values(companiesObj)
  
  return companiesArray.map(company => ({
    value: company.id,
    label: company.company_name
  }))
}