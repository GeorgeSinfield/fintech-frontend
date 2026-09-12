## 🚀Fintech-Risk-Platform-Frontend
A React frontend for the Fintech Risk Intelligence Platform. A browser-style tab interface where users can analyse portfolios, upload company filings, and chat with a document AI, all in independently scrollable, persistent tabs.

### 🔗 Live demo: https://fintech-risk-intelligence-platform-george.vercel.app

### 📦 Backend repo: https://github.com/GeorgeSinfield/Fintech-Risk-Platform/tree/master

## 🛠️Technologies
- React, JavaScript
- Axios
- Recharts
- react-markdown
- Vercel

## ✨Features
- Browser-style tab interface with independent tab state
- Ticker autocomplete search
- Portfolio builder with weight validation
- Three tab types: default input, portfolio brief, 10-K chat
- Two-panel layout with independent scrolling
- Correlation heatmap, volatility and drawdown charts

## 🔄The process
- I originally built the frontend as a single page with all the components stacked vertically, PortfolioBuilder, TenKUpload, PortfolioDashboard, RiskBriefDisplay all in one App.js. That worked but it wasn't the product I actually wanted to build. I sketched out a proper design on paper and realised what I actually wanted was a tab-based interface like a browser, where each analysis lives in its own independent tab.
- Rebuilding around the tab architecture was the biggest design decision of the frontend. Each tab is an object in an array with its own type and data. The default input tab, the portfolio brief tab, and the company/10-K tab. The key insight was that tab state has to live in the parent App.js array rather than inside each component, otherwise switching tabs resets everything. That's also where I hit the stale closure bug. updateTab was using an old snapshot of the tabs array, which meant tabs were disappearing when updated after an async API call. Fixing it with the prev => pattern was one of the moments where React suddenly made sense.
- The brief tab layout came directly from the sketch. The left panel fixed with the holdings list and charts, right panel independently scrollable with the text brief. The company tab was the most satisfying to build because it combines the most pieces: the 10-K risk factors from Phase 1 on the right, and a proper chat interface on the left that calls the /ask endpoint and remembers the conversation history when you switch tabs and come back.

## 📚What I Learned 
During this project I've learnt skills and better understandings of complex ideas, which have improved my logical thinking.
### 🌐 CORS
  - What it is and why browsers enforce it. Debugging this between the Azure backend and the Vercel frontend made it concrete. I learnt that the browser blocks requests between different origins unless the server explicitly permits them via response headers.

### ☁️ Vercel
  - How to deploy a React app to Vercel by connecting a GitHub repo, every push to main triggers an automatic redeploy. I also learnt the difference between production deployments and preview deployments, and how environment variables work in a hosted frontend.

### ⚛️ JSX
 - Coming from Python, JSX was the biggest syntax adjustment. I learnt that JSX is just JavaScript in disguise. Every `<div>` is a function call, {} runs real JavaScript inline, and .map() replaces for loops inside the return. Once that clicked the rest of React made much more sense.

### 🗂️ Tab state architecture
  - Why component-level state resets when you unmount a component, and how lifting state up to the parent solves it. Each tab being an object in an array in App.js means switching tabs never loses data.


## 📈Overall growth
Coming into this project I had very little JavaScript experience. By the end I was comfortable with React patterns, async/await, state management, and deploying a frontend to production. The biggest shift was understanding the declarative mental model. Describing what the UI should look like rather than writing step-by-step instructions to build it.

## 🔧How can it be improved?
- Add proper loading skeletons instead of blank tabs
- Mobile responsive layout
- Ability to export the risk brief as PDF
- Save/load portfolio configurations
- Dark mode

## ▶️How to run the project?
1. Clone the repo
2. Update API_URL in App.js, TickerSearch.js, CompanyTab.js to your backend URL
3. npm install
4. npm start

## 🎥Video
In progress...
