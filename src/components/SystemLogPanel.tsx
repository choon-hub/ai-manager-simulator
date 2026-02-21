import type { CSSProperties } from 'react'
import type { SystemLogItem } from '../types'

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

const lineStyle: CSSProperties = {
  margin: '4px 0',
  fontFamily: 'monospace',
  fontSize: '13px',
}

type Props = {
  systemLogs: SystemLogItem[]
}

function formatTime(timestamp: number): string {
  return new Date(timestamp).toLocaleTimeString()
}

export default function SystemLogPanel({ systemLogs }: Props) {
  return (
    <div style={panelStyle}>
      <h2 style={titleStyle}>System Log Panel</h2>
      {systemLogs.length === 0 && <p>No system logs yet.</p>}
      {systemLogs.map(log => (
        <p key={log.id} style={lineStyle}>
          [{formatTime(log.timestamp)}] {log.message}
        </p>
      ))}
    </div>
  )
}
