import { useState } from 'react'
import type { LogItem } from '../types'
import { createId } from '../utils/id'
import { ja } from '../ui/ja'

type Props = {
  currentCommand: string | null
  onSubmit: (log: LogItem) => void
}

export default function ReportPanel({ currentCommand, onSubmit }: Props) {
  const [report, setReport] = useState('')

  function handleSubmit() {
    if (!currentCommand) return
    const review = report.length > 20 ? ja.badges.approved : ja.badges.needsMoreDetail
    const log: LogItem = {
      id: createId(),
      command: currentCommand,
      report,
      review,
      timestamp: Date.now(),
    }
    onSubmit(log)
    setReport('')
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-4 sm:p-5 hover:shadow-md transition-shadow">
      <h2 className="flex items-center gap-2 text-sm font-semibold text-slate-900 mb-3">
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
          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
        </svg>
        {ja.panels.reportTitle}
      </h2>
      {currentCommand && (
        <p className="text-sm text-slate-700 mb-3">
          <strong>{ja.labels.currentCommandLabel}</strong> {currentCommand}
        </p>
      )}
      <textarea
        value={report}
        onChange={e => setReport(e.target.value)}
        rows={4}
        className="w-full rounded-lg border border-slate-300 bg-white p-3 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        placeholder={ja.placeholder.report}
      />
      <p className="mt-2 text-xs text-slate-500">{ja.tips.reportTip}</p>
      <div className="mt-3">
        <button
          onClick={handleSubmit}
          disabled={!currentCommand}
          className="inline-flex items-center justify-center rounded-lg px-3 py-2 text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm hover:shadow transition active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {ja.buttons.submitReport}
        </button>
      </div>
    </div>
  )
}
