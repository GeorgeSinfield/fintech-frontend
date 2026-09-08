import React, { useState } from 'react'
import axios from 'axios'
import ReactMarkdown from 'react-markdown'

//Set API URL
const API_URL = 'https://fintech-risk-api.greenmeadow-4a2c3e23.uksouth.azurecontainerapps.io'

//CompanyTab
function CompanyTab({ tab, onUpdate }) {
  const [thinking, setThinking] = useState(false)
  const [input, setInput] = useState('')

  //Save tab.data 
  const { companyName, collectionName, riskCategories } = tab.data
  const messages = tab.data.messages || []
  const sendMessage = async () => {

    //Don't send empty messages
    if (!input.trim()) return

    //Build the new messages array with the user message added
    const userMessage = { role: 'user', text: input }
    const updatedMessages = [...messages, userMessage]

    //Save to tab data
    onUpdate({ messages: updatedMessages })
    setInput('')
    setThinking(true)


    //Call the ask endpoint
     try {
      const response = await axios.post(`${API_URL}/ask`, {
        question: input,
        collection_name: collectionName
      })

    //Add AI response and save again
      const withAI = [...updatedMessages, { role: 'ai', text: response.data.answer }]
      onUpdate({ messages: withAI })

      //Error handling
    } catch (err) {
      const withError = [...updatedMessages, { role: 'ai', text: 'Sorry, something went wrong.' }]
      onUpdate({ messages: withError })
    }

    setThinking(false)
  }

  return (
    <div style={{ display: 'flex', height: 'calc(100vh - 120px)', gap: '1rem' }}>

      {/* Left Panel */}
      <div style={{ width: '45%', display: 'flex', flexDirection: 'column', borderRight: '1px solid #eee', paddingRight: '1rem' }}>
        
        {/* Company name heading */}
        <h2 style={{ color: '#0C447C', marginBottom: '1rem' }}>{companyName}</h2>

        {/* Messages area */}
        <div style={{ flex: 1, overflowY: 'auto', marginBottom: '1rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {messages.map((m, i) => (
            <div key={i} style={{
              alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
              background: m.role === 'user' ? '#0C447C' : '#f1efe8',
              color: m.role === 'user' ? 'white' : '#262625',
              padding: '8px 12px',
              borderRadius: '12px',
              maxWidth: '80%',
              fontSize: '14px',
              lineHeight: '1.5'
            }}>
              {/* ReactMarkdown formats the AI response */}
              {m.role === 'ai' ? <ReactMarkdown>{m.text}</ReactMarkdown> : m.text}
            </div>
          ))}

          {/* Thinking indicator */}
          {thinking && (
            <div style={{
              alignSelf: 'flex-start',
              background: '#f1efe8',
              color: '#888',
              padding: '8px 12px',
              borderRadius: '12px',
              fontSize: '14px',
              fontStyle: 'italic'
            }}>
              Thinking...
            </div>
          )}
        </div>

        {/* Input area */}
        <div style={{ display: 'flex', gap: '8px' }}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Ask a question about this file..."
            style={{ flex: 1, padding: '8px', fontSize: '14px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          <button
            onClick={sendMessage}
            style={{ padding: '8px 16px', background: '#0C447C', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >Send</button>
        </div>
      </div>

      {/* Right Panel */}
      <div style={{ width: '55%', overflowY: 'auto', paddingLeft: '1rem' }}>
        <h2 style={{ color: '#0C447C', marginBottom: '1rem' }}>Risk Factors</h2>
        {riskCategories && Object.entries(riskCategories).map(([category, text]) => (
          <div key={category} style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ textTransform: 'capitalize', color: '#333' }}>
              {category.replace('_', ' ')}
            </h3>
            <ReactMarkdown>{text}</ReactMarkdown>
          </div>
        ))}
      </div>

    </div>
  )
}

export default CompanyTab