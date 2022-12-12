# use-timer

React hook that returns a timer's remaining span as a formatted time string, e.g. 65 -> "1:05", as well as numerically.

## Table of Contents

- [use-timer](#use-timer)
  - [Table of Contents](#table-of-contents)
  - [Getting Started](#getting-started)
  - [Usage](#usage)
    - [Hook Returned Properties](#hook-returned-properties)
    - [Hook Options](#hook-options)
  - [TypeScript Support](#typescript-support)
  - [License](#license)

---

## Getting Started 

Install through your package manager of choice (npm, yarn, etc.)

```
npm -i @mz/use-timer
```

```
yarn add @mz/use-timer
```

## Usage

```jsx
import { useTimer } from '@mz/use-timer';

function Component(props) {
  const { timeRemaining, secondsRemaining, setFreeze, resetTimer } = useTimer(65, false,                               
    () => console.log('Timer finished!') 
  );

  return (
    <div>
      <p>Time remaining: {timeRemaining}</p>
      <p>Seconds remaining: {secondsRemaining}</p>
      <button onClick={() => setFreeze(true)}>Freeze</button>
      <button onClick={() => setFreeze(false)}>Unfreeze</button>
      <button onClick={() => resetTimer()}>Reset</button>
    </div>
  );
}
```

### Hook Returned Properties

| Name               | Description                                                                                                                 |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------- |
| `timeRemaining`    | The time remaining as a formatted string, e.g. "1:05"                                                                       |
| `secondsRemaining` | The time remaining as seconds                                                                                               |
| `isFrozen`         | Whether the timer is frozen                                                                                                 |
| `setFreeze`        | A setter for the timer's freeze state                                                                                       |
| `resetTimer`       | A function to force-reset the timer – takes the `freeze` parameter which dictates whether to start the timer upon reset.    |

### Hook Options 

| Name             | Description                                |
| ---------------- | ------------------------------------------ |
| `initialSeconds` | Initial (remaining) time in seconds        |
| `initialFreeze`  | Initial freeze state                       |
| `onCompleted`    | A hook called once the timer has completed |

## TypeScript Support 

You will find a collection of typings bundled with the package.

## License

[MIT License](LICENSE) (c) 2022 Maximilien Zaleski
