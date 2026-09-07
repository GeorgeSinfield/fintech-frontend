import React, { useState } from 'react'
import axios from 'axios'
import PortfolioBuilder from './PortfolioBuilder'
import RiskBriefDisplay from './RiskBriefDisplay'
import PortfolioDashboard from './PortfolioDashboard'
import TenKUpload from './10KUpload'

//Assign api url
const API_URL = 'http://localhost:8000'

//App function
function App() {

  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (holdings) => {
    setLoading(true)
    setError(null)
    try {
      const tickers = holdings.map((h) => h.ticker)
      const weights = holdings.map((h) => Number(h.weight) / 100)
      const response = await axios.post(`${API_URL}/risk-brief`, {
        tickers: tickers,
        weights: weights
      })
      setResult(response.data)
    } catch (err) {
      setError("Something went wrong generating the brief. Please try again.")
    }
    setLoading(false)
  }

  return (

    //Size
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem' }}>

      {/* Header */}
      <h1>Fintech Risk Intelligence Platform</h1>

      {/* PortfolioBuilder */}
      <PortfolioBuilder onSubmit={handleSubmit} />

      {/* 10KUpload */}
      <TenKUpload/>

      {/* Error handling  */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {loading && <p>Generating risk brief — this takes about 60 seconds...</p>}

      {result && <PortfolioDashboard metrics={result.metrics} />}

      {result && <RiskBriefDisplay result={result.brief} />}

    </div>
  )
}
export default App