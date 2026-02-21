import type { LogItem, SystemLogItem } from '../types'

const STORAGE_KEY = 'ai-manager-logs'
const SYSTEM_LOGS_KEY = 'ai-manager-system-logs'

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

export function loadSystemLogs(): SystemLogItem[] {
  try {
    const raw = localStorage.getItem(SYSTEM_LOGS_KEY)
    if (!raw) return []
    return JSON.parse(raw) as SystemLogItem[]
  } catch {
    return []
  }
}

export function saveSystemLogs(logs: SystemLogItem[]): void {
  localStorage.setItem(SYSTEM_LOGS_KEY, JSON.stringify(logs))
}
