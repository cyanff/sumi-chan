import React, { useEffect, useRef, useState } from "react";
import { Rnd } from "react-rnd";

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
    className="relative bg-neutral-100 text-gray-800 shadow-lg rounded-md"
  >
    {/* Speech */}
    <div className="h-full scroll-primary w-full break-words overflow-y-auto p-4">
      <p>{children}</p>
    </div>

    <img
      src={"/mascot.png"}
      alt="mascot"
      className="min-w-24 w-56 absolute -bottom-0 -right-52"
    />

    <div></div>
  </Rnd>
);

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
      <div className=" flex min-h-fit w-full shrink-0 space-x-2 rounded-3xl bg-[hsl(0,0,93)] shadow-md px-4 py-3">
        {/* Textarea wrapper */}
        <textarea
          onInput={(e) => setUserInput(e.currentTarget.value)}
          ref={textAreaRef}
          maxLength={1024}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
            }
          }}
          value={userInput}
          placeholder={`Ask any question!`}
          className="scroll-primary h-6 max-h-36 w-full resize-none overflow-y-auto bg-inherit px-2 font-[430] leading-6 focus:outline-none"
        />
        {/* Send button */}
        <button className="h-7 w-7 fill-neutral-400  transition duration-150 ease-out hover:fill-neutral-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
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
    "aawawawawawawawawaawawawawawawawawaawawawawawawawawaawawawawawawawawaawawawawawawawawaawawawawawawawawaawawawawawawawawaawawawawawawawawaawawawawawawawawaawawawawawawawawaawawawawawawawawaawawawawawawawawaawawawawawawawawaawawawawawawawawaawawawawawawawawaawawawawawawawawaawawawawawawawawaawawawawawawawawaawawawawawawawawaawawawawawawawawaawawawawawawawawaawawawawawawawawaawawawawawawawawaawawawawawawawawaawawawawawawawawaawawawawawawawawaawawawawawawawawaawawawawawawawawaawawawawawawawawaawawawawawawawawaawawawawawawawawaawawawawawawawawaawawawawawawawawaawawawawawawawawaawawawawawawawawaawawawawawawawawaawawawawawawawawaawawawawawawawawaawawawawawawawawaawawawawawawawawaawawawawawawawawaawawawawawawawawaawawawawawawawawaawawawawawawawawaawawawawawawawawaawawawawawawawawaawawawawawawawawaawawawawawawawawaawawawawawawawawaawawawawawawawawaawawawawawawawawaawawawawawawawawaawawawawawawawawaawawawawawawawawaawawawawawawawawaawawawawawawawawaawawawawawawawawaawawawawawawawawaawawawawawawawawaawawawawawawawawaawawawawawawawawaawawawawawawawawaawawawawawawawawawawawawawawawawaawawawawawawawawaawawawawawawawawaawawawawawawawawaawawawawawawawawaawawawawawawawawaawawawawawawawawaawawawawawawawawaawawawawawawawawa"
  );

  return (
    <div className="app bg-gray-100 h-screen w-screen flex justify-center items-center">
      <SpeechBox>{speech}</SpeechBox>
      <ChatBar />
    </div>
  );
};

export default App;
