import type { CSSProperties } from 'react'
import CommandPanel from './components/CommandPanel'
import ReportPanel from './components/ReportPanel'
import ReviewLogPanel from './components/ReviewLogPanel'

const appStyle: CSSProperties = {
  maxWidth: '800px',
  margin: '32px auto',
  padding: '0 16px',
  fontFamily: 'sans-serif',
}

export default function App() {
  return (
    <div style={appStyle}>
      <h1 style={{ marginBottom: '24px' }}>AI Manager Simulator</h1>
      <CommandPanel />
      <ReportPanel />
      <ReviewLogPanel />
    </div>
  )
}
