# How Accuracy Is Measured

This document explains every metric displayed on the results screen.

---

## What counts as a "correct character"?

Each character is evaluated **positionally**. Character at position `i` is correct if the character you typed at that position exactly matches the character at position `i` in the source text. Backspacing and retyping does not erase the error from the record — only the final character in each position counts.

---

## Accuracy (%)

```
accuracy = (correct_chars / total_chars_typed) * 100
```

- `correct_chars` — number of positions where your typed character matched the source character.
- `total_chars_typed` — total number of characters you typed (i.e., how far you got in the text).
- Result is rounded to the nearest integer.
- If you typed zero characters, accuracy shows 100%.

**Example:** You typed 120 characters, 114 were correct.
`accuracy = (114 / 120) * 100 = 95%`

---

## Raw WPM

```
raw_wpm = (total_chars_typed / 5) / elapsed_minutes
```

- Dividing by 5 converts characters to "words" using the standard definition (1 word = 5 characters).
- Includes **all** typed characters, correct or not.
- Raw WPM is always >= Net WPM.

**Example:** 120 chars typed in 1 minute → `(120/5)/1 = 24 wpm`

---

## Net WPM

```
net_wpm = (correct_chars / 5) / elapsed_minutes
```

- Only correct characters are counted toward words.
- This is the **competitive standard** and is used for your Personal Best.

**Example:** 114 correct chars in 1 minute → `(114/5)/1 = 22.8 → 23 wpm`

---

## Adjusted WPM

```
adj_wpm = net_wpm - (error_count / elapsed_minutes)
```

- Applies an additional penalty of 1 WPM per error per minute.
- Designed to discourage "spray and pray" typing with lots of backspacing.
- Can go **negative** on very error-heavy runs.

**Example:** Net WPM = 23, 6 errors in 1 minute → `23 - (6/1) = 17 wpm`

---

## The "elapsed_minutes" denominator

All formulas use:

```
elapsed_minutes = max(elapsed_ms / 60000, 1/60)
```

The lower bound of `1/60` (one second) prevents division by zero in the impossible edge case where the elapsed time rounds to zero.

---

## Personal Best

Your all-time best **Net WPM** is stored in `localStorage` under the key `pb_net_wpm`. It is updated at the end of every test where your Net WPM exceeds the stored value. It persists across browser sessions.
