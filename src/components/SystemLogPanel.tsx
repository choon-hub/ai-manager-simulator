import type { SystemLogItem } from '../types'

type Props = {
  systemLogs: SystemLogItem[]
}

function formatTime(timestamp: number): string {
  return new Date(timestamp).toLocaleTimeString()
}

export default function SystemLogPanel({ systemLogs }: Props) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-4 sm:p-5">
      <h2 className="text-sm font-semibold text-slate-900 mb-3">System Log Panel</h2>
      {systemLogs.length === 0 && <p className="text-sm text-slate-500">No system logs yet.</p>}
      {systemLogs.map(log => (
        <p key={log.id} className="font-mono text-xs text-slate-600 leading-relaxed">
          [{formatTime(log.timestamp)}] {log.message}
        </p>
      ))}
    </div>
  )
}
