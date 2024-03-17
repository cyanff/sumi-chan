import React, { useEffect, useRef, useState } from "react";
// @ts-ignore
import globalCSS from "bundle-text:./global.css";
import { useDraggable, useResizeable } from "./hooks";
import { Readability } from "@mozilla/readability";

function App() {
  const [overlayVisible, setOverlayVisible] = useState(true);

  const overlayRef = useRef();
  const overlayDrag = useDraggable(overlayRef);
  const overlayResize = useResizeable(overlayRef);

  const chatBarRef = useRef();
  const chatBarDrag = useDraggable(chatBarRef);
  const chatBarResize = useResizeable(chatBarRef);

  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [userInput, setUserInput] = useState("");

  const [imgLoading, setImgLoading] = useState(false);

  useEffect(() => {
    chrome.runtime.onMessage.addListener((message, _sender, _sendResponse) => {
      if (message.action === "show") {
        setOverlayVisible(true);
      }
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

  useEffect(() => {
    (async () => {
      let doc = document.cloneNode(true) as Document;
      let parsed = new Readability(doc).parse();

      const res = await chrome.runtime.sendMessage({
        action: "summarize",
        text: parsed.textContent,
      });

      fadeInResponse(res.message);
      fadeInEmotion(res.emotion);

      setContext((prevMessages) => [
        ...prevMessages,
        { role: "user", content: parsed.textContent },
        { role: "assistant", content: res.message },
      ]);
    })();
  }, []);

  function fadeInResponse(response: string) {
    // split the response into words
    const words = response.split(" ");
    setResponse("");

    for (let i = 0; i < words.length; i++) {
      setTimeout(() => {
        setResponse((prev) => prev + " " + words[i]);
      }, 30 * i);
    }
  }

  function fadeInEmotion(rawEmotionText: string) {
    const emotions = [
      "happy",
      "sad",
      "pout",
      "curious",
      "panic",
      "disgust",
      "neutral",
    ];

    let emotion = rawEmotionText.toLowerCase().trim();
    if (!emotions.includes(emotion)) {
      emotion = "neutral";
    }

    setEmotion(emotion);
    setImgLoading(true);
    setTimeout(() => {
      setImgLoading(false);
    }, 200);
  }

  const [context, setContext] = useState([]);
  const [response, setResponse] = useState(
    "...sumi-chan using all her brain cells to summarize for you!"
  );
  const [emotion, setEmotion] = useState("neutral");
  const emotionImages = {
    happy: chrome.runtime.getURL("sumi_happy.png"),
    sad: chrome.runtime.getURL("sumi_sad.png"),
    pout: chrome.runtime.getURL("sumi_pout.png"),
    curious: chrome.runtime.getURL("sumi_curious.png"),
    panic: chrome.runtime.getURL("sumi_panic.png"),
    disgust: chrome.runtime.getURL("sumi_disgust.png"),
    neutral: chrome.runtime.getURL("sumi_neutral.png"),
  };

  async function sendMessage() {
    const prompt = userInput;
    if (!prompt) return;

    setUserInput("");
    console.log(prompt);

    setResponse("the electrons in sumi-chan's brain are working hard!");
    const res = await chrome.runtime.sendMessage({
      action: "msg",
      prompt: prompt,
      context: context,
    });

    fadeInResponse(res.message);
    fadeInEmotion(res.emotion);

    setContext((prevMessages) => [
      ...prevMessages,
      { role: "user", content: prompt },
      { role: "assistant", content: res.message },
    ]);
  }

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
        <div className="flex justify-end items-center h-8 w-full bg-gradient-light-blue shrink-0 rounded-t-2xl">
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
        <div className="grow break-words overflow-y-auto py-1 px-3 text-base">
          {response}
        </div>
        <img
          src={emotionImages[emotion]}
          alt="Mascot"
          className={`min-w-24 w-56 absolute -bottom-0 -right-52 transition duration-300 ease-out ${
            imgLoading ? "opacity-0" : "opacity-100"
          }`}
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
        <div className="rounded-br-2xl rounded-tl-sm bottom-0 right-0 pointer-events-none w-3 h-3 absolute bg-gray-600 opacity-40"></div>
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
                sendMessage();
              }
            }}
            value={userInput}
            placeholder={`Ask any question!`}
            onMouseDown={(e) => e.stopPropagation()}
            className="scroll-primary h-6 max-h-36 w-full resize-none overflow-y-auto bg-inherit px-2 text-base leading-6 focus:outline-none cursor-text text-black"
          />
          {/* Send button */}
          <button
            className="h-7 w-7 ml-1.5 fill-neutral-300  transition duration-150 ease-out hover:fill-neutral-400"
            onClick={sendMessage}
          >
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
