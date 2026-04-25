import { useRef, useEffect, useCallback } from 'react'
import './TypingArea.css'

export default function TypingArea({ text, typedChars, phase, onKeyDown, onReset }) {
  const inputRef = useRef(null)
  const prevValueRef = useRef('')
  const tabPressedRef = useRef(false)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleContainerClick = useCallback(() => {
    inputRef.current?.focus()
  }, [])

  // Mobile fallback: detect char added or backspace via input event
  const handleInput = useCallback((e) => {
    if (e.isComposing) return
    const newValue = e.target.value
    const prev = prevValueRef.current

    if (newValue.length > prev.length) {
      const addedChar = newValue[newValue.length - 1]
      onKeyDown({ key: addedChar, preventDefault: () => {} })
    } else if (newValue.length < prev.length) {
      onKeyDown({ key: 'Backspace', preventDefault: () => {} })
    }

    prevValueRef.current = ''
    e.target.value = ''
  }, [onKeyDown])

  const handleKeyDown = useCallback((e) => {
    if (e.isComposing) return

    if (e.key === 'Tab') {
      e.preventDefault()
      tabPressedRef.current = true
      return
    }

    if (e.key === 'Enter' && tabPressedRef.current) {
      e.preventDefault()
      tabPressedRef.current = false
      onReset()
      return
    }

    tabPressedRef.current = false
    prevValueRef.current = e.target.value
    onKeyDown(e)
  }, [onKeyDown, onReset])

  const currentIndex = typedChars.length
  const currentCharRef = useRef(null)

  useEffect(() => {
    currentCharRef.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
  }, [currentIndex])

  return (
    <div
      className="typing-area-wrapper"
      onClick={handleContainerClick}
      role="textbox"
      aria-label="Typing area"
    >
      <input
        ref={inputRef}
        className="hidden-input"
        type="text"
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck={false}
        inputMode="text"
        onKeyDown={handleKeyDown}
        onInput={handleInput}
        aria-hidden="true"
        tabIndex={-1}
        readOnly={phase === 'finished'}
      />
      <div
        className="typing-area"
        data-phase={phase}
      >
        {text.split('').map((char, i) => {
          let state = 'untyped'
          if (i < typedChars.length) {
            state = typedChars[i] === char ? 'correct' : 'incorrect'
          } else if (i === currentIndex) {
            state = 'current'
          }

          return (
            <span
              key={i}
              className={`char char--${state}`}
              ref={i === currentIndex ? currentCharRef : null}
            >
              {char}
            </span>
          )
        })}
      </div>
      {phase === 'idle' && (
        <p className="typing-hint">click here and start typing...</p>
      )}
    </div>
  )
}
