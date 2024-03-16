import React from "react";
// @ts-ignore
import globalCSS from "bundle-text:./global.css";

function App() {
  const [text, setText] = React.useState("Hello, World!");

  async function call() {
    // send a message to the background script
    const res = await chrome.runtime.sendMessage({
      action: "msg",
      content: "Hello Claude! I'm testing you, could you say something witty?",
    });

    setText(res);
    console.log(res);
  }

  return (
    <>
      <style>{globalCSS}</style>
      <div className="h-96 w-96 bg-neutral-200 p-4">{text}</div>
      <button
        className="bg-neutral-900 text-white px-4 py-2 rounded-md"
        onClick={call}
      >
        Test
      </button>
    </>
  );
}

export default App;
