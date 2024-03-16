import React, { useRef, useState } from "react";
// @ts-ignore
import globalCSS from "bundle-text:./global.css";
import { useDraggable, useResizeable } from "./hooks";

function App({ defaultGhost }) {
  const overlayRef = useRef();
  const [overlayVisible, setOverlayVisible] = useState(true);

  const handleDrag = useDraggable(overlayRef);
  const handleResize = useResizeable(overlayRef);

  const [ghost, setGhost] = useState(defaultGhost);

  const [context, setContext] = useState([]);
  const [response, setResponse] = useState(
    "awawawawawawawawawawawawawawawawawawawawawawawawawawawawawawawawawawawawawawawawawawawawawawawaw"
  );

  const handleInput = async (prompt: string) => {
    console.log(prompt);

    try {
      chrome.runtime.sendMessage(
        { action: "msg", prompt: prompt, context: context },
        function (response) {
          if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError.message);
          } else {
            console.log(response);
            setResponse(response);
          }
        }
      );
    } catch (error) {
      console.error(error.message);
    }

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
        className="absolute flex flex-col w-96 h-96 bg-neutral-100  text-gray-800 shadow-lg rounded-lg"
      >
        {/* Drag handle */}
        <div
          className="flex justify-end items-center h-9 w-full bg-neutral-300 shrink-0 cursor-grab rounded-t-lg"
          onMouseDown={handleDrag}
        >
          <button className="flex cursor-pointer justify-center items-center group size-fit mr-2">
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
          Some speech here
        </div>
        <img
          src={defaultGhost}
          alt="Mascot"
          className="min-w-24 w-56 absolute -bottom-0 -right-52 transform"
        />

        {/* Resizer */}
        <div
          className="bottom-0 right-0 cursor-nwse-resize rounded-br-2xl w-3 h-3 absolute bg-gray-600 opacity-40"
          onMouseDown={handleResize}
        ></div>
      </div>
    </>
  );
}

export default App;
