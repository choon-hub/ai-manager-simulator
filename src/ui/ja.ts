export const ja = {
  appTitle: 'AIマネージャー・シミュレーター',

  conceptTitle: 'コンセプト',
  conceptBodyLines: [
    'このアプリは作品です。',
    'AIが命令を出します。',
    '人間が実装し、報告します。',
    'AIが査定します。',
    'すべての操作はログに残り、保存されます。',
  ],

  howToDemoTitle: 'デモ手順',
  howToDemoSteps: [
    '「命令を生成」をクリック',
    '短い報告を書いて送信',
    '「査定ログ」と「システムログ」を確認',
    'ページをリロードしてログが残ることを確認',
    '「査定ログをクリア」をクリック（システムログは残る）',
  ],

  nextActionTitle: '次のアクション',
  nextActionAwaitingCommand: '命令待ち',
  nextActionAwaitingReport: '報告待ち',
  nextActionTextNoCommand: '1) 命令を生成して、報告を送信してください。',
  nextActionTextHasCommand: '1) 現在の命令に対する報告を送信してください。',

  panels: {
    commandTitle: '命令',
    reportTitle: '報告',
    reviewLogTitle: '査定ログ',
    systemLogTitle: 'システムログ',
  },

  buttons: {
    generateCommand: '命令を生成',
    submitReport: '報告を送信',
    clearReviewLogs: '査定ログをクリア',
  },

  labels: {
    currentCommandLabel: '現在の命令：',
    noCurrentCommand: '現在の命令はありません。',
    logCommand: '命令：',
    logReport: '報告：',
    logReview: '査定：',
    logTime: '日時：',
  },

  tips: {
    reportTip: 'ヒント：20文字以上書くと「承認」になりやすいです。',
  },

  empty: {
    reviewEmpty: 'まだ査定ログはありません。命令を生成して報告を送信してください。',
    systemEmpty: 'まだシステムログはありません。操作するとここに表示されます。',
  },

  badges: {
    approved: '承認',
    needsMoreDetail: '要追記',
  },

  placeholder: {
    report: '実装報告を入力してください...',
  },
} as const
