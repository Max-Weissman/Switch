import React, { Component } from "react";

class Filter extends Component {
  constructor() {
    super();
    this.state = {
      input: ""
    };
  }

  render() {
    console.log(this.state.input)
    return (
      <div>
        <input
          type="text"
          value={this.state.input}
          onChange={evt => this.setState({ input: evt.target.value })}
        />
      </div>
    );
  }
}

export default Filter