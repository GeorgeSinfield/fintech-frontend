import React, { useState } from 'react'
import TickerSearch from './TickerSearch'

//Function holds the portfolio items, use TickerSearch on the items, lets user enter weight of each item, then generates a risk brief of the portfolio.
function PortfolioBuilder({ onSubmit }) {

  //Creates holdings variable 
  const [holdings, setHoldings] = useState([])

  //Adds ticker to holdings
  const addTicker = (ticker) => {
  setHoldings([...holdings, { ticker: ticker, weight: 0 }])  
  }

  //Updates the weight of holdings
  const updateWeight = (index, weight) => {
  setHoldings(holdings.map((h, i) => i === index ? { ...h, weight: weight } : h))
  }

  //Removes holdings
  const removeTicker = (index) => {
  setHoldings(holdings.filter((_, i) => i !== index))
  }

  //Calculates and saves total weight
  const totalWeight = holdings.reduce((sum, h) => sum + Number(h.weight), 0)

  //Output
  return (
    <div>
      <TickerSearch onSelect={addTicker} />
      {holdings.map((h, i) => (
        <div key={h.ticker}>
          <span>{h.ticker}</span>
          <input
            type="number"
            value={h.weight}
            onChange={(e) => updateWeight(i, e.target.value)}
          />
          <button onClick={() => removeTicker(i)}>Remove</button>
        </div>
      ))}
      <p>Total: {totalWeight}%</p>
      <button
        disabled={totalWeight !== 100}
        onClick={() => onSubmit(holdings)}
      >
        Generate Risk Brief
      </button>
    </div>
  )
}

export default PortfolioBuilder