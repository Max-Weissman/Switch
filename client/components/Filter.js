import React, { Component } from "react";

class Filter extends Component {
  constructor() {
    super();
    this.state = {
      input: ""
    };
  }

  render() {
    return (
      <div>
        <input
          className="search"
          type="text"
          value={this.state.input}
          onChange={evt => this.setState({ input: evt.target.value })}
        />
      </div>
    );
  }
}

export default Filter