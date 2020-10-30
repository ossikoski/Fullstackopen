import React from 'react'
import { filterChange } from '../reducers/filterReducer'
import { connect, useDispatch } from 'react-redux'

const Filter = (props) => {
  const dispatch = useDispatch()

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