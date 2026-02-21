import { useState, useEffect } from 'react'
import type { LogItem, SystemLogItem } from './types'
import { loadLogs, saveLogs, loadSystemLogs, saveSystemLogs } from './utils/storage'
import { createId } from './utils/id'
import CommandPanel from './components/CommandPanel'
import ReportPanel from './components/ReportPanel'
import ReviewLogPanel from './components/ReviewLogPanel'
import SystemLogPanel from './components/SystemLogPanel'

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
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-5xl mx-auto p-4 sm:p-6 space-y-4">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">AI Manager Simulator</h1>
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-4 sm:p-5">
          <p className="text-sm font-semibold text-slate-900 mb-3">Concept</p>
          <p className="text-sm leading-relaxed text-slate-700">
            This app is the artwork.<br />
            AI issues commands.<br />
            Human implements and reports.<br />
            AI reviews.<br />
            All actions are logged and persisted.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-4 sm:p-5">
          <p className="text-sm font-semibold text-slate-900 mb-3">How to Demo</p>
          <ol className="text-sm leading-relaxed text-slate-700 list-decimal pl-5 space-y-1">
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
    </div>
  )
}
