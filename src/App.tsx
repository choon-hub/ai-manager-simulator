import { useState, useEffect } from 'react'
import type { CSSProperties } from 'react'
import type { LogItem, SystemLogItem } from './types'
import { loadLogs, saveLogs, loadSystemLogs, saveSystemLogs } from './utils/storage'
import { createId } from './utils/id'
import CommandPanel from './components/CommandPanel'
import ReportPanel from './components/ReportPanel'
import ReviewLogPanel from './components/ReviewLogPanel'
import SystemLogPanel from './components/SystemLogPanel'

const appStyle: CSSProperties = {
  maxWidth: '800px',
  margin: '32px auto',
  padding: '0 16px',
  fontFamily: 'sans-serif',
}

export default function App() {
  const [logs, setLogs] = useState<LogItem[]>(() => loadLogs())
  const [currentCommand, setCurrentCommand] = useState<string | null>(null)
  const [systemLogs, setSystemLogs] = useState<SystemLogItem[]>(() => loadSystemLogs())

  useEffect(() => {
    saveLogs(logs)
  }, [logs])

  useEffect(() => {
    saveSystemLogs(systemLogs)
  }, [systemLogs])

  function appendSystemLog(type: SystemLogItem['type'], message: string) {
    const entry: SystemLogItem = {
      id: createId(),
      type,
      message,
      timestamp: Date.now(),
    }
    setSystemLogs(prev => [entry, ...prev])
  }

  function handleCommandGenerated(command: string) {
    setCurrentCommand(command)
    appendSystemLog('COMMAND_GENERATED', `AI: Generated command "${command}"`)
  }

  function handleReportSubmit(log: LogItem) {
    setLogs(prev => [log, ...prev])
    setCurrentCommand(null)
    appendSystemLog('REPORT_SUBMITTED', `Human: Submitted report (${log.report.length} chars)`)
    appendSystemLog('REVIEW_CREATED', `AI: Review result "${log.review}"`)
  }

  function handleClearLogs() {
    saveLogs([])
    setLogs([])
    appendSystemLog('LOG_CLEARED', 'Human: Cleared review logs')
  }

  return (
    <div style={appStyle}>
      <h1 style={{ marginBottom: '24px' }}>AI Manager Simulator</h1>
      <CommandPanel currentCommand={currentCommand} onGenerate={handleCommandGenerated} />
      <ReportPanel currentCommand={currentCommand} onSubmit={handleReportSubmit} />
      <ReviewLogPanel logs={logs} onClear={handleClearLogs} />
      <SystemLogPanel systemLogs={systemLogs} />
    </div>
  )
}
