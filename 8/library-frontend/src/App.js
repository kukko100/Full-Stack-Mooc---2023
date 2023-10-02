import { useState } from 'react'
import Authors from './components/Authors'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommend from './components/Recommend'
import { useApolloClient, useQuery, useSubscription } from '@apollo/client'
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";
import FilterBar from './components/FilterBar'
import { BOOK_ADDED, ALL_BOOKS, ALL_AUTHORS, AUTHOR_ADDED } from './queries'

export const updateBookCache = (cache, query, addedBook) => {
  const uniqByName = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.title
      return seen.has(k) ? false : seen.add(k) 
    })
  }

  cache.updateQuery(query, ({ allBooks }) => {
    try {
      return {
        allBooks: uniqByName(allBooks.concat(addedBook))
      }
    } catch (error) {
      console.log("error here: ", error)
    }
    
  })
}

export const updateAuthorCache = (cache, query, addedAuthor) => {
  const uniqByName = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.name
      return seen.has(k) ? false : seen.add(k) 
    })
  }

  cache.updateQuery(query, ({ allAuthors }) => {
    try {
      return {
        allAuthors: uniqByName(allAuthors.concat(addedAuthor))
      }
    } catch (error) {
      console.log(error)
    }
  })
}


const App = () => {
  const booksResult = useQuery(ALL_BOOKS)
  const authorsResult = useQuery(ALL_AUTHORS)
  const [page, setPage] = useState('recommend')
  const [token, setToken] = useState(localStorage.getItem('library-user-token'))
  const client = useApolloClient()

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      try {
        const addedBook = data.data.bookAdded
        updateBookCache(client.cache, { query: ALL_BOOKS }, addedBook)
        console.log((`book ${addedBook.title} added in App`))
      } catch (error) {
        console.log('waiting for update...')
      }
      
    }
  })

  useSubscription(AUTHOR_ADDED, {
    onData: ({ data }) => {
      try {
        const addedAuthor = data.data.authorAdded
        updateAuthorCache(client.cache, { query: ALL_AUTHORS }, addedAuthor)
        console.log(`author ${addedAuthor.name} added in App`)
      } catch (error) {
        console.log('waiting for update... ')
      }
    }
  })


  loadErrorMessages()
  loadDevMessages()

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('recommend')
  }

  if (booksResult.loading || authorsResult.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      {localStorage.getItem('library-user-token') &&
        <div>
          <button onClick={() => setPage('authors')}>authors</button>
          <button onClick={() => setPage('books')}>books</button>
          <button onClick={() => setPage('add')}>add book</button>
          <button onClick={() => setPage('recommend')}>recommend</button>
          <button onClick={logout}>logout</button>
        </div>
      }
      {!localStorage.getItem('library-user-token') &&
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <LoginForm setToken={setToken} show={page === 'login'}/>
        
      </div>
      }

      <Authors show={page === 'authors'} authors={authorsResult.data.allAuthors} />
      <FilterBar show={page === 'books'} books={booksResult.data.allBooks} />
      <NewBook show={page === 'add'} />
      <Recommend show={page === 'recommend'} books={booksResult.data.allBooks} />
      
    </div>
  )
}

export default App
