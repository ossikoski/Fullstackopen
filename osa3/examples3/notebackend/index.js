// const http = require('http')    // ottaa käyttöön Noden sisäänrakennetun web-palvelimen määrittelevän moduulin.
const express = require('express')
const app = express()   //luodaan muuttujaan app sijoitettava express-sovellusta vastaava olio

app.use(express.json()) // Auttaa POST-pyynnön bodyssa olevan muistiinpanon JSON-muotoisten tietojen parseamisessa
//  json-parserin toimintaperiaatteena on, että se ottaa pyynnön mukana olevan JSON-muotoisen datan, 
// muuttaa sen Javascript-olioksi ja sijoittaa request-olion kenttään body ennen kuin routen käsittelijää kutsutaan.

// Middleware funktio
const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
  }

app.use(requestLogger)


//sallii kaikista origineista tulevat pyynnöt kaikkiin backendin express routeihin:
const cors = require('cors')

app.use(cors())

let notes = [
    {
      id: 1,
      content: "HTML is easy",
      date: "2020-01-10T17:30:31.098Z",
      important: true
    },
    {
      id: 2,
      content: "Browser can execute only Javascript",
      date: "2020-01-10T18:39:34.091Z",
      important: false
    },
    {
      id: 3,
      content: "GET and POST are the most important methods of HTTP protocol",
      date: "2020-01-10T19:20:14.298Z",
      important: true
    }
  ]

//  const app = http.createServer((request, response) => {            // Headerin Content-Type arvolla application/json kerrotaan, 
//    response.writeHead(200, { 'Content-Type': 'application/json' }) // että kyse on JSON-muotoisesta datasta. Muuttujassa notes oleva taulukko muutetaan 
//    response.end(JSON.stringify(notes))                             // jsoniksi metodilla JSON.stringify(notes).
//  })

// Seuraavaksi määritellään sovellukselle kaksi routea.
app.get('/', (req, res) => {                // ensimmäinen määrittelee tapahtumankäsittelijän, 
    res.send('<h1>Hello World!</h1>')       // joka hoitaa sovelluksen juureen eli polkuun / tulevia HTTP GET -pyyntöjä
  })
  // Tapahtumankäsittelijäfunktiolla on kaksi parametria. Näistä ensimmäinen eli request sisältää kaikki HTTP-pyynnön tiedot
  // ja toisen parametrin response:n avulla määritellään, miten pyyntöön vastataan. 
  // Palvelin vastaa HTTP-pyyntöön lähettämällä selaimelle vastaukseksi send:in parametrina olevan merkkijonon
  // Koska parametri on merkkijono, asettaa express vastauksessa content-type-headerin arvoksi text/html, statuskoodiksi tulee oletusarvoisesti 200.
  

 // Routeista toinen määrittelee tapahtumankäsittelijän, joka hoitaa sovelluksen polkuun /api/notes tulevia HTTP GET -pyyntöjä:
  app.get('/api/notes', (request, response) => {
    response.json(notes)    // lähettää HTTP-pyynnön vastaukseksi parametrina olevaa Javascript-olioa eli taulukkoa notes vastaavan JSON-muotoisen merkkijonon.
  })                        // Nyt stringify-muutos tapahtuu automaattisesti expressillä
  

  app.get('/api/notes/:id', (request, response) => {    // käsittelee kaikki HTTP GET -pyynnöt, jotka ovat muotoa /api/notes/JOTAIN (ei sisälly api/notes) 
    const id = Number(request.params.id)
    const note = notes.find(note => note.id === id)
    if (note) {                 
        response.json(note)    
      } 
    else {
    response.status(404).end()
    // Koska vastaukseen ei nyt liity mitään dataa käytetään statuskoodin asettavan metodin status lisäksi metodia end 
    // ilmoittamaan siitä, että pyyntöön tulee vastata ilman dataa.
      }
  })

  // Poisto tapahtuu tekemällä HTTP DELETE -pyyntö resurssin urliin:
  app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)
  
    response.status(204).end()
    // Jos poisto onnistuu, eli poistettava muistiinpano on olemassa, vastataan statuskoodilla 204 no content sillä mukaan ei lähetetä mitään dataa.
  })

  const generateId = () => {
    const maxId = notes.length > 0
      ? Math.max(...notes.map(n => n.id))
      : 0
    return maxId + 1
  }

  app.post('/api/notes', (request, response) => {
    const body = request.body

    if (!body.content) {
        return response.status(400).json({ 
          error: 'content missing' 
        })
      }

    //const note = request.body   // Tapahtumankäsittelijäfunktio pääsee dataan käsiksi olion request kentän body avulla.
    //note.id = maxId + 1

    const note = {
        content: body.content,
        important: body.important || false,
        // kentän oletusarvo on false (eli jos kenttä important puuttuu)
        date: new Date(),
        id: generateId(),
    }

    notes = notes.concat(note)
  
    response.json(note)
  })

// saadaan routejen käsittelemättömistä virhetilanteista JSON-muotoinen virheilmoitus
const unknownEndpoint = (request, response) => {
response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = 3001   // sitoo muuttujaan app sijoitetun http-palvelimen kuuntelemaan porttiin 3001 tulevia HTTP-pyyntöjä:
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})