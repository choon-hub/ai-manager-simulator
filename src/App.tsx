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

  const nextActionText = currentCommand
    ? '1) Submit your report for the current command.'
    : '1) Generate a command, then submit a report.'

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="max-w-5xl mx-auto p-4 sm:p-6 space-y-4">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">AI Manager Simulator</h1>
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-4 sm:p-5 hover:shadow-md transition-shadow">
          <p className="text-sm font-semibold text-slate-900 mb-3">Concept</p>
          <p className="text-sm leading-relaxed text-slate-700">
            This app is the artwork.<br />
            AI issues commands.<br />
            Human implements and reports.<br />
            AI reviews.<br />
            All actions are logged and persisted.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-4 sm:p-5 hover:shadow-md transition-shadow">
          <p className="text-sm font-semibold text-slate-900 mb-3">How to Demo</p>
          <ol className="text-sm leading-relaxed text-slate-700 list-decimal pl-5 space-y-1">
            <li>Click "Generate Command"</li>
            <li>Write a short report and submit</li>
            <li>Observe "Review Log" and "System Log"</li>
            <li>Reload the page and confirm logs persist</li>
            <li>Click "Clear Review Logs" (System Log remains)</li>
          </ol>
        </div>

        {/* Next Action card */}
        <div className="rounded-2xl border border-slate-300 bg-white shadow-md p-4 sm:p-5 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <svg
                className="h-4 w-4 text-slate-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 8 16 12 12 16" />
                <line x1="8" y1="12" x2="16" y2="12" />
              </svg>
              <p className="text-sm font-semibold text-slate-900">Next Action</p>
            </div>
            {currentCommand ? (
              <span className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800">
                AWAITING REPORT
              </span>
            ) : (
              <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">
                AWAITING COMMAND
              </span>
            )}
          </div>
          <p className="text-sm text-slate-700">{nextActionText}</p>
        </div>

        <CommandPanel currentCommand={currentCommand} onGenerate={handleCommandGenerated} />
        <ReportPanel currentCommand={currentCommand} onSubmit={handleReportSubmit} />
        <ReviewLogPanel logs={logs} onClear={handleClearLogs} />
        <SystemLogPanel systemLogs={systemLogs} />
      </div>
    </div>
  )
}
