import React, { useEffect, useRef, useState } from "react";
import "../App.css";
import "./chat.css";
import {
  MdChatBubble,
  MdCompassCalibration,
  MdOutlineCarCrash,
  MdSend,
} from "react-icons/md";
import ProductList from "./ProductList";
import SuggestionBox from "./SuggestionBox";
import Question from "./Question";
import axios from "axios";
import { query } from "express";
import { colors } from "@mui/material";
import { API_URL } from "../utils/utils";
// interface Message {
//   type: "bot" | "user";
//   text: string;
//   suggestion: []
// }

const Chat: React.FC = () => {
  const [messages, setMessages] = useState([
    {
      type: "bot",
      text: "Hello, I'm 1Click Bot! 👋 I'm your personal fashion assistant.Select the perfect occasion for your outfit! 👗🎉 ",
      suggestion: [
        '💼  Formal',
        '🎉  Party',
        '🪩  Clubbing',
        '🕶️  Casual'
      ],
      questions: [],
      products: []
    },
  ]);

  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [initialProductData, setInitialProductData] = useState({});
  const [uuid, setUuid] = useState("");
  const [preference,setPreference] = useState({});

  const handleSend = async (txt: string) => {
    if (txt.trim() === "") return;

    var userMessage = [
      ...messages,
      {
        type: "user",
        text: txt,
        suggestion: [],
        questions: [],
        products: []
      },
    ];
    // chrome.storage.local.set(
    //   {
    //     ["1"]: userMessage,
    //   },
    //   function () {
    //     console.log("Data saved");
    //   }
    // );

    setMessages(userMessage);
    const requestObj = {
      userid: uuid,
      query: txt,
      color: (preference as any)?.['color'],
      ocassion: (preference as any)?.['ocassion'],
      fitting : (preference as any)?.['fitting'],
      product: initialProductData,
    };
    console.log("reqeustObj", requestObj);
    setInput("");
    try {
      const response = await axios.post(
        `${API_URL}/chatbot`,
        requestObj
      );
      console.log("response",response);
      var botMessage = [
        ...userMessage,
        {
          type: "bot",
          text: response.data["text"],
          suggestion: response.data["suggestion"] ?? [],
          questions: response.data["questions"] ?? [],
          products: response.data["products"] ?? [],
        },
      ];
      setMessages(botMessage);
      chrome.storage.local.set(
        {
          ["1"]: botMessage,
        },
        function () {
          console.log("Bot message added successfully");
        }
      );
      setPreference(response.data["preference"] ?? {});
      chrome.storage.local.set(
        {
          ["preference"]: preference,
        },
        function () {
          console.log("preference added successfully",preference);
        }
      );
    } catch (err) {
      setError("An error occurred while posting data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      const chatContainer = chatContainerRef.current;
      const shouldScroll =
        chatContainer.scrollHeight > chatContainer.clientHeight;
      if (shouldScroll) {
        chatContainer.scrollTo({
          top: chatContainer.scrollHeight,
          behavior: "smooth", // Smooth scroll to the bottom
        });
      }
    }
  }, [messages]);

  useEffect(() => {
    chrome.storage.local.get(["uuid"], function (result) {
      if (result["uuid"]) setUuid(result["uuid"]);
    });

    chrome.storage.local.get(["product"], function (result) {
      if (result["product"]) setInitialProductData(result["product"]);
    });
      chrome.storage.local.get(["preference"], function (result) {
        console.log("Preference", preference);
        if (result["preference"]) setPreference(result["preference"]);
      });
    chrome.storage.local.get(["1"], function (result) {
      if (result[1]) {
        setMessages(result["1"]);
      }
    });
  }, []);
  return (
    <div className="chat-container">
      <div
        style={{ display: "flex", flexDirection: "column", height: "28rem" }}
      >
        <div
          className="chat-messages"
          style={{ flex: "1", overflowY: "auto" }}
          ref={chatContainerRef}
        >
          {messages.map((msg, index) => (
            <div>
              <div className={`${msg.type}-messages`}>
                <div key={index} className={`message ${msg.type}-message`}>
                  <div className="message-text">{msg.text}</div>
                </div>
              </div>
              {msg.products.length > 0 ? (
                <ProductList products={msg.products} />
              ) : (
                <div></div>
              )}
              {msg.questions.length > 0 ? (
                <Question
                  handleSend={handleSend}
                  questions={msg.questions}
                  parentKey={index}
                />
              ) : (
                <div></div>
              )}
              {msg.suggestion.length > 0 ? (
                <SuggestionBox
                  handleSend={handleSend}
                  suggestionList={msg.suggestion}
                  parentKey={index}
                />
              ) : (
                <div></div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="chat-text-box">
        <div className="flex justify-center items-center bg-white w-full px-2 py-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => (e.key === "Enter" ? handleSend(input) : null)}
            placeholder="Type a message..."
            className="flex-1 h-[40px] px-2  border-2 rounded-[50px] border-gray-300"
          />
          <button
            onClick={() => handleSend(input)}
            className="w-10 flex justify-center items-center "
          >
            <MdSend
              className="  -rotate-45 bg-blue-950 text-white p-2 rounded-[50px]  "
              size={32}
            />
          </button>
        </div>
        {/* <div className="flex justify-center items-center bg-white  ">
          <button className="flex-1 font-semibold text-[0.8rem] flex justify-center items-center flex-col  hover:bg-gray-200 py-2">
            <MdCompassCalibration size={16} />
            Summary
          </button>
          <button className="flex-1 font-semibold text-[0.8rem] flex justify-center items-center flex-col hover:bg-gray-200 py-2">
            <MdChatBubble size={16} />
            Chatbot
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default Chat;
