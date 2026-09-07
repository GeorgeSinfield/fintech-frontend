import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

//Function that takes the risk metrics and turns that data into graphs and charts
function PortfolioDashboard({metrics}) {

    //If no metrics return null
    if (!metrics) return null

    //reformats volatility to an array pairs ( ticker: ticker, value: value * 100)
    const volatilityData = Object.entries(metrics.volatility).map(([ticker, value]) => ({
        ticker: ticker,
        value: (value * 100).toFixed(1)
        }))

    //reformats max_drawdown to an array pairs ( ticker: ticker, value: value * 100)
    const drawdownData = Object.entries(metrics.max_drawdown).map(([ticker, value]) => ({
        ticker: ticker,
        value: (value * 100).toFixed(1) 
    }))

    //return Charts
    return (
        <div style={{ marginTop: '2rem' }}>
            <h2>Portfolio Dashboard</h2>

            {/* Volatility Chart */}
            <h3>Annualized Volatility (%)</h3>
            <ResponsiveContainer width="100%" height={250}>
                <BarChart data={volatilityData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="ticker" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#0C447C" />
                </BarChart>
            </ResponsiveContainer>

            {/* Drawdown Chart */}
            <h3>Maximum Drawdown (%)</h3>
            <ResponsiveContainer width="100%" height={250}>
                <BarChart data={drawdownData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="ticker" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#791F1F" />
                </BarChart>
            </ResponsiveContainer>

            {/* VaR */}
            <h3>Portfolio VaR (95%)</h3>
            <p>{(metrics.portfolio_var * 100).toFixed(2)}% daily loss at 95% confidence</p>

            {/* Correlation Heatmap */}
            <h3>Correlation Matrix</h3>
            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Object.keys(metrics.correlation_matrix).length + 1}, 80px)`, gap: '4px' }}>
                
                {/* Header row — empty corner then ticker names */}
                <div></div>
                {Object.keys(metrics.correlation_matrix).map(ticker => (
                    <div key={ticker} style={{ fontWeight: 'bold', textAlign: 'center', fontSize: '13px' }}>{ticker}</div>
                ))}

                {/* Data rows */}
                {Object.entries(metrics.correlation_matrix).map(([rowTicker, values]) => (
                    <React.Fragment key={rowTicker}>
                        <div style={{ fontWeight: 'bold', fontSize: '13px' }}>{rowTicker}</div>
                        {Object.values(values).map((val, i) => (
                            <div key={i} style={{
                                backgroundColor: `rgba(12, 68, 124, ${Math.abs(val)})`,
                                color: Math.abs(val) > 0.5 ? 'white' : 'black',
                                textAlign: 'center',
                                padding: '8px',
                                borderRadius: '4px',
                                fontSize: '13px'
                            }}>
                                {val.toFixed(2)}
                            </div>
                        ))}
                    </React.Fragment>
                ))}
            </div>
        </div>
)
}

export default PortfolioDashboard