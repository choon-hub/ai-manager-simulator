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
        className="inline-flex items-center justify-center rounded-lg px-3 py-2 text-sm font-medium bg-rose-600 text-white hover:bg-rose-700 transition disabled:opacity-50 disabled:cursor-not-allowed mb-3"
      >
        Clear Review Logs
      </button>
      {logs.length === 0 && <p className="text-sm text-slate-500">No logs yet.</p>}
      <div className="max-h-80 overflow-auto pr-1">
        {logs.map(log => {
          const approved = log.review.includes('Approved')
          return (
            <div key={log.id} className="border-b border-slate-100 pb-3 mb-3 last:border-0 last:pb-0 last:mb-0">
              <p className="text-sm text-slate-700"><strong>Command:</strong> {log.command}</p>
              <p className="text-sm text-slate-700"><strong>Report:</strong> {log.report}</p>
              <p className="text-sm text-slate-700 flex items-center gap-2">
                <strong>Review:</strong>
                <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ${approved ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                  {log.review}
                </span>
              </p>
              <p className="text-sm text-slate-500"><strong>Time:</strong> {new Date(log.timestamp).toLocaleString()}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
