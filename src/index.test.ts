import { renderHook, act } from '@testing-library/react-hooks';
import { useTimer } from './';

describe('init', () => {
  const { result } = renderHook(() => useTimer(10, true));

  it('should set `secondsRemaining`', () =>
    expect(result.current.secondsRemaining).toBe(10));
  it('should set `timeRemaining`', () =>
    expect(result.current.timeRemaining).toBe('00:10'));
  it('should set `isFrozen`', () => expect(result.current.isFrozen).toBe(true));
});

describe('time string', () => {
  it('should return 00:xx seconds', () => {
    const { result } = renderHook(() => useTimer(10, true));
    expect(result.current.timeRemaining).toBe('00:10');
  });
  it('should return xx:00 minutes and seconds', () => {
    const { result } = renderHook(() => useTimer(60, true));
    expect(result.current.timeRemaining).toBe('01:00');
  });
  it('should return xx:xx minutes and seconds', () => {
    const { result } = renderHook(() => useTimer(65, true));
    expect(result.current.timeRemaining).toBe('01:05');
  });
  it('should return 00:00', () => {
    const { result } = renderHook(() => useTimer(0, true));
    expect(result.current.timeRemaining).toBe('00:00');
  });
});

describe('timer', () => {
  it('should tick down every second', async () => {
    const { result, waitForValueToChange } = renderHook(() =>
      useTimer(60, false)
    );

    expect(result.current.secondsRemaining).toBe(60);
    expect(result.current.timeRemaining).toBe('01:00');

    await waitForValueToChange(() => result.current.secondsRemaining);

    expect(result.current.secondsRemaining).toBe(59);
    expect(result.current.timeRemaining).toBe('00:59');
  });

  it('should freeze when time is up', async () => {
    const { result, waitForValueToChange } = renderHook(() =>
      useTimer(1, false)
    );
    expect(result.current.isFrozen).toBe(false);

    await waitForValueToChange(() => result.current.secondsRemaining);
    expect(result.current.isFrozen).toBe(true);
  });

  it('should call `onCompleted` when time is up', async () => {
    const onCompleted = jest.fn();
    const { result, waitForValueToChange } = renderHook(() =>
      useTimer(1, false, onCompleted)
    );
    expect(onCompleted).not.toHaveBeenCalled();

    await waitForValueToChange(() => result.current.secondsRemaining);
    expect(onCompleted).toHaveBeenCalled();
  })

  it('should reset', async () => {
    const { result, waitForValueToChange } = renderHook(() =>
      useTimer(1, false)
    );
    expect(result.current.secondsRemaining).toBe(1);

    await waitForValueToChange(() => result.current.secondsRemaining);
    expect(result.current.secondsRemaining).toBe(0);

    act(() => result.current.resetTimer());
    expect(result.current.secondsRemaining).toBe(1);
  });
});
