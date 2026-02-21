import { ja } from '../ui/ja'

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
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
        {ja.panels.commandTitle}
      </h2>
      <button
        onClick={handleGenerate}
        className="inline-flex items-center justify-center rounded-lg px-3 py-2 text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm hover:shadow transition active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {ja.buttons.generateCommand}
      </button>
      <p className="mt-2 text-sm text-slate-700">
        {currentCommand
          ? <>{ja.labels.currentCommandLabel}{currentCommand}</>
          : ja.labels.noCurrentCommand}
      </p>
    </div>
  )
}
