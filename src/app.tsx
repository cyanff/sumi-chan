import React, { useEffect, useRef, useState } from "react";
// @ts-ignore
import globalCSS from "bundle-text:./global.css";
import { useDraggable, useResizeable } from "./hooks";

function App() {
  const [overlayVisible, setOverlayVisible] = useState(true);

  const apiKeyRef = useRef("");

  const overlayRef = useRef();
  const overlayDrag = useDraggable(overlayRef);
  const overlayResize = useResizeable(overlayRef);

  const chatBarRef = useRef();
  const chatBarDrag = useDraggable(chatBarRef);
  const chatBarResize = useResizeable(chatBarRef);

  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [userInput, setUserInput] = useState("");

  useEffect(() => {
    chrome.runtime.onMessage.addListener((message, _sender, _sendResponse) => {
      if (message.action === "show") {
        setOverlayVisible(true);
      }
    });

    chrome.storage.sync.get("apiKey", (data) => {
      apiKeyRef.current = data.apiKey;
    });
  }, []);

  // Dynamic text area scaling
  useEffect(() => {
    const textarea = textAreaRef.current;
    if (textarea == null) {
      return;
    }
    textarea.style.height = "24px";
    textarea.style.height = textarea.scrollHeight + "px";
  }, [userInput]);

  const [context, setContext] = useState([]);
  const [response, setResponse] = useState(
    "awawawawawawawawawawawawawawawawawawawawawawawawawawawawawawawawawawawawawawawawawawawawawawawaw"
  );
  const [emotion, setEmotion] = useState("neutral");
  const emotionImages = {
    happy: chrome.runtime.getURL("ghost_happy.png"),
    sad: chrome.runtime.getURL("ghost_sad.png"),
    pout: chrome.runtime.getURL("ghost_pout.png"),
    curious: chrome.runtime.getURL("ghost_curious.png"),
    panic: chrome.runtime.getURL("ghost_panic.png"),
    cry: chrome.runtime.getURL("ghost_cry.png"),
    neutral: chrome.runtime.getURL("ghost_neutral.png"),
  };

  const handleInput = async (prompt: string) => {
    console.log(prompt);

    try {
      chrome.runtime.sendMessage(
        { action: "msg", prompt: prompt, context: context },
        function (reply) {
          if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError.message);
          } else {
            setResponse(reply.reply);
            setEmotion(reply.emotion);
          }
        }
      );
    } catch (error) {
      console.error(error.message);
    }
    console.log(response);
    setContext((prevMessages) => [
      ...prevMessages,
      { role: "user", content: prompt },
      { role: "assistant", content: response },
    ]);
  };

  return (
    <>
      <style>{globalCSS}</style>
      <div
        ref={overlayRef}
        onMouseDown={overlayDrag}
        className={`fixed  cursor-grab bottom-10 right-64 z-50 flex flex-col w-96 h-40 bg-neutral-100  text-gray-800 shadow-lg rounded-2xl ${
          overlayVisible ? "block" : "hidden"
        }`}
      >
        {/*Title bar*/}
        <div className="flex justify-end items-center h-8 w-full bg-neutral-300 shrink-0 rounded-t-2xl">
          <button
            onClick={() => setOverlayVisible(false)}
            className="flex cursor-pointer justify-center items-center group size-fit mr-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              stroke-width="3.5"
              className="size-[15px] stroke-neutral-800 mix-blend-normal transition ease-in-out duration-300 group-hover:stroke-neutral-700"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Speech */}
        <div className="grow break-words overflow-y-auto py-1 px-3">
          {response}
        </div>
        <img
          src={emotionImages[emotion]}
          alt="Mascot"
          className="min-w-24 w-56 absolute -bottom-0 -right-52 transform"
        />

        {/* Resizer Hitbox*/}
        <div
          className="-bottom-1.5 -right-1.5 cursor-nwse-resize rounded-br-2xl w-6 h-6 absolute"
          onMouseDown={(e) => {
            overlayResize(e);
            e.stopPropagation();
          }}
        ></div>

        {/* Resizer Display*/}
        <div className="rounded-br-2xl bottom-0 right-0 pointer-events-none w-3 h-3 rounded-xl absolute bg-gray-600 opacity-40"></div>
      </div>

      {/* Chat Bar */}
      <div
        ref={chatBarRef}
        onMouseDown={chatBarDrag}
        className="min-h-36 min-w-64 h-36 w-96 fixed -bottom-10 right-1/2 z-50"
      >
        <div className="relative flex min-h-fit w-full shrink-0 space-x-2 rounded-2xl bg-[hsl(0,0,93)] shadow-md px-4 py-3 cursor-grab overflow-hidden">
          <textarea
            onInput={(e) => setUserInput(e.currentTarget.value)}
            ref={textAreaRef}
            maxLength={1024}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleInput(userInput);
                setUserInput("");
              }
            }}
            value={userInput}
            placeholder={`Ask any question!`}
            onMouseDown={(e) => e.stopPropagation()}
            className="scroll-primary h-6 max-h-36 w-full resize-none overflow-y-auto bg-inherit px-2 font-[430] leading-6 focus:outline-none cursor-text text-black"
          />
          {/* Send button */}
          <button className="h-7 w-7 ml-1.5 fill-neutral-400  transition duration-150 ease-out hover:fill-neutral-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-6 h-6"
            >
              <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
            </svg>
          </button>

          {/* Resizer */}
          <div
            className="bottom-0 right-0 cursor-ew-resize rounded-xl w-2 h-full absolute bg-gray-400 opacity-40"
            onMouseDown={(e) => {
              chatBarResize(e);
              e.stopPropagation();
            }}
          ></div>
        </div>
      </div>
    </>
  );
}

export default App;
