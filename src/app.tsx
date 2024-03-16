import React, { useEffect, useRef, useState } from "react";
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
const InputField = ({
  onSubmit,
}: {
  onSubmit: (inputText: string) => void;
}) => {
  const [input, setInput] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
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

const ChatBar = () => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [userInput, setUserInput] = useState("");

  useEffect(() => {
    const textarea = textAreaRef.current;
    if (textarea == null) {
      return;
    }
    textarea.style.height = "24px";
    textarea.style.height = textarea.scrollHeight + "px";
  }, [userInput]);

  return (
    <Rnd
      default={{
        x: 0,
        y: 0,
        width: 500,
        height: 120,
      }}
      minWidth={300}
      minHeight={100}
      bounds="window"
      className=""
    >
      <div className=" flex min-h-fit w-full shrink-0 space-x-2 overflow-auto rounded-3xl bg-neutral-600 px-4 py-3">
        {/* Textarea wrapper */}
        <textarea
          onInput={(e) => setUserInput(e.currentTarget.value)}
          ref={textAreaRef}
          maxLength={1024}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              // Do something here

              // Prevent inserting a new line on pressing enter
              e.preventDefault();
            }
          }}
          value={userInput}
          placeholder={`Message @Saku`}
          className="scroll-secondary h-6 max-h-64 w-full resize-none overflow-y-auto bg-inherit px-2 font-[430] leading-6 focus:outline-none"
        />
        {/* Send button */}
        <button className="h-7 w-7 fill-neutral-400  transition duration-150 ease-out hover:fill-neutral-200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
          </svg>
        </button>
      </div>
    </Rnd>
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
      <ChatBar />
    </div>
  );
};

export default App;
