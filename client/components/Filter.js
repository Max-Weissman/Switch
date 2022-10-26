import React, { useState } from "react";

const Filter = () => {
  const [input, setInput] = useState("")

    return (
      <div>
        <input
          className="search"
          type="text"
          value={input}
          onChange={evt => setInput(evt.target.value)}
        />
      </div>
    );
}

export default Filter