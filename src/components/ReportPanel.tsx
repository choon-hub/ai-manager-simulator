import { useState } from 'react'
import type { CSSProperties } from 'react'
import type { LogItem } from '../types'

const panelStyle: CSSProperties = {
  border: '2px solid #333',
  padding: '16px',
  marginBottom: '16px',
}

const titleStyle: CSSProperties = {
  margin: '0 0 12px 0',
  fontSize: '16px',
  fontWeight: 'bold',
  borderBottom: '1px solid #999',
  paddingBottom: '8px',
}

type Props = {
  currentCommand: string | null
  onSubmit: (log: LogItem) => void
}

export default function ReportPanel({ currentCommand, onSubmit }: Props) {
  const [report, setReport] = useState('')

  function handleSubmit() {
    if (!currentCommand) return
    const review = report.length > 20 ? 'Approved' : 'Needs more detail'
    const log: LogItem = {
      id: crypto.randomUUID(),
      command: currentCommand,
      report,
      review,
      timestamp: Date.now(),
    }
    onSubmit(log)
    setReport('')
  }

  return (
    <div style={panelStyle}>
      <h2 style={titleStyle}>Report Panel</h2>
      {currentCommand && <p><strong>Current Command:</strong> {currentCommand}</p>}
      <textarea
        value={report}
        onChange={e => setReport(e.target.value)}
        rows={4}
        style={{ width: '100%', boxSizing: 'border-box' }}
        placeholder="Enter your implementation report..."
      />
      <br />
      <button onClick={handleSubmit} style={{ marginTop: '8px' }}>Submit Report</button>
    </div>
  )
}
