import React from 'react'
import "./Calculator.css";

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numberKeys: ['0','1','2','3','4','5','6','7','8','9'],
      operatorKeys: ['.','AC','+','-','×','÷','='],
      firstNumberZero: true,
      preIsOperator: false,
      preNumber: '0',
      currentNumber: '0',
      formula: '',
      result: 0,
      display: '0'
    }
    this.handleClear = this.handleClear.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const bns = document.getElementsByTagName("button");
    for (let i = 0; i < bns.length; i++) {
      bns[i].addEventListener("click", this.handleClick);
    }
    
  }

  handleClick(event) {
    const keyValue = event.target.innerText;
    if (this.state.numberKeys.find(element => element === keyValue)) {
      if (this.state.firstNumberZero) {
        if (keyValue === '0')
        {
          this.setState ({
              formula: '',
              firstNumberZero: true
          })
        } else {
          this.setState ({
            currentNumber: keyValue,
            formula: this.state.formula + keyValue,
            firstNumberZero: false,
            display: keyValue
          });
        }
      } else {
        this.setState ({
          currentNumber: this.state.currentNumber + keyValue,
          formula: this.state.formula + keyValue,
          display: this.state.currentNumber + keyValue
        });
      }
      console.log(this.state);
    } else if (this.state.operatorKeys.find(element => element === keyValue)) {
      switch (keyValue) {
        case '+':
          this.setState ({
            preNumber: this.state.currentNumber,
            currentNumber: '',
            formula: this.state.formula + keyValue,
            result: this.state.result + parseInt(this.state.currentNumber),
            display: keyValue
          })
          break;

        case '-':
          this.setState ({
            preNumber: this.state.currentNumber,
            currentNumber: '',
            formula: this.state.formula + keyValue,
            result: this.state.result - parseInt(this.state.currentNumber),
            display: keyValue
          })
          break;

        case '×':
          this.setState ({
            preNumber: this.state.currentNumber,
            currentNumber: '',
            formula: this.state.formula + keyValue,
            result: this.state.result * parseInt(this.state.currentNumber),
            display: keyValue
          })
          break;

        case '÷':
          this.setState ({
            preNumber: this.state.currentNumber,
            currentNumber: '',
            formula: this.state.formula + keyValue,
            result: this.state.result / parseInt(this.state.currentNumber),
            display: keyValue
          })
          break;

        case '=':
          const getResult = this.state.result + parseInt(this.state.currentNumber);
          this.setState ({
            preNumber: this.state.currentNumber,
            currentNumber: '',
            formula: this.state.formula + "=" + getResult,
            result: getResult,
            display: getResult
          })
          break;
      
        default:
          break;
      }
      
    }

  }

  handleClear() {
    this.setState ({
      firstNumberZero: true,
      preNumber: '0',
      currentNumber: '0',
      formula: '',
      result: 0,
      display: '0'
    })
  }

  render() {
    return (
      <div className="container p-5 m-5">
        <h4 className="text-center">JavaScript Calculator - Wendy</h4>
        <div className="calculatorDiv mx-auto p-4">
          <div className="displayDiv">
            <div className="formulaDiv">{this.state.formula}</div>
            <div className="resultDiv" id="display">{this.state.display}</div>
          </div>
          <div className="mt-3">
            <button className="btn btn-info" id="clear" onClick={this.handleClear}>AC</button>
            <button className="btn btn-dark" id="divide">÷</button>
            <button className="btn btn-dark buttonRight" id="multiply">×</button>
          </div>
          <div className="mt-3">
            <button className="btn btn-secondary" id="seven">7</button>
            <button className="btn btn-secondary" id="eight">8</button>
            <button className="btn btn-secondary" id="nine">9</button>
            <button className="btn btn-dark buttonRight" id="subtract">-</button>
          </div>
          <div className="mt-3">
            <button className="btn btn-secondary" id="four">4</button>
            <button className="btn btn-secondary" id="five">5</button>
            <button className="btn btn-secondary" id="six">6</button>
            <button className="btn btn-dark buttonRight" id="add">+</button>
          </div>
          <div className="mt-3 d-flex">
            <div className="col-9">
              <div className="row">
                <button className="btn btn-secondary" id="one">1</button>
                <button className="btn btn-secondary" id="two">2</button>
                <button className="btn btn-secondary buttonRight" id="three">3</button>
              </div>
              <div className="row mt-3">
                <button className="btn btn-secondary btn-0" id="zero">0</button>
                <button className="btn btn-secondary buttonRight" id="decimal">.</button>
              </div>
            </div>
            <div className="col echoDiv">
              <button className="btn btn-danger btn-echo" id="equals">=</button>
            </div>
          </div>
        </div>
      </div>

    )
  }
}

export default Calculator;