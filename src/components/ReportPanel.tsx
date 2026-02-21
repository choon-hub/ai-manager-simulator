import { useState } from 'react'
import type { LogItem } from '../types'
import { createId } from '../utils/id'

type Props = {
  currentCommand: string | null
  onSubmit: (log: LogItem) => void
}

export default function ReportPanel({ currentCommand, onSubmit }: Props) {
  const [report, setReport] = useState('')

  function handleSubmit() {
    if (!currentCommand) return
    const review = report.length > 20 ? 'Approved' : 'Needs more detail'
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
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-4 sm:p-5">
      <h2 className="text-sm font-semibold text-slate-900 mb-3">Report Panel</h2>
      {currentCommand && (
        <p className="text-sm text-slate-700 mb-2">
          <strong>Current Command:</strong> {currentCommand}
        </p>
      )}
      <textarea
        value={report}
        onChange={e => setReport(e.target.value)}
        rows={4}
        placeholder="Enter your implementation report..."
        className="w-full rounded-lg border border-slate-300 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <button
        onClick={handleSubmit}
        disabled={!currentCommand}
        className="mt-2 inline-flex items-center justify-center rounded-lg px-3 py-2 text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Submit Report
      </button>
    </div>
  )
}
