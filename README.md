# use-timer

React hook that returns a timer's remaining span as a formatted time string, e.g. 65 -> "01:05", as well as numerically.

## Table of Contents

- [use-timer](#use-timer)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Usage](#usage)
    - [Configuration](#configuration)
    - [Properties](#properties)
  - [TypeScript Support](#typescript-support)
  - [License](#license)

---

## Installation 

Install through your package manager of choice (npm, yarn, etc.)

```
npm -i @mzaleski/use-timer
```

```
yarn add @mzaleski/use-timer
```

## Usage

```jsx
import { useTimer } from '@mzaleski/use-timer';

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

### Configuration

The hook's configuration options are as follows:

| Name             | Type     | Description                                |
| ---------------- | -------- | ------------------------------------------ |
| `initialSeconds` | Number   | Initial (remaining) time in seconds        |
| `initialFreeze`  | Boolean  | Initial freeze state                       |
| `onCompleted`    | Function | A hook called once the timer has completed |

### Properties

The hook returns the following properties:

| Name               | Type     | Description                                                                                                              |
| ------------------ | -------- | ------------------------------------------------------------------------------------------------------------------------ |
| `timeRemaining`    | String   | The time remaining as a formatted string, e.g. "01:05"                                                                   |
| `secondsRemaining` | Number   | The time remaining as seconds                                                                                            |
| `isFrozen`         | Boolean  | Whether the timer is frozen                                                                                              |
| `setFreeze`        | Function | A setter for the timer's freeze state                                                                                    |
| `resetTimer`       | Function | A function to force-reset the timer – takes the `freeze` parameter which dictates whether to start the timer upon reset. |

## TypeScript Support 

You will find a collection of typings bundled with the package.

## License

[MIT License](LICENSE) (c) 2022 Maximilien Zaleski
