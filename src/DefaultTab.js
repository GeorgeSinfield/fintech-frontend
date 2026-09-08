import React, { useState } from 'react'
import TickerSearch from './TickerSearch'

//Default Tab
function DefaultTab({ tab, onUpdate, onGenerateBrief, onUpload10K }) {
  const [weight, setWeight] = useState('')
  const [selectedTicker, setSelectedTicker] = useState('')
  const [file, setFile] = useState(null)
  const [companyName, setCompanyName] = useState('')

  const holdings = tab.data.holdings || []

  const addHolding = () => {
    if (!selectedTicker || !weight) return
    const updated = [...holdings, { ticker: selectedTicker, weight: Number(weight) }]
    onUpdate({ holdings: updated })
    setSelectedTicker('')
    setWeight('')
  }

  const removeHolding = (index) => {
    onUpdate({ holdings: holdings.filter((_, i) => i !== index) })
  }

  const totalWeight = holdings.reduce((sum, h) => sum + h.weight, 0)

  return (
  <div style={{ maxWidth: '700px', margin: '2rem auto', padding: '0 1rem' }}>
    
    {/* Section 1 — add a holding */}
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '8px' }}>
        <div style={{ flex: 3 }}>
            <TickerSearch onSelect={(ticker) => setSelectedTicker(ticker)} />
        </div>
        <input
            type="number"
            placeholder="Weight %"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            style={{ flex: 1, padding: '8px', fontSize: '14px' }}
        />
        <button
            onClick={addHolding}
            style={{ padding: '8px 16px', background: '#0C447C', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '14px', whiteSpace: 'nowrap' }}
        >Add</button>
        </div>
    
    {/* Section 2 — optional 10-K upload */}
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '24px', padding: '8px', background: '#f5f5f5', borderRadius: '0 0 6px 6px' }}>
    <input
        type="file"
        accept=".pdf"
        onChange={(e) => setFile(e.target.files[0])}
        style={{ flex: 2, fontSize: '13px' }}
    />
    <input
        type="text"
        placeholder="Company name"
        value={companyName}
        onChange={(e) => setCompanyName(e.target.value)}
        style={{ flex: 1, padding: '6px', fontSize: '13px' }}
    />
    <button
        onClick={() => onUpload10K(file, companyName)}
        style={{ padding: '6px 12px', background: '#5F5E5A', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '13px' }}
    >Upload 10-K</button>
    </div>

    {/* Section 3 — holdings list */}
    {holdings.length > 0 && (
    <div style={{ marginBottom: '16px' }}>
        {holdings.map((h, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px', borderBottom: '1px solid #eee' }}>
            <span style={{ flex: 3, fontWeight: '500' }}>{h.ticker}</span>
            <span style={{ flex: 1, color: '#555' }}>{h.weight}%</span>
            <button
            onClick={() => removeHolding(i)}
            style={{ padding: '4px 10px', background: 'none', border: '1px solid #ccc', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', color: '#791F1F' }}
            >Remove</button>
        </div>
        ))}
        <div style={{ padding: '8px', fontWeight: '500', color: totalWeight === 100 ? '#1A6B3C' : '#791F1F' }}>
        Total: {totalWeight}%
        </div>
    </div>
    )}

    {/* Section 4 — generate button */}
    <button
    disabled={totalWeight !== 100 || holdings.length === 0}
    onClick={() => onGenerateBrief(holdings)}
    style={{
        width: '100%',
        padding: '12px',
        background: totalWeight === 100 ? '#0C447C' : '#ccc',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        cursor: totalWeight === 100 ? 'pointer' : 'not-allowed',
        fontSize: '15px',
        fontWeight: '500'
    }}
    >
    Generate Risk Brief
    </button>

  </div>
)
}

export default DefaultTab