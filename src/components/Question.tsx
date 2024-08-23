import React, { useState } from "react";
import "./Question.css";


interface QuestionsProps {
  handleSend: (message: string) => void;
  questions: string[];
  parentKey: number;
}
const Question:React.FC<QuestionsProps> = ({handleSend,questions,parentKey}) => {
  const handleClick = (index:any) =>{

    console.log(index);
    const element = document.querySelector(
        `[data-key="${index}"].question-container`
      ) as HTMLElement;
      const allElements = document.querySelectorAll(".question-container");
      const message = document.querySelector(
        `[data-key="${index}"].question-txt`
      )?.textContent;
      if (element) {
        allElements.forEach((element) => {
          (element as HTMLElement).style.backgroundColor = "rgba(23, 0, 69, 0.04)";
          (element as HTMLElement).style.color = "#170045";
        });
        element.style.backgroundColor = "#007bff";
        element.style.color = "white";
      }
      console.log("the selected message is", message);
    if(message){
        console.log(message);
        handleSend(message);
    }
  }
  return (

      <div>
          {questions.map((txt :any, index:any) => (
            <div data-key={parentKey.toString() +"$" +index.toString()} className="question-container" onClick={() => handleClick(parentKey.toString() +"$" +index.toString())}>
              <div data-key={parentKey.toString() +"$" +index.toString()} className="question-txt">{txt}</div>
            </div>
          ))}
      </div>
  );
};

export default Question;
