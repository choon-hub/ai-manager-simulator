import { useState, useEffect } from 'react'
import type { LogItem, SystemLogItem } from './types'
import { loadLogs, saveLogs, loadSystemLogs, saveSystemLogs } from './utils/storage'
import { createId } from './utils/id'
import CommandPanel from './components/CommandPanel'
import ReportPanel from './components/ReportPanel'
import ReviewLogPanel from './components/ReviewLogPanel'
import SystemLogPanel from './components/SystemLogPanel'
import { ja } from './ui/ja'

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
    appendSystemLog('COMMAND_GENERATED', `AI：命令を生成「${command}」`)
  }

  function handleReportSubmit(log: LogItem) {
    setLogs(prev => [log, ...prev])
    setCurrentCommand(null)
    appendSystemLog('REPORT_SUBMITTED', `Human：報告を送信（${log.report.length}文字）`)
    appendSystemLog('REVIEW_CREATED', `AI：査定結果「${log.review}」`)
  }

  function handleClearLogs() {
    saveLogs([])
    setLogs([])
    appendSystemLog('LOG_CLEARED', 'Human：査定ログをクリア')
  }

  const nextActionText = currentCommand
    ? ja.nextActionTextHasCommand
    : ja.nextActionTextNoCommand

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="max-w-5xl mx-auto p-4 sm:p-6 space-y-4">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">{ja.appTitle}</h1>
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-4 sm:p-5 hover:shadow-md transition-shadow">
          <p className="text-sm font-semibold text-slate-900 mb-3">{ja.conceptTitle}</p>
          <p className="text-sm leading-relaxed text-slate-700">
            {ja.conceptBodyLines.map((line, i) => (
              <span key={i}>{line}{i < ja.conceptBodyLines.length - 1 && <br />}</span>
            ))}
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-4 sm:p-5 hover:shadow-md transition-shadow">
          <p className="text-sm font-semibold text-slate-900 mb-3">{ja.howToDemoTitle}</p>
          <ol className="text-sm leading-relaxed text-slate-700 list-decimal pl-5 space-y-1">
            {ja.howToDemoSteps.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
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
              <p className="text-sm font-semibold text-slate-900">{ja.nextActionTitle}</p>
            </div>
            {currentCommand ? (
              <span className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800">
                {ja.nextActionAwaitingReport}
              </span>
            ) : (
              <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">
                {ja.nextActionAwaitingCommand}
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
