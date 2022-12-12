/**
MIT License

Copyright (c) 2022 Maximilien Zaleski

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
 */

import React from 'react';

export interface UseTimerState {
  /** The time remaining as a formatted string. */
  timeRemaining: string;
  /** The time remaining as seconds. */
  secondsRemaining: number;
  /** Whether the timer is frozen. */
  isFrozen: boolean;

  /** Whether the timer should count down. */
  setFreeze(value: boolean): void;
  /**
   * Force the timer to reset.
   * @param freeze - Whether the timer should freeze after resetting.
   */
  resetTimer(freeze?: boolean): void;
}

/**
 * useTimer is a hook that spawns a timer which ticks every second.
 *
 * @param initialSeconds - Initial (remaining) time in seconds.
 * @param initialFreeze - Initial freeze state; if true, the timer will not tick.
 * @param onCompleted - Hook called when timer completes.
 */
export function useTimer(
  initialSeconds: number,
  initialFreeze: boolean,
  onCompleted?: () => void
): UseTimerState {
  const [secondsRemaining, setSecondsRemaining] =
    React.useState(initialSeconds);
  const [timeRemaining, setTimeRemaining] = React.useState(getTimeString(initialSeconds));
  const [freeze, setFreeze] = React.useState(initialFreeze);

  React.useEffect(() => setSecondsRemaining(initialSeconds), [initialSeconds]);

  React.useEffect(() => {
    // Make the timer tick every second.
    if (secondsRemaining > 0 && !freeze) {
      const timeout = setTimeout(() => {
        const hydrated = secondsRemaining - 1;
        setTimeRemaining(getTimeString(hydrated));
        setSecondsRemaining(hydrated);
      }, 1000); // 1 second.
      return () => clearTimeout(timeout);
      // Countdown has been reached -> reset timer.
    } else if (secondsRemaining === 0) {
      setFreeze(true);
      // Call `onCompleted` hook if provided.
      if (onCompleted) onCompleted();
    }
  }, [freeze, initialSeconds, onCompleted, secondsRemaining]);

  const resetTimer = React.useCallback(
    (freeze: boolean = false) => {
      setSecondsRemaining(initialSeconds);
      setTimeRemaining(getTimeString(initialSeconds));
      setFreeze(freeze);
    },
    [initialSeconds]
  );

  return {
    timeRemaining,
    secondsRemaining,
    isFrozen: freeze,
    setFreeze,
    resetTimer,
  } as UseTimerState;
}

/**
 * calculateTimeRemaining returns a formatted string of the time remaining.
 *
 * If the time is less than a minute, it will return the time in seconds.
 *
 * @param secondsRemaining - The number of seconds remaining.
 */
function getTimeString(secondsRemaining: number) {
  if(secondsRemaining == 0) return '00:00';
  if (secondsRemaining < 60) return secondsRemaining.toString();
  else {
    const seconds = secondsRemaining % 60;
    const minutes = (secondsRemaining - seconds) / 60;
    return minutes + ':' + (seconds < 10 ? '0' + seconds : seconds);
  }
}
