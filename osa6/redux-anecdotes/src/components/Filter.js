import React from 'react'
import { filterChange } from '../reducers/filterReducer'
import { connect } from 'react-redux'

const Filter = (props) => {
  const handleFilterChange = (event) => {
    console.log('event target value', event.target.value)
    event.preventDefault()
    const filter = event.target.value
    props.filterChange(filter)
  }

  return (
    <div>
      filter
      <input 
        name="filter" 
        onChange={handleFilterChange}
      />
    </div>
  )
}

export default connect(
  null,
  { filterChange }
)(Filter)