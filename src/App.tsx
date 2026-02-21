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

const infoSectionStyle: CSSProperties = {
  border: '1px solid #ccc',
  borderRadius: '4px',
  padding: '12px 16px',
  marginBottom: '16px',
}

const infoTitleStyle: CSSProperties = {
  margin: '0 0 8px 0',
  fontSize: '14px',
  fontWeight: 'bold',
}

const infoBodyStyle: CSSProperties = {
  margin: 0,
  fontSize: '14px',
  lineHeight: '1.6',
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
      <div style={infoSectionStyle}>
        <p style={infoTitleStyle}>Concept</p>
        <p style={infoBodyStyle}>
          This app is the artwork.<br />
          AI issues commands.<br />
          Human implements and reports.<br />
          AI reviews.<br />
          All actions are logged and persisted.
        </p>
      </div>
      <div style={infoSectionStyle}>
        <p style={infoTitleStyle}>How to Demo</p>
        <ol style={{ ...infoBodyStyle, paddingLeft: '20px', margin: 0 }}>
          <li>Click "Generate Command"</li>
          <li>Write a short report and submit</li>
          <li>Observe "Review Log" and "System Log"</li>
          <li>Reload the page and confirm logs persist</li>
          <li>Click "Clear Review Logs" (System Log remains)</li>
        </ol>
      </div>
      <CommandPanel currentCommand={currentCommand} onGenerate={handleCommandGenerated} />
      <ReportPanel currentCommand={currentCommand} onSubmit={handleReportSubmit} />
      <ReviewLogPanel logs={logs} onClear={handleClearLogs} />
      <SystemLogPanel systemLogs={systemLogs} />
    </div>
  )
}
