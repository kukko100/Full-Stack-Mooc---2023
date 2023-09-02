import { useDispatch } from 'react-redux'
import { filterChange } from '../reducers/filterReducer'

const Filter = () => {
  const dispatch = useDispatch()

  const filterContent = (event) => {
    event.preventDefault()
    const filterValue = event.target.value.toLowerCase()
    dispatch(filterChange(filterValue))
  }

  return (
    <div>
      filter
      <input onChange={filterContent}/>
      <br/>
      <br/>
    </div>
  )
}

export default Filter