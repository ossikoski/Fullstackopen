import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS, GENRE_BOOKS } from '../queries'

const Books = (props) => {
  const [books, setBooks] = useState([])
  const [wantedBooks, setWantedBooks] = useState([])
  const [genre, setGenre] = useState('')

  const result = useQuery(ALL_BOOKS)
    
  const genres = []
  for(let book_index in books){
    for(let genre_index in books[book_index].genres){
      if(!genres.includes(books[book_index].genres[genre_index])){
        genres.push(books[book_index].genres[genre_index])
      }
    }
  }
  console.log('genres', genres)

  useEffect(() => {
    console.log('Book useEffect', genre)
    if(!result.loading){
      setBooks(result.data.allBooks)
      if(genre)
        setWantedBooks(result.data.allBooks.filter(b => b.genres.includes(genre)))
      else
        setWantedBooks(result.data.allBooks)
    }
  }, [genre, result.data])

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>books</h2>

      {
        genre ? 
          <div>
            in genre {genre}
          </div>
        :
          <div></div>
      }

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
          {wantedBooks.map(a =>
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>

      
      {genres.map(g => 
        <button key={g} onClick={() => setGenre(g)}>{g}</button>)
      }
      <button onClick={() => setGenre('')}>all genres</button>
    </div>
  )
}

export default Books