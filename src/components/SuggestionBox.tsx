import React, { useState } from "react";
import "./SuggestionBox.css";


interface SuggestionBoxProps {
    handleSend: (message: string) => void;
    suggestionList: string[];
    parentKey:number
  }
const SuggestionBox:React.FC<SuggestionBoxProps>= ({handleSend,suggestionList,parentKey}) => {

  const selectStyle = (index: any) => {
    const element = document.querySelector(
      `[data-key="${index}"].suggestion-field`
    ) as HTMLElement;
    const allElements = document.querySelectorAll(".suggestion-field");
    const message = document.querySelector(
      `[data-key="${index}"].suggestion-text`
    )?.textContent;
    if (element) {
      allElements.forEach((element) => {
        (element as HTMLElement).style.backgroundColor = "white";
        (element as HTMLElement).style.color = "#170045";
      });
      element.style.backgroundColor = "#004AAD";
      element.style.color = "white";
    }
    if (message) handleSend(message?.toString());
  };

  return (
    <div className="suggestion-container">
      {/* <div style={{ color: "#170045" }}>Pick the Occasion for yourself</div> */}
      {suggestionList.map((txt :any, index : any) => (
        <div
          data-key={parentKey.toString() +"$" +index.toString()}
          className="suggestion-field"
          onClick={() => selectStyle(parentKey.toString() +"$" +index.toString())}
        >
          <div data-key={parentKey.toString() +"$" +index.toString()} className="suggestion-text">
            {txt}
          </div>
        </div>
      ))}
    </div>
  );
};
export default SuggestionBox;
