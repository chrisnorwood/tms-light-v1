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