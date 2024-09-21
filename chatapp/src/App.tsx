import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import Card from "./Components/Card";
import Logo from "./assets/Vector.png";
import Insert from "./assets/Insert.png";
import Refresh from "./assets/Refresh.png";
import Button from "./assets/Button.png";

type Conversation = {
  data: string;
  who: string;
};

const App: React.FC = () => {
  const ref = useRef<HTMLTextAreaElement>(null);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isIconHovered, setIsIconHovered] = useState<boolean>(false);
  const [conversation, setConversation] = useState<Conversation[]>([]);
  const [responseStatus, setResponseStatus] = useState<boolean>(false);
  const [textareaValue, setTextareaValue] = useState<string>("");
  const [value, setValue] = useState<string>("");
  const replyMessage: string =
    "Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask.";
  const shouldShowIcon = isFocused || isIconHovered;

  useEffect(() => {
    ref?.current?.focus();
  }, []);

  const getReply = () => {
    let reply: Conversation = {
      data: replyMessage,
      who: "bot",
    };
    setConversation((prev) => [...prev, reply]);
  };

  const handleConversation = (data: string, who: string) => {
    if (value?.length > 0) {
      const newEntry: Conversation = { data, who };
      setConversation((prev) => [...prev, newEntry]);
      getReply();
      setValue("");
      setResponseStatus(true);
    }
  };

  const handleInsert = () => {
    if (
      conversation[conversation?.length - 1]?.who === "bot" &&
      conversation[conversation?.length - 1]?.data !== ""
    ) {
      setTextareaValue(conversation[conversation?.length - 1]?.data);
      setShowModal(false);
      setConversation([]);
    }
  };

  const handleConversationUi = (ele: Conversation, i: number) => {
    if (ele.who === "User")
      return (
        <div key={i} className="justify-end flex align-middle w-full">
          <div className="flex justify-end w-fit text-left max-w-xl bg-[#DFE1E7] p-2 rounded-md px-5 my-2">
            {ele.data}
          </div>
        </div>
      );
    else if (ele.who === "bot")
      return (
        <div key={i} className="justify-start flex w-full">
          <div className="flex justify-start w-2/3 text-left bg-[#DBEAFE] p-2 rounded-md px-5">
            {ele.data}
          </div>
        </div>
      );

    return null;
  };

  return (
    <div className="App">
      <Card className="border-2 h-full min-h-32 w-3/4 flex justify-center items-end m-auto pb-2">
        <div className="relative w-full p-4">
          <textarea
            ref={ref}
            placeholder="Write a message..."
            rows={5}
            value={textareaValue}
            onChange={(e) => setTextareaValue(e.target.value)}
            cols={10}
            className="font-mono resize-none bg-gray-100 outline-none w-full p-4 pr-10 border rounded-2xl"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          <i
            onMouseEnter={() => setIsIconHovered(true)}
            onMouseLeave={() => setIsIconHovered(false)}
            onClick={() => {
              setShowModal(true);
            }}
            className={`cursor-pointer absolute bottom-10 right-12 text-xl text-gray-500 transition-opacity duration-300 ${
              shouldShowIcon ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <div className="w-10 h-10 rounded-full bg-white border">
              <img
                className="align-middle items-center justify-center m-auto flex w-auto p-3"
                src={Logo}
                alt="logo"
              />
            </div>
          </i>
        </div>
      </Card>

      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 "
          onClick={() => setShowModal(false)}
        >
          <div
            className="relative bg-white p-6 rounded-lg shadow-lg w-full mx-auto max-w-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="max-h-[50vh] overflow-auto">
              {conversation?.length > 0 &&
                conversation.map((ele: Conversation, i) => {
                  return handleConversationUi(ele, i);
                })}
            </div>

            <h2 className="text-xl font-semibold">
              <div>
                <input
                  className="text-base outline-none border-2 py-2 px-4 min-w-full rounded-md my-2"
                  type="text"
                  placeholder="Your prompt"
                  value={value}
                  onChange={(e) => {
                    setValue(e.target.value);
                  }}
                />
              </div>
              {!responseStatus ? (
                <div
                  className="flex justify-end w-full"
                  onClick={() => {
                    handleConversation(value, "User");
                  }}
                >
                  <button className="font-sans bg-blue-600 hover:bg-blue-700 rounded-lg text-white px-4 py-2 flex justify-end text-lg align-middle items-center">
                    <img
                      className="w-4 h-4 align-middle justify-center flex items-center m-auto mr-2"
                      src={Button}
                      alt=""
                    />
                    Generate
                  </button>
                </div>
              ) : (
                <div className="flex gap-5 justify-end w-full">
                  <button
                    onClick={() => handleInsert()}
                    className="font-sans rounded-lg text-gray-400 px-4 py-2 flex justify-end text-lg align-middle items-center gap-2 border-2 border-gray-400"
                  >
                    <img src={Insert} alt="" />
                    Insert
                  </button>
                  <button className="font-sans bg-blue-600 hover:bg-blue-700 rounded-lg text-white px-4 py-2 flex justify-end text-lg align-middle items-center gap-2">
                    <img src={Refresh} alt="" />
                    Regenerate
                  </button>
                </div>
              )}
            </h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
