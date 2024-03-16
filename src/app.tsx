import React, { useState } from "react";
import { Rnd } from "react-rnd";
import { getStream } from "./response";

const SpeechBox = ({ children }: { children: React.ReactNode }) => (
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
    className="relative bg-white text-gray-800 p-4 shadow-lg rounded-md"
  >
    {/* Speech */}
    <div className="h-full w-full break-words overflow-y-auto">{children}</div>

    <img
      src={"/mascot.png"}
      alt="Description of image"
      className="min-w-24 w-56 absolute -bottom-0 -right-52 transform pointer-events-none"
    />
  </Rnd>
);

const InputBox = ({ children }: { children: React.ReactNode }) => (
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
const InputField = ({
  onSubmit,
}: {
  onSubmit: (inputText: string) => void;
}) => {
  const [input, setInput] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
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

  const handleInputSubmit = async (inputText: string) => {
    console.log(inputText);
    try {
      setSpeech("");  
      await getStream(inputText, (text) => {
        setSpeech(speech + text);
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="app bg-gray-100 h-screen w-screen flex justify-center items-center">
      <SpeechBox>{speech}</SpeechBox>
      <InputBox>
        <InputField onSubmit={handleInputSubmit} />
      </InputBox>
    </div>
  );
};

export default App;
