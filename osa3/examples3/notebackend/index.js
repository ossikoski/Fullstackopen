// const http = require('http')    // ottaa käyttöön Noden sisäänrakennetun web-palvelimen määrittelevän moduulin.
const express = require('express')
const app = express()   //luodaan muuttujaan app sijoitettava express-sovellusta vastaava olio

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
  
  app.get('/api/notes', (req, res) => {     // Routeista toinen määrittelee tapahtumankäsittelijän, joka hoitaa sovelluksen
    res.json(notes)                         // polkuun /api/notes tulevia HTTP GET -pyyntöjä:
  })
  // lähettää HTTP-pyynnön vastaukseksi parametrina olevaa Javascript-olioa eli taulukkoa notes vastaavan JSON-muotoisen merkkijonon.
  // Nyt stringify-muutos tapahtuu automaattisesti expressillä

  

const PORT = 3001   // sitoo muuttujaan app sijoitetun http-palvelimen kuuntelemaan porttiin 3001 tulevia HTTP-pyyntöjä:
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})