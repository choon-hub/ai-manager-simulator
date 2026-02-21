import type { LogItem } from '../types'

type Props = {
  logs: LogItem[]
  onClear: () => void
}

export default function ReviewLogPanel({ logs, onClear }: Props) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-4 sm:p-5">
      <h2 className="text-sm font-semibold text-slate-900 mb-3">Review Log Panel</h2>
      <button
        onClick={onClear}
        className="mb-3 inline-flex items-center justify-center rounded-lg px-3 py-2 text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Clear Review Logs
      </button>
      {logs.length === 0 && <p className="text-sm text-slate-500">No logs yet.</p>}
      {logs.map(log => (
        <div key={log.id} className="border-b border-slate-100 pb-3 mb-3 last:border-0 last:pb-0 last:mb-0">
          <p className="text-sm text-slate-700"><strong>Command:</strong> {log.command}</p>
          <p className="text-sm text-slate-700"><strong>Report:</strong> {log.report}</p>
          <p className="text-sm text-slate-700"><strong>Review:</strong> {log.review}</p>
          <p className="text-sm text-slate-500"><strong>Time:</strong> {new Date(log.timestamp).toLocaleString()}</p>
        </div>
      ))}
    </div>
  )
}
