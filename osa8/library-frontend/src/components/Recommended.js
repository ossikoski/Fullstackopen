import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS, ME } from '../queries'

const Recommended = (props) => {
  const [books, setBooks] = useState([])

  const result = useQuery(ALL_BOOKS)
  const user = useQuery(ME)

  useEffect(() => {
    if(!result.loading && !user.loading){
      console.log('Recommended useEffect', user.data.me)
      setBooks(result.data.allBooks.filter(b => b.genres.includes(user.data.me.favoriteGenre)))
    }
  }, [result.data, user.data])

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>recommendations</h2>

      books in your favorite genre <b>{user.data.me.favoriteGenre}</b>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a =>
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Recommended