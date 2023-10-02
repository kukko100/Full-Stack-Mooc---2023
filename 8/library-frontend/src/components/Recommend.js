import { useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import Books from './Books'
import { ME } from '../queries'

const Recommend = (props) => {
  const result = useQuery(ME)
  const [userFavoriteGenre, setUserFavoriteGenre] = useState('')

  useEffect(() => {
    try {
      setUserFavoriteGenre(result.data.me.favoriteGenre)
    } catch (error) {
      console.log(`result might be loading: ${result.loading}`)
    }
  }, [result])

  if (result.loading) {
    return <div>loading...</div>
  }

  if (!props.show) {
    return null
  }  

  return (
    <div>
      <h2>Recommendations</h2>
      <p>books in your favorite genre: {userFavoriteGenre}</p>
      <Books show={'Books'} books={props.books.filter((b) => b.genres.includes(userFavoriteGenre))}/>
    </div>
  )

}

export default Recommend