import React from 'react'
import axios from 'axios'
import TickerSearch from './TickerSearch'

//Assign api url
const API_URL = 'http://localhost:8000'

//App function
function App() {
  return (

    //Size
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem' }}>

      {/* Header */}
      <h1>Fintech Risk Intelligence Platform</h1>

      {/* Ticker Search dropdown */}
      <TickerSearch onSelect={(ticker) => console.log(ticker)} />

    </div>
  )
}

export default App