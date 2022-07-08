function App() {
  const [breakLength, setBreakLength] = React.useState(5);
  const [sessionLength, setSessionLength] = React.useState(25);
  const [timeLeft, seTtimeLeft] = React.useState(1500);
  const [timingType, setTimingtype] = React.useState("SESSION");

  const [play, setPlay] = React.useState(false);

  const timeout = setTimeout(() => {
    if (timeLeft && play) {
      seTtimeLeft(timeLeft - 1)
    }
  }, 1000);

  const handleBreakIncrease = () => {
    if (breakLength < 60) {
      setBreakLength(breakLength + 1)
    }
  }

  const handleBreakDecrease = () => {
    if (breakLength > 1) {
      setBreakLength(breakLength - 1)
    }
  }

  const handleSessionIncrease = () => {
    if (sessionLength < 60) {
      setSessionLength(sessionLength + 1)
      seTtimeLeft(timeLeft + 60)
    }
  }

  const handleSessionDecrease = () => {
    if (sessionLength > 1) {
      setSessionLength(sessionLength - 1)
      seTtimeLeft(timeLeft - 60)
    }
  }

  const handleReset = () => {
    clearTimeout(timeout);
    setPlay(false);
    seTtimeLeft(1500);
    setBreakLength(5);
    setSessionLength(25);
    setTimingtype("SESSION");
    const audio = document.getElementById("beep");
    audio.pause()
    audio.currentTime = 0;
  }

  const handlePlay = () => {
    clearTimeout(timeout);
    setPlay(!play);
  }

  const resetTimer = () => {
    const audio = document.getElementById("beep");
    if (!timeLeft && timingType === "SESSION") {
      seTtimeLeft(breakLength * 60)
      setTimingtype("BREAK")
      audio.play()
    }
    if (!timeLeft && timingType === "BREAK") {
      seTtimeLeft(sessionLength * 60)
      setTimingtype("SESSION")
      audio.pause()
      audio.currentTime = 0;
    }
  }

  const clock = () => {
    if (play) {
      timeout
      resetTimer()
    } else {
      clearTimeout(timeout)
    }
  }

  React.useEffect(() => {
    clock()
  }, [play, timeLeft, timeout])

  const timeFormatter = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft - minutes * 60;
    const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    return `${formattedMinutes}:${formattedSeconds}`;
  }

  const title = timingType === "SESSION" ? "Session" : "Break";

  return (
    <div className="px-4 py-5 my-5 text-center">
      <h1 className="display-5 fw-bold">Pomodoro Timer</h1>
      <div className="container">
        <div className="row row-cols-2">
          <div className="col">
            <div className="card text-center">
              <h3 className="card-header" id="break-label">Break Length</h3>
              <div className="card-body">
                <h4 className="card-title" id="break-length">{breakLength}</h4>
                <button type="button" class="btn btn-primary m-2" onClick={handleBreakIncrease} id="break-increment">
                  Increase 🔼
                </button>
                <button type="button" class="btn btn-primary m-2" onClick={handleBreakDecrease} id="break-decrement">
                  Decrease 🔽
                </button>
              </div>
            </div>
          </div>

          <div className="col">
            <div className="card text-center">
              <h3 className="card-header" id="session-label">Session Length</h3>
              <div className="card-body">
                <h4 className="card-title" id="session-length">{sessionLength}</h4>
                <button type="button" class="btn btn-primary m-2" onClick={handleSessionIncrease} id="session-increment">
                  Increase 🔼
                </button>
                <button type="button" class="btn btn-primary m-2" onClick={handleSessionDecrease} id="session-decrement">
                  Decrease 🔽
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container my-4">
        <div className="timer card text-center">
          <div className="card-body">
            <h2 className="card-title" id="timer-label">{title}</h2>
            <p className="card-text" id="time-left">{timeFormatter()}</p>
            <button type="button" class="btn btn-success m-2" onClick={handlePlay} id="start_stop">Start / Stop ⏯️</button>
            <button type="button" class="btn btn-info m-2" onClick={handleReset} id="reset">Reset 🔄</button>
          </div>
        </div>
      </div>
      <audio
        id="beep"
        preload="auto"
        src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
      />
    </div>
  );
}



ReactDOM.render(<App />, document.getElementById('root'));