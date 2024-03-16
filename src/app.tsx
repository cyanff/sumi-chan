import * as React from "react";
// @ts-ignore
import globalCSS from "bundle-text:./global.css";

function App() {
  return (
    <>
      <style>{globalCSS}</style>
      <div className="bg-red-500 w-64 h-64">
        TESTING TESTING TESTING TESTING TESTING TESTING TESTING TESTING TESTING
        TESTING TESTING TESTING TESTING TESTING TESTING TESTING TESTING TESTING
      </div>
    </>
  );
}

export default App;
