import React, { useState } from 'react'
import axios from 'axios'
import PortfolioBuilder from './PortfolioBuilder'

//Assign api url
const API_URL = 'http://localhost:8000'

//App function
function App() {

  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (holdings) => {
    setLoading(true)
    const tickers = holdings.map((h) => h.ticker)
    const weights = holdings.map((h) => Number(h.weight) / 100)
    
    const response = await axios.post(`${API_URL}/risk-brief`, {
      tickers: tickers,
      weights: weights
    })
    
    setResult(response.data)
    setLoading(false)
  }

  return (

    //Size
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem' }}>

      {/* Header */}
      <h1>Fintech Risk Intelligence Platform</h1>

      {/* PortfolioBuilder */}
      <PortfolioBuilder onSubmit={handleSubmit} />

      {loading && <p>Generating risk brief — this takes about 60 seconds...</p>}
      {result && <pre>{JSON.stringify(result, null, 2)}</pre>}

    </div>
  )
}

export default App