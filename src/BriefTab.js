import React from 'react'
import ReactMarkdown from 'react-markdown'
import PortfolioDashboard from './PortfolioDashboard'

//Function that receives the tab object
// tab.data contains brief (text), metrics (numbers), holdings (array)
function BriefTab({ tab }) {
  const { brief, metrics, holdings } = tab.data

  return (
    // Outer container
    <div style={{ display: 'flex', height: 'calc(100vh - 120px)', gap: '1rem' }}>
      
      {/* Left Panel */}
      <div style={{ width: '40%', overflowY: 'auto', paddingRight: '1rem' }}>
        
        {/* Holdings list */}
        <h3 style={{ color: '#0C447C', marginBottom: '0.5rem' }}>Portfolio</h3>
        {holdings && holdings.map((h, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: '1px solid #eee', fontSize: '14px' }}>
            <span style={{ fontWeight: '500' }}>{h.ticker}</span>
            <span style={{ color: '#555' }}>{h.weight}%</span>
          </div>
        ))}

        {/* Dashboard charts */}
        <PortfolioDashboard metrics={metrics} />
      </div>

      {/* Right Panel */}
      <div style={{ width: '60%', overflowY: 'auto', borderLeft: '1px solid #eee', paddingLeft: '1rem' }}>
        <ReactMarkdown>{brief}</ReactMarkdown>
      </div>

    </div>
  )
}

export default BriefTab