import type { CSSProperties } from 'react'

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

export default function ReportPanel() {
  return (
    <div style={panelStyle}>
      <h2 style={titleStyle}>Report Panel</h2>
      <p>Implementation report area (not yet implemented)</p>
    </div>
  )
}
