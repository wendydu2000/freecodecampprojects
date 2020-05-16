import React from 'react';
import "./PomodoroClock.css";

class PomodoroClock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      breakTime: 5,
      sessionTime: 25

    };
  }

  render() {
    return (
      <div className="container containerDiv mt-5 p-3">
        <div className="container text-center clockDiv float-right">
          <h4 className="mt-3">Pomodorm Clock</h4>
          <div className="container timeBlock bg-light text-primary text-center p-1">
            <div><h5 className="mt-2" id="timer-label">Session</h5></div>
            <div><h1 id="time-left">25</h1></div>
          </div>
          <div className="container mt-4 mb-4">
            <div className="row">
              <div className="col-6">
                <h6 className="lengthText" id="break-label">Break Length</h6>
                <div className="row d-flex sBtnDiv justify-content-md-center">
                  <button className="btn btn-warning deButton" id="break-decrement">-</button>
                  <p className="text-warning textLength" id="break-length">5</p>
                  <button className="btn btn-warning deButton" id="break-increment">+</button>
                </div>
              </div>
              <div className="col-6">
                <h6 className="lengthText" id="session-label">Session Length</h6>
                <div className="row d-flex sBtnDiv justify-content-md-center">
                  <button className="btn btn-primary deButton" id="session-decrement">-</button>
                  <p className="text-info textLength" id="session-length">25</p>
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
              <button className="btn bigButton" id="start_stop">Start</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default PomodoroClock;