import {Component} from 'react'
import './index.css'

class Stopwatch extends Component {
  state = {timerInSecs: 0, isTimerStarted: false}

  componentWillUnmount() {
    this.clearTimer()
    this.setState({timerInSecs: 0})
  }

  clearTimer = () => clearInterval(this.timerId)

  onClickInitiateTimer = () => {
    this.setState({isTimerStarted: true})
    this.timerId = setInterval(this.startTimer, 1000)
  }

  startTimer = () => {
    this.setState(prevState => ({timerInSecs: prevState.timerInSecs + 1}))
  }

  stopTimer = () => {
    this.setState({isTimerStarted: false})
    this.clearTimer()
  }

  resetTimer = () => {
    this.clearTimer()
    this.setState({timerInSecs: 0})
  }

  timerInTimeString = () => {
    const {timerInSecs} = this.state
    const totalMins = Math.floor(timerInSecs / 60)
    const totalSecs = Math.floor(timerInSecs % 60)
    const mins = totalMins > 9 ? totalMins : `0${totalMins}`
    const secs = totalSecs > 9 ? totalSecs : `0${totalSecs}`

    return {mins, secs}
  }

  render() {
    const {isTimerStarted} = this.state
    const {mins, secs} = this.timerInTimeString()

    return (
      <div className="container">
        <h1 className="heading">Stopwatch</h1>
        <div className="stopwatch-container">
          <div className="timer-heading-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/stopwatch-timer.png"
              alt=""
              className="timer-img"
            />
            <p className="timer-text">Timer</p>
          </div>
          <h1 testid="timer" className="timer-display">
            {`${mins}:${secs}`}
          </h1>
          <div className="timer-controls-container">
            <button
              type="button"
              onClick={this.onClickInitiateTimer}
              className="start-btn"
              disabled={isTimerStarted}
            >
              Start
            </button>
            <button type="button" onClick={this.stopTimer} className="stop-btn">
              Stop
            </button>
            <button
              type="button"
              onClick={this.resetTimer}
              className="reset-btn"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default Stopwatch
