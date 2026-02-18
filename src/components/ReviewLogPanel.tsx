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

export default function ReviewLogPanel() {
  return (
    <div style={panelStyle}>
      <h2 style={titleStyle}>Review Log Panel</h2>
      <p>Review log area (not yet implemented)</p>
    </div>
  )
}
