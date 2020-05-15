import React from 'react'
import "./Calculator.css";

const numberKeys = ['0','1','2','3','4','5','6','7','8','9'];
const operatorKeys = ['+','-','*','/'];

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentNumber: '0',
      formula: '',
      result: 0,
      preIsOperator: false,
      preIsDecimal: false,
      operatorTimes: 0
    }
    this.handleClick = this.handleClick.bind(this);
    this.setAllState = this.setAllState.bind(this);
  }

  componentDidMount() {
    const buttons = document.getElementsByTagName("button");
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener("click", this.handleClick);
    }
  }

  handleClick(event) {
    const keyValue = event.target.innerText;
    let currentNumber = this.state.currentNumber;
    let formula = this.state.formula;

    switch(true){
      case numberKeys.includes(keyValue):
        if(this.state.currentNumber!=="0"){
          // setAllState(currentNumber, formula, result, preIsOperator, preIsDecimal, operatorTimes)
          this.setAllState(
            currentNumber + keyValue, 
            formula + keyValue, 
            "", 
            false, 
            "", 
            "");

        }else{
          // setAllState(currentNumber, formula, result, preIsOperator, preIsDecimal, operatorTimes)
          this.setAllState(
            keyValue,
            keyValue, 
            "",
            "", 
            "", 
            "");
        }
        break;

      case operatorKeys.includes(keyValue) :
        if(!(this.state.preIsOperator)){
          // setAllState(currentNumber, formula, result, preIsOperator, preIsDecimal, operatorTimes)
          this.setAllState(
            currentNumber + keyValue, 
            formula + keyValue, 
            "", 
            true, 
            false, 
            this.state.operatorTimes +1);
        }else{
          if (keyValue === "-") {

            // setAllState(currentNumber, formula, result, preIsOperator, preIsDecimal, operatorTimes)
            this.setAllState(
              currentNumber + keyValue, 
              formula + keyValue, 
              "",
              true, 
              false, 
              this.state.operatorTimes +1);
          } else {
            const editedNumber = currentNumber.slice(0,currentNumber.length-this.state.operatorTimes);

            // setAllState(currentNumber, formula, result, preIsOperator, preIsDecimal, operatorTimes)
            this.setAllState(
              editedNumber + keyValue, 
              editedNumber + keyValue, 
              "",
              "", 
              "", 
              "");
          }
        }
        break;

      case keyValue === "AC":
        // setAllState(currentNumber, formula, result, preIsOperator, preIsDecimal, operatorTimes)
        this.setAllState(
          "0", 
          " ", 
          "",
          false, 
          false, 
          0);
        break;

      case keyValue === "=":
        // setAllState(currentNumber, formula, result, preIsOperator, preIsDecimal, operatorTimes)
        this.setAllState(
          eval(currentNumber), 
          "", 
          eval(formula),
          false, 
          true, 
          0);

        document.getElementById("formula").innerText = formula + "=" + eval(formula);
        break;

      case keyValue === ".":
        if(!this.state.preIsDecimal){
          // setAllState(currentNumber, formula, result, preIsOperator, preIsDecimal, operatorTimes)
          this.setAllState(
            currentNumber + ".", 
            formula + ".", 
            "",
            "", 
            true, 
            "");
        }
        break;

      default:
        console.log("error");
        break;
    }
  }

  setAllState(currentNumber, formula, result, preIsOperator, preIsDecimal, operatorTimes){
    currentNumber = (currentNumber !== "") ? currentNumber : this.state.currentNumber;
    formula = (formula !== "") ? formula : this.state.formula;
    result = (result !== "") ? result : this.state.result;
    preIsOperator = (preIsOperator !== "") ? preIsOperator : this.state.preIsOperator;
    preIsDecimal = (preIsDecimal !== "") ? preIsDecimal : this.state.preIsDecimal;
    operatorTimes = (operatorTimes !== "") ? operatorTimes : this.state.operatorTimes;

    this.setState({currentNumber});
    this.setState({formula});
    this.setState({result});
    this.setState({preIsOperator});
    this.setState({preIsDecimal});
    this.setState({operatorTimes});
  }

  render() {
    return (
      <div className="container p-5 m-5">
        <h4 className="text-center">JavaScript Calculator - Wendy</h4>
        <div className="calculatorDiv mx-auto p-4">
          <div className="displayDiv">
            <div className="formulaDiv" id="formula">{this.state.formula}</div>
            <div className="resultDiv" id="display">{this.state.currentNumber}</div>
          </div>
          <div className="mt-3">
            <button className="btn btn-info" id="clear">AC</button>
            <button className="btn btn-dark" id="divide">/</button>
            <button className="btn btn-dark buttonRight" id="multiply">*</button>
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