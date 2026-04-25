import './TimerBar.css'

export default function TimerBar({ elapsedMs, phase }) {
  const secondsLeft = Math.max(0, 60 - Math.floor(elapsedMs / 1000))
  const progressPct = Math.min((elapsedMs / 60_000) * 100, 100)
  const isWarning = secondsLeft <= 10 && phase === 'typing'

  return (
    <div className="timer-bar">
      <span className={`timer-seconds${isWarning ? ' timer-seconds--warning' : ''}`}>
        {secondsLeft}s
      </span>
      <div className="timer-track">
        <div
          className={`timer-fill${isWarning ? ' timer-fill--warning' : ''}`}
          style={{ width: `${100 - progressPct}%` }}
        />
      </div>
    </div>
  )
}
