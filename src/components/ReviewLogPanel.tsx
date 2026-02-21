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

const itemStyle: CSSProperties = {
  borderBottom: '1px solid #ccc',
  paddingBottom: '12px',
  marginBottom: '12px',
}

type Props = {
  logs: LogItem[]
  onClear: () => void
}

export default function ReviewLogPanel({ logs, onClear }: Props) {
  return (
    <div style={panelStyle}>
      <h2 style={titleStyle}>Review Log Panel</h2>
      <button onClick={onClear} style={{ marginBottom: '12px' }}>Clear Logs</button>
      {logs.length === 0 && <p>No logs yet.</p>}
      {logs.map(log => (
        <div key={log.id} style={itemStyle}>
          <p><strong>Command:</strong> {log.command}</p>
          <p><strong>Report:</strong> {log.report}</p>
          <p><strong>Review:</strong> {log.review}</p>
          <p><strong>Time:</strong> {new Date(log.timestamp).toLocaleString()}</p>
        </div>
      ))}
    </div>
  )
}
