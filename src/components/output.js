import React, { useState } from "react";
import eventEmitter from "../eventEmitter";

const Output = () => {
  const [extractedText, setExtractedText] = useState("");
  
  const jsonToPrettyString = (json) => {
    let outString = ""
    for ( let key in json ) { // loop over each key and prettify it
      let assignment = json[key] 
      outString += (`${key.toUpperCase()}\nName: ${assignment.name}\nDue Date: ${assignment["due date"]}\nPercentage: ${assignment.percentage}\n\n`)
    }
    return outString
  }

  // handlers
  const handleClear = () => {
    setExtractedText("")
    return;
  }

  const handleExtractedText = (text) => {
    console.log("Handling extracted text event")
    var prettyString = jsonToPrettyString(JSON.parse(text))
    setExtractedText(prettyString)
  }

  // event handlers
  eventEmitter.on('textExtracted', handleExtractedText)


  return (
    <div>
        <textarea
        style={{ width: "300px", height: "150px" }}
        value={extractedText}
        placeholder="Your PDF text will appear here..."
        readOnly
      />
      <br />
      <button  type="ClearButton" onClick={handleClear}>Clear</button>
      <form action="/submit" method="POST">
      <label for="userInput">Enter Text:</label>
      <input type="text" id="userInput" name="userInput" />
      <button type="submit">Submit</button>
      </form>
    </div>
  )

}

export default Output