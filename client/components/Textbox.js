import React, { useState } from "react";

const TextBox = () => {
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

export default TextBox