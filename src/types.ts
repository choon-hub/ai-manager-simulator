export type LogItem = {
  id: string
  command: string
  report: string
  review: string
  timestamp: number
}

export type SystemLogItem = {
  id: string
  type: 'COMMAND_GENERATED' | 'REPORT_SUBMITTED' | 'REVIEW_CREATED' | 'LOG_CLEARED'
  message: string
  timestamp: number
}
