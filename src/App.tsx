import { useState, useEffect } from 'react'
import type { CSSProperties } from 'react'
import type { LogItem } from './types'
import { loadLogs, saveLogs } from './utils/storage'
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
  const [logs, setLogs] = useState<LogItem[]>(() => loadLogs())
  const [currentCommand, setCurrentCommand] = useState<string | null>(null)

  useEffect(() => {
    saveLogs(logs)
  }, [logs])

  function handleCommandGenerated(command: string) {
    setCurrentCommand(command)
  }

  function handleReportSubmit(log: LogItem) {
    setLogs(prev => [log, ...prev])
    setCurrentCommand(null)
  }

  function handleClearLogs() {
    saveLogs([])
    setLogs([])
  }

  return (
    <div style={appStyle}>
      <h1 style={{ marginBottom: '24px' }}>AI Manager Simulator</h1>
      <CommandPanel currentCommand={currentCommand} onGenerate={handleCommandGenerated} />
      <ReportPanel currentCommand={currentCommand} onSubmit={handleReportSubmit} />
      <ReviewLogPanel logs={logs} onClear={handleClearLogs} />
    </div>
  )
}
