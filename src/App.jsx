import { useState } from 'react'
import { getRandomText } from './data/texts'
import { useTypingEngine } from './hooks/useTypingEngine'
import TimerBar from './components/TimerBar'
import TypingArea from './components/TypingArea'
import ResultsScreen from './components/ResultsScreen'
import './App.css'

function App() {
  const [currentText, setCurrentText] = useState(() => getRandomText())
  const engine = useTypingEngine(currentText.text)

  function handleReset() {
    const next = getRandomText(currentText.index)
    setCurrentText(next)
    engine.resetTest()
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-logo">typetest</h1>
        <div className="pb-badge">
          pb: <span>{engine.personalBest > 0 ? `${engine.personalBest} wpm` : '--'}</span>
        </div>
      </header>

      <main className="app-main">
        {engine.phase !== 'finished' ? (
          <>
            <TimerBar elapsedMs={engine.elapsedMs} phase={engine.phase} />
            <TypingArea
              text={currentText.text}
              typedChars={engine.typedChars}
              phase={engine.phase}
              onKeyDown={engine.handleKeyDown}
              onReset={handleReset}
            />
          </>
        ) : (
          <ResultsScreen
            rawWPM={engine.rawWPM}
            netWPM={engine.netWPM}
            adjWPM={engine.adjWPM}
            accuracy={engine.accuracy}
            personalBest={engine.personalBest}
            onReset={handleReset}
          />
        )}
      </main>
    </div>
  )
}

export default App
