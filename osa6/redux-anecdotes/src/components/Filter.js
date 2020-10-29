import React from 'react'
import { filterChange } from '../reducers/filterReducer'
import { useDispatch } from 'react-redux'

const Filter = () => {
  const dispatch = useDispatch()

  const handleFilterChange = (event) => {
    console.log('event target value', event.target.value)
    event.preventDefault()
    const filter = event.target.value
    dispatch(filterChange(filter))
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

export default Filter