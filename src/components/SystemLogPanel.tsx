import type { SystemLogItem } from '../types'
import { ja } from '../ui/ja'

type Props = {
  systemLogs: SystemLogItem[]
}

function formatTime(timestamp: number): string {
  return new Date(timestamp).toLocaleTimeString()
}

export default function SystemLogPanel({ systemLogs }: Props) {
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
          <polyline points="4 17 10 11 4 5" />
          <line x1="12" y1="19" x2="20" y2="19" />
        </svg>
        {ja.panels.systemLogTitle}
      </h2>
      {systemLogs.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-600 text-center">
          {ja.empty.systemEmpty}
        </div>
      ) : (
        <div className="max-h-80 overflow-auto pr-1">
          {systemLogs.map(log => (
            <p key={log.id} className="font-mono text-xs text-slate-600 leading-relaxed border-b border-slate-100 py-1 last:border-0">
              [{formatTime(log.timestamp)}] {log.message}
            </p>
          ))}
        </div>
      )}
    </div>
  )
}
