# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server with HMR
npm run build     # Production build
npm run preview   # Preview production build
npm run lint      # Run ESLint
```

No test suite is configured.

## Code Style

Use comments sparingly, only comment complex code.

## Architecture

This is a React + Vite typing speed test app (monkeytype-style).

**Data flow:**
- `src/data/texts.js` — array of 15 fixed passages; `getRandomText(excludeIndex)` picks a random one avoiding repeats
- `src/hooks/useTypingEngine.js` — all typing logic lives here: phase state machine (`idle` → `typing` → `finished`), keystroke handling, WPM/accuracy computation, 60-second timer, personal best persisted to `localStorage` as `pb_net_wpm`
- `src/App.jsx` — composes the engine hook with UI components; manages current text selection and reset flow
- `src/components/TypingArea.jsx` — renders each character as a `<span>` with state (`correct`/`incorrect`/`current`/`untyped`); uses a hidden `<input>` to capture keystrokes; supports both desktop (`onKeyDown`) and mobile (`onInput` fallback); Tab+Enter resets the test
- `src/components/TimerBar.jsx` — visual timer progress bar driven by `elapsedMs`
- `src/components/ResultsScreen.jsx` — shows rawWPM, netWPM, adjWPM, accuracy; detects new personal best

**WPM formulas:**
- rawWPM = (totalChars / 5) / elapsedMin
- netWPM = (correctChars / 5) / elapsedMin
- adjWPM = netWPM − (errors / elapsedMin)
