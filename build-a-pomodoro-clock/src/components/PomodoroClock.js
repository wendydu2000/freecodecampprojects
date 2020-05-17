import React from 'react';
import "./PomodoroClock.css";

class PomodoroClock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      breakLength: 5,
      sessionLength: 25,
      runningFlag: false,
      interval: 0,
      sessionBreakText: "Session",
      timerDisplay: "25",
      timerMinutes: 25,
      timerSeconds: 0,
    };
    this.handleClick = this.handleClick.bind(this);
    this.sessionCountdown = this.sessionCountdown.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  componentDidMount() {
    const buttons = document.getElementsByTagName("button");
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener("click", this.handleClick);
    }
    document.getElementById("sessionBreakText").style.color = "#007bff"; 
  }

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
      case "break-decrement":
        if (!runningFlag) {
          breakLength = (breakLength === 1) ? 1 : breakLength - 1;
          if (sessionBreakText === "Break") {
            timerMinutes = breakLength;
            timerDisplay = breakLength.toString();
            timerSeconds = 0;
          }
        }
        break;

      case "break-increment":
        if (!runningFlag) {
          breakLength = (breakLength === 60) ? 60 : breakLength + 1;
          if (sessionBreakText === "Break") {
            timerMinutes = breakLength;
            timerDisplay = breakLength.toString();
            timerSeconds = 0;
          }
        }
        break;

      case "session-decrement":
        if (!runningFlag) {
          sessionLength = (sessionLength === 1) ? 1 : sessionLength - 1;
          if (sessionBreakText === "Session") {
            timerMinutes = sessionLength;
            timerDisplay = sessionLength.toString();
            timerSeconds = 0;
          }
        }
        break;

      case "session-increment":
        if (!runningFlag) {
          sessionLength = (sessionLength === 60) ? 60 : sessionLength + 1;
          if (sessionBreakText === "Session") {
            timerMinutes = sessionLength;
            timerDisplay = sessionLength.toString();
            timerSeconds = 0;
          }
        }
        break;

      case "start_stop":
        this.setState({runningFlag: !runningFlag});
        if (runningFlag) {
          clearInterval(interval)
        } else {
            this.setState({
              interval: setInterval(this.sessionCountdown, 100)
            })
        }
        break;

      case "reset":
        clearInterval(this.state.interval);
        this.handleReset();
        break;

      default:
        console.log("error");
        break;
    }

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

  sessionCountdown() {
    let timerMinutes = this.state.timerMinutes;
    let timerSeconds = this.state.timerSeconds;
    let sessionBreakText = this.state.sessionBreakText;
    let sessionLength = this.state.sessionLength;
    let breakLength = this.state.breakLength;
    
    let distance = timerMinutes*60 + timerSeconds - 1;

    timerMinutes = Math.floor(distance / 60);
    timerSeconds = Math.floor(distance % 60);
  
    const timerDisplay = 
      (timerMinutes===0 ? "00" : (timerMinutes<10 ? "0"+ timerMinutes :timerMinutes)) + 
      ":" + 
      (timerMinutes===0 && timerSeconds===0 ? "00" :(timerSeconds<10 ? "0"+ timerSeconds :timerSeconds));
  
    if (distance === 0) {
      if (sessionBreakText === "Session") {
        sessionBreakText = "Break";
        timerMinutes = breakLength;
        timerSeconds = 59;
        document.getElementById("sessionBreakText").style.color = "#dc3545"; 
      } else {
        sessionBreakText = "Session";
        timerMinutes = sessionLength;
        timerSeconds = 59;
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


  handleReset(){
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
            <div><h1 id="time-left">{this.state.timerDisplay}</h1></div>
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
      </div>
    )
  }
}

export default PomodoroClock;