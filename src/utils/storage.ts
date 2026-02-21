import type { LogItem } from '../types'

const STORAGE_KEY = 'ai-manager-logs'

export function loadLogs(): LogItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    return JSON.parse(raw) as LogItem[]
  } catch {
    return []
  }
}

export function saveLogs(logs: LogItem[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(logs))
}
