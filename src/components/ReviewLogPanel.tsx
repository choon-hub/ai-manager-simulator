import type { LogItem } from '../types'
import { ja } from '../ui/ja'

type Props = {
  logs: LogItem[]
  onClear: () => void
}

function ReviewBadge({ review }: { review: string }) {
  const isApproved = review === ja.badges.approved || review === 'Approved'
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ${
        isApproved
          ? 'bg-emerald-100 text-emerald-800'
          : 'bg-amber-100 text-amber-800'
      }`}
    >
      {review}
    </span>
  )
}

export default function ReviewLogPanel({ logs, onClear }: Props) {
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
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
        {ja.panels.reviewLogTitle}
      </h2>
      <button
        onClick={onClear}
        className="inline-flex items-center justify-center rounded-lg px-3 py-2 text-sm font-medium bg-rose-600 text-white hover:bg-rose-700 shadow-sm hover:shadow transition active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed mb-3"
      >
        {ja.buttons.clearReviewLogs}
      </button>
      {logs.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-600 text-center">
          {ja.empty.reviewEmpty}
        </div>
      ) : (
        <div className="max-h-80 overflow-auto pr-1">
          {logs.map(log => (
            <div key={log.id} className="border-b border-slate-100 pb-3 mb-3 last:border-0 last:pb-0 last:mb-0">
              <p className="text-sm text-slate-700"><strong>{ja.labels.logCommand}</strong> {log.command}</p>
              <p className="text-sm text-slate-700"><strong>{ja.labels.logReport}</strong> {log.report}</p>
              <p className="flex items-center gap-2 text-sm text-slate-700"><strong>{ja.labels.logReview}</strong> <ReviewBadge review={log.review} /></p>
              <p className="text-sm text-slate-500"><strong>{ja.labels.logTime}</strong> {new Date(log.timestamp).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
