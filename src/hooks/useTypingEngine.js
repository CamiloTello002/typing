import { useState, useRef, useCallback, useEffect } from 'react'

export function useTypingEngine(text) {
  const [typedChars, setTypedChars] = useState([])
  const [phase, setPhase] = useState('idle')
  const [elapsedMs, setElapsedMs] = useState(0)
  const [personalBest, setPersonalBest] = useState(() => {
    return parseInt(localStorage.getItem('pb_net_wpm') ?? '0', 10)
  })

  const startTimeRef = useRef(null)
  const intervalRef = useRef(null)
  const phaseRef = useRef('idle')
  const typedCharsRef = useRef([])

  phaseRef.current = phase
  typedCharsRef.current = typedChars

  const computeMetrics = useCallback((chars, ms) => {
    const elapsedMin = Math.max(ms / 60_000, 1 / 60)
    const totalTyped = chars.length
    const correctChars = chars.filter((c, i) => c === text[i]).length
    const errorCount = totalTyped - correctChars
    const rawWPM = Math.round((totalTyped / 5) / elapsedMin)
    const netWPM = Math.round((correctChars / 5) / elapsedMin)
    const adjWPM = Math.round(netWPM - errorCount / elapsedMin)
    const accuracy = totalTyped === 0 ? 100 : Math.round((correctChars / totalTyped) * 100)
    return { rawWPM, netWPM, adjWPM, accuracy }
  }, [text])

  const finishTest = useCallback((chars, ms) => {
    if (phaseRef.current === 'finished') return
    clearInterval(intervalRef.current)
    setPhase('finished')
    const { netWPM } = computeMetrics(chars, ms)
    setPersonalBest(prev => {
      if (netWPM > prev) {
        localStorage.setItem('pb_net_wpm', String(netWPM))
        return netWPM
      }
      return prev
    })
  }, [computeMetrics])

  const handleKeyDown = useCallback((e) => {
    if (phaseRef.current === 'finished') return

    const key = e.key

    if (key === 'Backspace') {
      e.preventDefault()
      if (e.altKey || e.ctrlKey) {
        // Delete whole word (Option+Backspace on Mac, Ctrl+Backspace on Windows)
        setTypedChars(prev => {
          if (prev.length === 0) return prev
          let i = prev.length - 1
          while (i >= 0 && prev[i] !== ' ') i--
          const next = prev.slice(0, i + 1)
          typedCharsRef.current = next
          return next
        })
      } else {
        setTypedChars(prev => {
          if (prev.length === 0) return prev
          const next = prev.slice(0, -1)
          typedCharsRef.current = next
          return next
        })
      }
      return
    }

    if (key.length !== 1) return
    if (e.metaKey || e.ctrlKey || e.altKey) return

    e.preventDefault()

    if (phaseRef.current === 'idle') {
      startTimeRef.current = Date.now()
      phaseRef.current = 'typing'
      setPhase('typing')
      intervalRef.current = setInterval(() => {
        const elapsed = Date.now() - startTimeRef.current
        setElapsedMs(elapsed)
        if (elapsed >= 60_000) {
          const currentChars = typedCharsRef.current
          setElapsedMs(60_000)
          finishTest(currentChars, 60_000)
        }
      }, 100)
    }

    setTypedChars(prev => {
      const next = [...prev, key]
      typedCharsRef.current = next
      if (next.length === text.length) {
        const elapsed = Date.now() - startTimeRef.current
        setElapsedMs(elapsed)
        finishTest(next, elapsed)
      }
      return next
    })
  }, [text, finishTest])

  const resetTest = useCallback(() => {
    clearInterval(intervalRef.current)
    startTimeRef.current = null
    phaseRef.current = 'idle'
    typedCharsRef.current = []
    setTypedChars([])
    setPhase('idle')
    setElapsedMs(0)
  }, [])

  useEffect(() => {
    return () => clearInterval(intervalRef.current)
  }, [])

  const elapsedMin = Math.max(elapsedMs / 60_000, 1 / 60)
  const totalTyped = typedChars.length
  const correctChars = typedChars.filter((c, i) => c === text[i]).length
  const errorCount = totalTyped - correctChars
  const rawWPM = Math.round((totalTyped / 5) / elapsedMin)
  const netWPM = Math.round((correctChars / 5) / elapsedMin)
  const adjWPM = Math.round(netWPM - errorCount / elapsedMin)
  const accuracy = totalTyped === 0 ? 100 : Math.round((correctChars / totalTyped) * 100)

  return {
    typedChars,
    phase,
    elapsedMs,
    personalBest,
    rawWPM,
    netWPM,
    adjWPM,
    accuracy,
    handleKeyDown,
    resetTest,
  }
}
