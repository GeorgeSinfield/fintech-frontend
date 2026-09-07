import React from 'react'
import ReactMarkdown from 'react-markdown'

//Function that receives result (JSON from API) and makes it readable
function RiskBriefDisplay({ result }) {

    //If theres no result yet return nothing
    if (!result) return null

    //Takes the markdown text and converts it to formatted HTML
    return (
        <div style={{marginTop: '2rem'}}>
            <h2>Risk Brief</h2>
            <ReactMarkdown>{result}</ReactMarkdown>
        </div>
    )
}

export default RiskBriefDisplay