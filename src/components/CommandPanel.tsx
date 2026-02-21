import type { CSSProperties } from 'react'

const COMMANDS = [
  'Implement feature X',
  'Fix bug Y',
  'Refactor module Z',
  'Write tests for service A',
  'Optimize query B',
]

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
  onGenerate: (command: string) => void
}

export default function CommandPanel({ onGenerate }: Props) {
  function handleGenerate() {
    const index = Math.floor(Math.random() * COMMANDS.length)
    onGenerate(COMMANDS[index])
  }

  return (
    <div style={panelStyle}>
      <h2 style={titleStyle}>Command Panel</h2>
      <button onClick={handleGenerate}>Generate Command</button>
    </div>
  )
}
