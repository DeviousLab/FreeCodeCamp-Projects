const numberpad = [
  { value: 7, type: "number", id: "seven" },
  { value: 8, type: "number", id: "eight" },
  { value: 9, type: "number", id: "nine" },
  { value: "/", type: "action", id: "divide" },
  { value: 4, type: "number", id: "four" },
  { value: 5, type: "number", id: "five" },
  { value: 6, type: "number", id: "six" },
  { value: "*", type: "action", id: "multiply" },
  { value: 1, type: "number", id: "one" },
  { value: 2, type: "number", id: "two" },
  { value: 3, type: "number", id: "three" },
  { value: "-", type: "action", id: "subtract" },
  { value: 0, type: "number", id: "zero" },
  { value: ".", type: "decimal", id: "decimal" },
  { value: "=", type: "equals", id: "equals" },
  { value: "+", type: "action", id: "add" },
];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: false,
      display: [],
      decimal: false,

    };
    this.handleChange = this.handleChange.bind(this);
    this.displayInput = this.displayInput.bind(this);
    this.clearScreen = this.clearScreen.bind(this);
    this.doMath = this.doMath.bind(this);
    this.checkOperator = this.checkOperator.bind(this);
  }

  handleChange(value, type) {

    if (type === "action") {
      if (this.state.result === true) {
        this.setState({
          display: [this.state.display],
          result: false,
        });
      }
      this.checkOperator(value);
      this.setState({ decimal: false });
    }

    if (type === "number") {
      if (this.state.display[0] === 0) {
        console.log("Numbers cannot be zero");
        this.setState({ display: [] });
      } else {
        this.displayInput(value);
      }
    }

    if (type === "decimal") {
      if (this.state.decimal === false) {
        this.displayInput(value);
        this.setState({ decimal: true });
      } else {
        console.log("You already entered a decimal");
      }
    }

    if (type === "equals") {
      this.doMath();
      console.log(this.state.display);
    }
  }

  checkOperator(value) {
    this.displayInput(value);

    const w = this.state.display[this.state.display.length - 1];
    const x = this.state.display[this.state.display.length - 2];
    const y = this.state.display.length - 1;
    const z = this.state.display.length - 2;

    if (
      (value === "+" || value === "*" || value === "/") &&
      (w === "+" || w === "*" || w === "/")
    ) {
      this.setState((prevState) => ({
        display: prevState.display.slice(0, y).concat(value),
      }));
    } else if (
      (value === "+" || value === "*" || value === "/") &&
      (x === "+" || x === "*" || x === "/" || x === "-") &&
      typeof w !== "number"
    ) {
      this.setState((prevState) => ({
        display: prevState.display.slice(0, z).concat(value),
      }));
    }
  }

  doMath() {
    let displayResult;
    let answer = eval(this.state.display.join(""));

    if (answer === false) {
      displayResult = 0;
    } else if (answer % 1 !== 0) {
      displayResult = parseFloat(answer.toFixed(4));
    } else {
      displayResult = answer;
    }
    this.setState({
      display: displayResult,
      decimal: false,
      result: true,
    });
  }

  displayInput(value) {
    this.setState((prevState) => ({
      display: [...prevState.display, value],
    }));
  }

  clearScreen() {
    this.setState({ result: false, display: [], decimal: false });
  }

  render() {
    return (
      <>
        <div className="container">
          <div className="row">
            <div className="col text-center">
              <h1 className="display-5 fw-bold">Javascript Calculator</h1>
            </div>
          </div>
          <div className="row justify-content-center mt-5">
            <div
              className="col-sm-9 col-md-7 col-lg-5 col-xl-4 text-center"
              id="display"
            >
              <h3 className="display-4 bg-light border rounded align">
                {this.state.display.length === 0 ? 0 : this.state.display}
              </h3>
            </div>
          </div>
          <div className="row justify-content-center mb-5">
            <div className="col-sm-9 col-md-7 col-lg-5 col-xl-4">
              <div
                id="clear"
                className="clear-display btn btn-outline-dark bg-info col-12 p-4"
                onClick={this.clearScreen}
              >
                AC
              </div>
              <KeyPad onClick={this.handleChange} />
            </div>
          </div>
        </div>
      </>
    );
  }
}

class KeyPad extends React.Component {
  render() {
    return (
      <>
        {numberpad.map((item, index) => (
          <div
            className="btn btn-outline-dark col-sm-3 p-3"
            key={index}
            id={item.id}
            onClick={() => this.props.onClick(item.value, item.type)}
          >
            {item.value}
          </div>
        ))}
      </>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));