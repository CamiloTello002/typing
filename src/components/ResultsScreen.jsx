import './ResultsScreen.css'

export default function ResultsScreen({ rawWPM, netWPM, adjWPM, accuracy, personalBest, onReset }) {
  const isNewPB = netWPM > 0 && netWPM >= personalBest


  return (
    <div className="results">
      <h2 className="results-title">test complete</h2>

      <div className="results-metrics">
        <div className="metric metric--main">
          <span className="metric-value">{netWPM}</span>
          <span className="metric-label">net wpm</span>
        </div>
        <div className="metric">
          <span className="metric-value">{rawWPM}</span>
          <span className="metric-label">raw wpm</span>
        </div>
        <div className="metric">
          <span className="metric-value">{adjWPM}</span>
          <span className="metric-label">adj wpm</span>
        </div>
        <div className="metric">
          <span className="metric-value">{accuracy}%</span>
          <span className="metric-label">accuracy</span>
        </div>
      </div>

      {isNewPB && (
        <div className="pb-banner">
          new personal best!
        </div>
      )}

      <button className="reset-btn" onClick={onReset}>
        next test
      </button>
    </div>
  )
}
