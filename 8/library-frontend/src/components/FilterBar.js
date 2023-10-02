import { useState } from "react"
import Books from "./Books"

const FilterBar = (props) => {
  const [filteredBooks, setFilteredBooks] = useState(props.books)
  const [filter, setFilter] = useState('all')

  const availableFilters = ['horror', 'horses', 'fantasy', 'crime']
  const handleFilterButton = (event) => {
    event.preventDefault()
    setFilter(event.target.textContent)
    if (event.target.textContent === 'all') {
      setFilteredBooks(props.books)
    } else {
      setFilteredBooks(props.books.filter((b) => b.genres.includes(event.target.textContent)))
    }
  }
  
  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>Books</h2>
      {availableFilters.map((genre) => (
        <button onClick={handleFilterButton} key={genre}>{genre}</button>
      ))}
      <button onClick={handleFilterButton}>all</button>
      <div>
        <h3>{filter}</h3>
      </div>
      <Books show={'books'} availableFilters={availableFilters} books={filteredBooks} />
    </div>
    
  )
}

export default FilterBar