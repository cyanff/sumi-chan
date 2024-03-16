import React, { useState } from "react";
import { Rnd } from "react-rnd";
import "./output.css";

// AnimeGirlImage Component
const AnimeGirlImage = () => (
  <div>
    <img
      src={"/mascot.png"}
      alt="Description of image"
      style={{ width: "200px", height: "230px" }}
    />
  </div>
);

// SpeechBox Component
const SpeechBox = ({ children }) => (
  <Rnd
    default={{
      x: 0,
      y: 0,
      width: 400,
      height: 200,
    }}
    minWidth={10}
    minHeight={10}
    bounds="window"
    className="speech-box bg-white text-gray-800 p-4 shadow-lg rounded-md"
  >
    <div className="flex flex-row justify-end items-center">
      <div
        className="w-full"
        style={{ wordWrap: "break-word", overflowWrap: "break-word" }}
      >
        {children}
      </div>
      <div style={{ width: "200px", height: "230px", flexShrink: "0" }}>
        <AnimeGirlImage />
      </div>
    </div>
  </Rnd>
);

const InputBox = ({ children }) => (
  <Rnd
    default={{
      x: 0,
      y: 0,
      width: 400,
      height: 50,
    }}
    minWidth={200}
    minHeight={50}
    bounds="window"
    className="input-box bg-white text-gray-800 p-4 shadow-lg rounded-md"
  >
    {children}
  </Rnd>
);

// InputField Component
const InputField = ({ onSubmit }) => {
  const [input, setInput] = useState("");

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      onSubmit(input);
      setInput("");
    }
  };

  return (
    <div className="input-field h-full flex items-center shadow-lg rounded-md">
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        className="w-full w-hull flex-grow border-none outline-none"
        placeholder="Type your prompt..."
      />
    </div>
  );
};

// Main App Component
const App = () => {
  const [speech, setSpeech] = useState(
    "awawawawawawawawaawawawawawawawawaawawawawawawawawaawawawawawawawawaawawawawawawawawaawawawawawawawawaawawawawawawawawaawawawawawawawawaawawawawawawawawa"
  );

  const handleInputSubmit = (inputText) => {
    console.log(inputText); // Here you can integrate with your AI backend
    setSpeech("Processing your request..."); // Placeholder response
  };

  return (
    <div className="app bg-gray-100 min-h-screen flex justify-center items-center">
      <SpeechBox>{speech}</SpeechBox>
      <InputBox>
        <InputField onSubmit={handleInputSubmit} />
      </InputBox>
    </div>
  );
};

export default App;
