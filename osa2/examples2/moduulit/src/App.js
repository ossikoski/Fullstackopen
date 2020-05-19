import React, { useState, useEffect } from 'react'
import Note from './components/Note'
import axios from 'axios'

const App = () => {
  const [notes, setNotes] = useState([])            // Tämä tila vaihtuu kun klikataan sublit, tätä käsittelee addNote
  const [newNote, setNewNote] = useState('')        // Tämä tila vaihtuu aina kun lomakkeeseen kirjoitetaan ja tätä käsittelee handleNoteState = "Tila heijastaa syötekentän arvoa"
  // "placeholder"-teksti (nyt tyhjä) ilmestyy aluksi syötekomponenttiin.
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/notes')
      .then(response => {
        console.log('promise fulfilled')
        setNotes(response.data)
      })
  }, [])
  console.log('render', notes.length, 'notes')

  const addNote = (event) => {         // Event handler form elementille jota kutsutaan kun klikataan submit
    event.preventDefault()             // Prevents submitting a form -> ei päivitä sivua
    const noteObject = {               // Uutta muistiinpanoa vastaava olio
      content: newNote,                // Sisältö syötekentän tilasta
      date: new Date().toISOString(),
      important: Math.random > 0.5,    // 50% todennäköisyydellä muistiinpano on tärkeä :D
      id: notes.lenght + 1             // id generoidaan määrän perusteella -> Toimii koska muistiinpanoja ei voi poistaa
    }

    setNotes(notes.concat(noteObject))    // Tilan muuttaminen!
    setNewNote('')                        // Muuttaa myös syötekentän tilan tyhjäksi
  }

  const handleNoteChange = (event) => {   // Ei tarvitse preventDefaultia, koska syötekentän muutoksella ei oletusarvoista toimintaa, 
    console.log(event.target.value)       //toisin kuin lomakkeen lähettämisellä
    setNewNote(event.target.value)
  }

  const notesToShow = showAll             // Ehdollinen operaattori: Jos showAll = true, näytetään notes kokonaan, jos false niin filtteröitynä
    ? notes
    : notes.filter(note => note.important)

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map((note, i) => 
          <Note key={i} note={note} />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input 
          value={newNote} 
          onChange={handleNoteChange}
        />
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default App