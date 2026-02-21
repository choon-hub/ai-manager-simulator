const COMMANDS = [
  'Implement feature X',
  'Fix bug Y',
  'Refactor module Z',
  'Write tests for service A',
  'Optimize query B',
]

type Props = {
  currentCommand: string | null
  onGenerate: (command: string) => void
}

export default function CommandPanel({ currentCommand, onGenerate }: Props) {
  function handleGenerate() {
    const index = Math.floor(Math.random() * COMMANDS.length)
    onGenerate(COMMANDS[index])
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-4 sm:p-5">
      <h2 className="text-sm font-semibold text-slate-900 mb-3">Command Panel</h2>
      <button
        onClick={handleGenerate}
        className="inline-flex items-center justify-center rounded-lg px-3 py-2 text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Generate Command
      </button>
      {currentCommand ? (
        <div className="mt-3 rounded-xl border border-indigo-200 bg-indigo-50 p-3">
          <p className="text-xs font-semibold text-indigo-900">Current Command</p>
          <p className="text-sm font-medium text-indigo-900">{currentCommand}</p>
        </div>
      ) : (
        <p className="mt-3 text-sm text-slate-500">No current command.</p>
      )}
    </div>
  )
}
