import React, { useState } from 'react'
import axios from 'axios'
import ReactMarkdown from 'react-markdown'

const API_URL = 'http://localhost:8000'

//Function that takes the 10k file and returns its risk categories
function TenKUpload() {
  const [file, setFile] = useState(null)
  const [companyName, setCompanyName] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleUpload = async () => {
    setLoading(true)
    const formData = new FormData()
    formData.append('file', file)
    formData.append('company_name', companyName)

    const response = await axios.post(`${API_URL}/upload-10k`, formData)
    setResult(response.data)
    setLoading(false)
  }

  return (
    <div style={{ marginTop: '2rem' }}>
      <h2>10-K Filing Analysis</h2>
      <p>Upload a company's annual report to extract structured risk factors.</p>

      {<input 
        type="file" 
        accept=".pdf" 
        onChange={(e) => setFile(e.target.files[0])} />}

      <input 
        type="text" 
        value={companyName}  
        placeholder="Company name e.g. goldman_bdc" 
        onChange={(e) => setCompanyName(e.target.value)}/>

      <button onClick={handleUpload}>Upload and Analyse</button>

      {loading && <p>Analysing  filing — this may take a minute...</p>}

      {result && Object.entries(result).map(([heading, data]) => (
        <React.Fragment key={heading}>
          <h2>{heading}</h2>
          <ReactMarkdown>{data}</ReactMarkdown>
        </React.Fragment>
      ))}
    </div>
  )
}

export default TenKUpload