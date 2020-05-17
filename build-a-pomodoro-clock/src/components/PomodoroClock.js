/**
 * FreeCodeCamp
 * Front End Libraries Projects - Build a Pomodoro Clock
 * 
 * My Demo Adress
 * @link https://pomodoroclock-a9ec1.firebaseapp.com
 * 
 * @author Wendy Du
 * @version 1.0
 * @since 2020-05-16
 */

import React from 'react';
import "./PomodoroClock.css";

/**
 * This is the pomodoro clock component
 */
class PomodoroClock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      breakLength: 5,
      sessionLength: 25,
      runningFlag: false,
      interval: 0,
      sessionBreakText: "Session",
      timerDisplay: "25:00",
      timerMinutes: 25,
      timerSeconds: 0,
    };
    this.handleClick = this.handleClick.bind(this);
    this.sessionCountdown = this.sessionCountdown.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.timerDisplayString = this.timerDisplayString.bind(this);
  }

  /**
   * After the component is mounted, set buttons click event
   * set timer title text color
   */
  componentDidMount() {
    const buttons = document.getElementsByTagName("button");
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener("click", this.handleClick);
    }
    document.getElementById("sessionBreakText").style.color = "#007bff"; 
  }

  /**
   * control the button's click event
   * @param event - event of buttons
   */
  handleClick(event) {
    const clickId = event.target.id;
    let breakLength = this.state.breakLength;
    let sessionLength = this.state.sessionLength;
    let runningFlag = this.state.runningFlag;
    let interval = this.state.interval;
    let sessionBreakText = this.state.sessionBreakText;
    let timerMinutes = this.state.timerMinutes;
    let timerSeconds = this.state.timerSeconds;
    let timerDisplay = this.state.timerDisplay;

    switch (clickId) {
      /**
       * click the break-decrement button,
       * the breakLength value decrements by a value of 1,
       * breakLength minimum value is 1.
       * @note the button will not work if the timer is running
       */
      case "break-decrement":
        if (!runningFlag) {
          breakLength = (breakLength === 1) ? 1 : breakLength - 1;
          if (sessionBreakText === "Break") {
            timerMinutes = breakLength;
            timerSeconds = 0;
          }
        }
        break;

      /**
       * click the break-increment button,
       * the breakLength value increments by a value of 1,
       * breakLength maximum value is 60.
       * @note the button will not work if the timer is running
       */
      case "break-increment":
        if (!runningFlag) {
          breakLength = (breakLength === 60) ? 60 : breakLength + 1;
          if (sessionBreakText === "Break") {
            timerMinutes = breakLength;
            timerSeconds = 0;
          }
        }
        break;

      /**
       * click the session-decrement button,
       * the sessionLength value decrements by a value of 1,
       * sessionLength minimum value is 1.
       * @note the button will not work if the timer is running
       */
      case "session-decrement":
        if (!runningFlag) {
          sessionLength = (sessionLength === 1) ? 1 : sessionLength - 1;
          if (sessionBreakText === "Session") {
            timerMinutes = sessionLength;
            timerSeconds = 0;
          }
        }
        break;

      /**
       * click the session-increment button,
       * the sessionLength value increments by a value of 1,
       * sessionLength maximum value is 60.
       * @note the button will not work if the timer is running
       */
      case "session-increment":
        if (!runningFlag) {
          sessionLength = (sessionLength === 60) ? 60 : sessionLength + 1;
          if (sessionBreakText === "Session") {
            timerMinutes = sessionLength;
            timerSeconds = 0;
          }
        }
        break;

      /**
       * click the start_stop button, switch between timer running and pausing
       * If the timer is running, the countdown should pause.
       * If the timer is pausing, the countdown should run.
       */
      case "start_stop":
        this.setState({runningFlag: !runningFlag});
        if (runningFlag) {
          clearInterval(interval)
        } else {
            this.setState({
              interval: setInterval(this.sessionCountdown, 1000)
            })
        }
        break;

      /**
       * run handleReset function to reset the timer
       */
      case "reset":
        this.handleReset();
        break;

      default:
        console.log("error");
        break;
    }

    timerDisplay = this.timerDisplayString(timerMinutes,timerSeconds);
    if (clickId !== "reset") {
      this.setState({
        breakLength: breakLength,
        sessionLength: sessionLength,
        timerMinutes: timerMinutes,
        timerSeconds: timerSeconds,
        timerDisplay: timerDisplay
      });
    }
  }

  /**
   * This method is main method to control the timer
   * set states,
   * switch the action between running and pausing
   */
  sessionCountdown() {
    let timerMinutes = this.state.timerMinutes;
    let timerSeconds = this.state.timerSeconds;
    let sessionBreakText = this.state.sessionBreakText;
    let sessionLength = this.state.sessionLength;
    let breakLength = this.state.breakLength;
    
    let distance = timerMinutes*60 + timerSeconds - 1;

    timerMinutes = Math.floor(distance / 60);
    timerSeconds = Math.floor(distance % 60);
  
    const timerDisplay = this.timerDisplayString(timerMinutes,timerSeconds);
  
    if (distance === 0) {
      document.getElementById("beep").play();
      if (sessionBreakText === "Session") {
        sessionBreakText = "Break";
        timerMinutes = breakLength;
        timerSeconds = 1;
        document.getElementById("sessionBreakText").style.color = "#dc3545"; 
      } else {
        sessionBreakText = "Session";
        timerMinutes = sessionLength;
        timerSeconds = 1;
        document.getElementById("sessionBreakText").style.color = "#007bff"; 

      }
    }

    this.setState({
      timerMinutes: timerMinutes,
      timerSeconds: timerSeconds,
      timerDisplay: timerDisplay,
      sessionBreakText: sessionBreakText
    });
  }

  /**
   * Return string of the remaining time in mm:ss format
   * for example 22:43
   * @param minutes - the left minutes of the timer
   * @param seconds - the left seconds of the timer
   */
  timerDisplayString(minutes,seconds) {
    let minutesString = minutes < 10 ? "0"+minutes.toString(): minutes.toString();
    let secondsString = seconds < 10 ? "0"+seconds.toString(): seconds.toString();
    let timerDisplay = minutesString + ":" + secondsString;
    return timerDisplay;
  }

  /**
   * This method is use to reset the pomodoro clock.
   * any running timer is stopped, 
   * beep stop playing and is rewound to the beginning 
   * the states should reset to original value
   */
  handleReset(){
    clearInterval(this.state.interval);
    document.getElementById("beep").pause();
    document.getElementById("beep").currentTime = 0;
    this.setState ({
      breakLength: 5,
      sessionLength: 25,
      runningFlag: false,
      interval: 0,
      sessionBreakText: "Session",
      timerDisplay: "25:00",
      timerMinutes: 25,
      timerSeconds: 0,
    });
  }
  
  render() {
    return (
      <div className="container containerDiv mt-5 p-3">
        <div className="container text-center clockDiv float-right">
          <h4 className="mt-3">Pomodorm Clock</h4>
          <div className="container timeBlock bg-light text-center p-1" id="sessionBreakText">
            <div><h5 className="mt-2" id="timer-label">{this.state.sessionBreakText}</h5></div>
            <div><h1 id="time-left">
              {this.state.timerDisplay}
            </h1>
            </div>
          </div>
          <div className="container mt-4 mb-4">
            <div className="row">
              <div className="col-6">
                <h6 className="lengthText" id="break-label">Break Length</h6>
                <div className="row d-flex sBtnDiv justify-content-md-center">
                  <button className="btn btn-warning deButton" id="break-decrement">-</button>
                  <p className="text-warning textLength" id="break-length">{this.state.breakLength}</p>
                  <button className="btn btn-warning deButton" id="break-increment">+</button>
                </div>
              </div>
              <div className="col-6">
                <h6 className="lengthText" id="session-label">Session Length</h6>
                <div className="row d-flex sBtnDiv justify-content-md-center">
                  <button className="btn btn-primary deButton" id="session-decrement">-</button>
                  <p className="text-info textLength" id="session-length">{this.state.sessionLength}</p>
                  <button className="btn btn-primary deButton" id="session-increment">+</button>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <button className="btn bigButton" id="reset">Reset</button>
            </div>
            <div className="col-6">
    <button className="btn bigButton" id="start_stop">{this.state.runningFlag ? "Pause" : "Start"}</button>
            </div>
          </div>
        </div>
        <audio 
          id="beep" 
          preload="auto" 
          src="http://commondatastorage.googleapis.com/codeskulptor-demos/riceracer_assets/music/start.ogg"
        />
      </div>
    )
  }
}

export default PomodoroClock;