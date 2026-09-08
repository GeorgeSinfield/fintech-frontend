import React, { useState } from 'react'
import axios from 'axios'
import DefaultTab from './DefaultTab'
import BriefTab from './BriefTab'
import CompanyTab from './CompanyTab'

//Set API URL
const API_URL = 'https://fintech-risk-api.greenmeadow-4a2c3e23.uksouth.azurecontainerapps.io'

//App Function
function App() {
  const [tabs, setTabs] = useState([
    { id: 1, type: 'default', name: 'New Tab', data: {} }
  ])
  const [activeTab, setActiveTab] = useState(1)
  const [nextId, setNextId] = useState(2)

  //Add tab
  const addTab = () => {
    const newTab = { id: nextId, type: 'default', name: 'New Tab', data: {} }
    setTabs([...tabs, newTab])
    setActiveTab(nextId)
    setNextId(nextId + 1)
  }

  //Close tab
  const closeTab = (id) => {
    setTabs(prev => {
      const remaining = prev.filter(t => t.id !== id)
      if (remaining.length === 0) return prev
      setActiveTab(remaining[remaining.length - 1].id)
      return remaining
    })
  }

  //Update Tab
  const updateTab = (id, updates) => {
    setTabs(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t))
  }

  //Generate Brief
  const handleGenerateBrief = async (holdings) => {
    const tickers = holdings.map(h => h.ticker)
    const weights = holdings.map(h => h.weight / 100)

    //Save new tab ID
    const originatingTabId = activeTab


    //create a loading tab
    const briefId = nextId
    setNextId(nextId + 1)
    setTabs(prev => [...prev, {
      id: briefId,
      type: 'brief', 
      name: 'Generating...', 
      data: { loading: true } 
    }])
    setActiveTab(briefId)

    //API call
    try {
      const response = await axios.post(`${API_URL}/risk-brief`, { tickers, weights })
      updateTab(briefId, { 
        name: 'Portfolio Brief',
        data: { brief: response.data.brief, metrics: response.data.metrics, holdings, loading: false },
      })

      //Closes new tab (original tab)
      closeTab(originatingTabId)

      //Error Handling
    } catch (err) {
      updateTab(briefId, { name: 'Error', data: { error: true, loading: false } })
    }
  }

  //Upload 10k
  const handleUpload10K = async (file, companyName) => {

    //Save new tab ID
    const originatingTabId = activeTab

    //create a loading tab
    const uploadId = nextId
    setNextId(nextId + 1)
    setTabs(prev => [...prev, {
      id: uploadId,
      type: 'company', 
      name: 'Processing...', 
      data: { loading: true } 
    }])
    setActiveTab(uploadId)

    //API call
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('company_name', companyName)
      const response = await axios.post(`${API_URL}/upload-10k`, formData)
      updateTab(uploadId, { 
        name: companyName,
        data: {companyName: companyName, collectionName: companyName.toLowerCase().replace(/ /g, '_'), riskCategories: response.data, loading: false}
      })

      //Closes new tab (original tab)
      closeTab(originatingTabId)

      //Error Handling
    } catch (err) {
      updateTab(uploadId, { name: 'Error', data: { error: true, loading: false } })
    }
  }

  const currentTab = tabs.find(t => t.id === activeTab)

  //Layout
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Header */}
      <div style={{ background: '#0C447C', color: 'white', padding: '0.75rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Fintech Risk Intelligence Platform</span>
        <span style={{ fontSize: '0.85rem', opacity: 0.85 }}>
          <a href="https://www.linkedin.com/in/george-sinfield-904b29388/" target="_blank" rel="noreferrer" style={{ color: 'white', marginRight: '1rem' }}>LinkedIn</a>
          <a href="https://github.com/GeorgeSinfield" target="_blank" rel="noreferrer" style={{ color: 'white', marginRight: '1rem' }}>GitHub</a>
          George Sinfield
        </span>
      </div>

      {/* Tab bar */}
      <div style={{ background: '#f1efe8', borderBottom: '1px solid #ccc', display: 'flex', alignItems: 'center', padding: '0 0.5rem' }}>
        {tabs.map(tab => (
          <div
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '0.5rem 1rem',
              marginRight: '2px',
              marginTop: '4px',
              background: activeTab === tab.id ? 'white' : '#ddd',
              borderRadius: '6px 6px 0 0',
              cursor: 'pointer',
              fontSize: '13px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              borderTop: activeTab === tab.id ? '2px solid #0C447C' : '2px solid transparent'
            }}
          >
            {tab.name}
            <span
              onClick={(e) => { e.stopPropagation(); closeTab(tab.id) }}
              style={{ opacity: 0.5, fontSize: '11px' }}
            >✕</span>
          </div>
        ))}
        <button
          onClick={addTab}
          style={{ marginLeft: '4px', background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer', padding: '0 8px', color: '#555' }}
        >+</button>
      </div>

      {/* Tab content */}
      <div style={{ flex: 1, padding: '1.5rem' }}>
        
        {currentTab && currentTab.type === 'default' && (
          <DefaultTab
            tab={currentTab}
            onUpdate={(updates) => updateTab(activeTab, { data: { ...currentTab.data, ...updates } })}
            onGenerateBrief={handleGenerateBrief}
            onUpload10K={handleUpload10K}
          />
        )}

        {currentTab && currentTab.type === 'brief' && (
          <BriefTab tab={currentTab} />
        )}

        {currentTab && currentTab.type === 'company' && (
        <CompanyTab 
          tab={currentTab}
          onUpdate={(updates) => updateTab(activeTab, { data: { ...currentTab.data, ...updates } })}
        />
      )}

      </div>

    </div>
  )
}

export default App