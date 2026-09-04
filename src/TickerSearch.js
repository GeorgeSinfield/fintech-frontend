import React, { useState } from 'react'
import axios from 'axios'

const API_URL = 'http://localhost:8000'

//Function that
function TickerSearch({ onSelect }) {

  //Creating state variables
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])

  //Creating event handler
  const handleSearch = async (e) => {
    const value = e.target.value
    setQuery(value)
    
    //Early return
    if (value.length < 2) {
      setResults([])
      return
    }

    //API get search-ticker
    const response = await axios.get(`${API_URL}/search-ticker`, {
        params: {query: value}
    })

    //Stores search-ticker response
    setResults(response.data)
  }

  //returns search-ticker drop down
  return (
    <div>
      <input
        value={query}
        onChange={handleSearch}
        placeholder="Search for a company..."
      />
      {results.map((result) => (
        <div
          key={result.symbol}
          onClick={() => {
            onSelect(result.symbol)
            setQuery(result.longname)
            setResults([])
          }}
        >
          {result.symbol} — {result.longname}
        </div>
      ))}
    </div>
  )
}

export default TickerSearch