import React from "react";
import { useState } from "react";
import "../App.css";
import "./FindSize.css";
import Slider from "@mui/material/Slider";
import { beautifyString } from "../utils/utils";
import { ABDOMEN_SHAPE, BODY_SHAPE, CHEST_SHAPE } from "../types/enums";
import { IFindPerfectFitAPIReqObj } from "../types/interface";
import styled from "@emotion/styled";
const FindSize = ({ onMenuClick }: { onMenuClick: any }) => {
  const [gender, setGender] = useState("Male");
  const [age, setAge] = useState(25); // default age set to 25
  const [chestShape, setChestShape] = useState(CHEST_SHAPE.NARROW_CHEST);
  const [abdomenShape, setAbdomenShape] = useState(ABDOMEN_SHAPE.FLAT_ABDOMEN);
  const [clothingPreference, setClothingPreference] = useState(1); // 1 for Normal as default
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");

  const clothingLabels = ["Very Fitted", "Normal", "Loose"];

  /**
   * logic to find the body shape of the user
   */
  const calculateBodyShape = () => {
    console.log("chestShape: ", chestShape);
    switch (chestShape) {
      case CHEST_SHAPE.NARROW_CHEST:
        if (abdomenShape === ABDOMEN_SHAPE.FLAT_ABDOMEN) {
          return BODY_SHAPE.APPLE;
        } else if (abdomenShape === ABDOMEN_SHAPE.BULGING_ABDOMEN) {
          return BODY_SHAPE.PEAR;
        } else {
          return BODY_SHAPE.RECTANGLE;
        }
      case CHEST_SHAPE.MEDIUM_CHEST:
        if (abdomenShape === ABDOMEN_SHAPE.FLAT_ABDOMEN) {
          return BODY_SHAPE.RECTANGLE;
        } else if (abdomenShape === ABDOMEN_SHAPE.BULGING_ABDOMEN) {
          return BODY_SHAPE.HOURGLASS;
        } else {
          return BODY_SHAPE.RECTANGLE;
        }
      case CHEST_SHAPE.WIDE_CHEST:
        if (abdomenShape === ABDOMEN_SHAPE.FLAT_ABDOMEN) {
          return BODY_SHAPE.HOURGLASS;
        } else if (abdomenShape === ABDOMEN_SHAPE.BULGING_ABDOMEN) {
          return BODY_SHAPE.INVERTED_TRIANGLE;
        } else {
          return BODY_SHAPE.RECTANGLE;
        }
      default:
        return BODY_SHAPE.RECTANGLE;
    }
  };

  const findPerfectSizeAPI = () => {
    try {
      // validations
      console.log("height: ", height);

      const bodyShape = calculateBodyShape();

      const payload: IFindPerfectFitAPIReqObj = {
        height: parseInt(height || "0"),
        weight: parseInt(weight || "0"),
        age,
        body_shape: bodyShape,
      };

      console.log("payload: ", payload);
      // add this data in the localStorage
      // localStorage.setItem("user_size", JSON.stringify(payload));
      chrome.storage.local.set({ user_size: payload }, function () {
        console.log("Value is set to " + JSON.stringify(payload));
      });
      onMenuClick("summary");
    } catch (error) {
      console.error("Error while fetching the perfect size", error);
    }
  };

  const MaleComponent = () => {
    return (
      <div style={{ width: "100%" }}>
        <div className="flex flex-col items-left justify-start w-full gap-2 mt-2 px-3">
          <p className="text-left text-14">Shape of your chest</p>
          <div className="flex flex-row w-full justify-between items-center">
            <div className="flex flex-col items-left justify-start gap-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="chestShape"
                  value={CHEST_SHAPE.NARROW_CHEST}
                  checked={chestShape === CHEST_SHAPE.NARROW_CHEST}
                  onChange={() => setChestShape(CHEST_SHAPE.NARROW_CHEST)}
                  className="mr-2"
                />
                {beautifyString(CHEST_SHAPE.NARROW_CHEST)}
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="chestShape"
                  value={CHEST_SHAPE.MEDIUM_CHEST}
                  checked={chestShape === CHEST_SHAPE.MEDIUM_CHEST}
                  onChange={() => setChestShape(CHEST_SHAPE.MEDIUM_CHEST)}
                  className="mr-2"
                />
                {beautifyString(CHEST_SHAPE.MEDIUM_CHEST)}
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="chestShape"
                  value={CHEST_SHAPE.WIDE_CHEST}
                  checked={chestShape === CHEST_SHAPE.WIDE_CHEST}
                  onChange={() => setChestShape(CHEST_SHAPE.WIDE_CHEST)}
                  className="mr-2"
                />
                {beautifyString(CHEST_SHAPE.WIDE_CHEST)}
              </label>
            </div>
            <img
              src="./assests/Group 21.svg"
              alt="chest"
              className="w-24 h-24"
            />
          </div>
        </div>
        <div className="flex flex-col items-left justify-start w-full gap-2 mt-2 px-3">
          <p className="text-left text-14">Shape of Your Abdomen</p>
          <div className="flex flex-row w-full justify-between items-center">
            <div className="flex flex-col items-left justify-start gap-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="abdomenShape"
                  value={ABDOMEN_SHAPE.FLAT_ABDOMEN}
                  checked={abdomenShape === ABDOMEN_SHAPE.FLAT_ABDOMEN}
                  onChange={() => setAbdomenShape(ABDOMEN_SHAPE.FLAT_ABDOMEN)}
                  className="mr-2"
                />
                {beautifyString(ABDOMEN_SHAPE.FLAT_ABDOMEN)}
              </label>
              <label className="flex items-center ">
                <input
                  type="radio"
                  name="abdomenShape"
                  value={ABDOMEN_SHAPE.MEDIUM_ABDOMEN}
                  checked={abdomenShape === ABDOMEN_SHAPE.MEDIUM_ABDOMEN}
                  onChange={() => setAbdomenShape(ABDOMEN_SHAPE.MEDIUM_ABDOMEN)}
                  className="mr-2"
                />
                {beautifyString(ABDOMEN_SHAPE.MEDIUM_ABDOMEN)}
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="abdomenShape"
                  value={ABDOMEN_SHAPE.BULGING_ABDOMEN}
                  checked={abdomenShape === ABDOMEN_SHAPE.BULGING_ABDOMEN}
                  onChange={() =>
                    setAbdomenShape(ABDOMEN_SHAPE.BULGING_ABDOMEN)
                  }
                  className="mr-2"
                />
                {beautifyString(ABDOMEN_SHAPE.BULGING_ABDOMEN)}
              </label>
            </div>
            <img
              src="./assests/Group 23.svg"
              alt="abdomen"
              className="w-24 h-24"
            />
          </div>
        </div>{" "}
      </div>
    );
  };

  const FemaleComponent = () => {
    return (
      <div style={{ width: "100%" }}>
        <div className="flex flex-col items-left justify-start w-full gap-2 mt-2 px-3">
          <p className="text-left text-14">Shape of your Abdomen</p>
          <div className="flex flex-row w-full justify-between items-center">
            <div className="flex flex-col items-left justify-start gap-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="chestShape"
                  value={CHEST_SHAPE.NARROW_CHEST}
                  checked={chestShape === CHEST_SHAPE.NARROW_CHEST}
                  onChange={() => setChestShape(CHEST_SHAPE.NARROW_CHEST)}
                  className="mr-2"
                />
                {beautifyString(CHEST_SHAPE.NARROW_CHEST)}
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="chestShape"
                  value={CHEST_SHAPE.MEDIUM_CHEST}
                  checked={chestShape === CHEST_SHAPE.MEDIUM_CHEST}
                  onChange={() => setChestShape(CHEST_SHAPE.MEDIUM_CHEST)}
                  className="mr-2"
                />
                {beautifyString(CHEST_SHAPE.MEDIUM_CHEST)}
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="chestShape"
                  value={CHEST_SHAPE.WIDE_CHEST}
                  checked={chestShape === CHEST_SHAPE.WIDE_CHEST}
                  onChange={() => setChestShape(CHEST_SHAPE.WIDE_CHEST)}
                  className="mr-2"
                />
                {beautifyString(CHEST_SHAPE.WIDE_CHEST)}
              </label>
            </div>
            <img src="./assests/f1.png" alt="chest" className="w-25 h-24" />
          </div>
        </div>
        <div className="flex flex-col items-left justify-start w-full gap-2 mt-2 px-3">
          <p className="text-left text-14">Shape of Your Hips</p>
          <div className="flex flex-row w-full justify-between items-center">
            <div className="flex flex-col items-left justify-start gap-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="abdomenShape"
                  value={ABDOMEN_SHAPE.FLAT_ABDOMEN}
                  checked={abdomenShape === ABDOMEN_SHAPE.FLAT_ABDOMEN}
                  onChange={() => setAbdomenShape(ABDOMEN_SHAPE.FLAT_ABDOMEN)}
                  className="mr-2"
                />
                {beautifyString(ABDOMEN_SHAPE.FLAT_ABDOMEN)}
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="abdomenShape"
                  value={ABDOMEN_SHAPE.MEDIUM_ABDOMEN}
                  checked={abdomenShape === ABDOMEN_SHAPE.MEDIUM_ABDOMEN}
                  onChange={() => setAbdomenShape(ABDOMEN_SHAPE.MEDIUM_ABDOMEN)}
                  className="mr-2"
                />
                {beautifyString(ABDOMEN_SHAPE.MEDIUM_ABDOMEN)}
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="abdomenShape"
                  value={ABDOMEN_SHAPE.BULGING_ABDOMEN}
                  checked={abdomenShape === ABDOMEN_SHAPE.BULGING_ABDOMEN}
                  onChange={() =>
                    setAbdomenShape(ABDOMEN_SHAPE.BULGING_ABDOMEN)
                  }
                  className="mr-2"
                />
                {beautifyString(ABDOMEN_SHAPE.BULGING_ABDOMEN)}
              </label>
            </div>
            <img src="./assests/f2.png" alt="abdomen" className="w-25 h-24" />
          </div>
        </div>{" "}
      </div>
    );
  };  

  return (
    <div
      className="flex flex-col items-center w-full h-full"
      style={{ marginBottom: "60px", color: "#170045", padding: "0px 8px" }}
    >
      <div className="flex flex-row items-start justify-start gap-2 w-full px-3 py-3">
        <div onClick={() => onMenuClick("summary")}>
        <img
          src="./assests/Vector2.svg"
          alt="back"
          className="w-5 h-5"
          style={{ marginTop: "5px"}}
        />
        </div>
       
        <div className="flex flex-col items-left justify-start">
          <h2
            className="text-16 text-left"
            style={{ fontSize: "16px", color: "#170045" }}
          >
            Find Your Perfect Size
          </h2>
          <p
            className="text-12 font-nLight text-left"
            style={{ color: "rgba(23, 0, 69, 0.47)" }}
          >
            Get your Perfect Size according to your body which actually fits you
            & your style
          </p>
        </div>
      </div>

      {/* Gender selection with radio buttons */}
      <div className="flex flex-row items-center justify-left w-full gap-4 mt-2 px-3">
        <p className="text-14">Gender</p>
        <label className="flex items-center">
          <input
            type="radio"
            name="gender"
            value="Male"
            checked={gender === "Male"}
            onChange={() => setGender("Male")}
            className="mr-2"
          />
          Male
        </label>
        <label className="flex items-center">
          <input
            type="radio"
            name="gender"
            value="Female"
            checked={gender === "Female"}
            onChange={() => setGender("Female")}
            className="mr-2"
          />
          Female
        </label>
      </div>

      {/* Height and Weight Inputs */}
      <div className="flex flex-row items-center justify-center w-full gap-4 mt-2 px-3">
        <div
          className="flex flex-col items-left gap-1"
          style={{ width: "46%" }}
        >
          <p className="text-left text-14">Height (CMs)</p>
          <input
            type="number"
            value={height}
            min="0"
            required
            onChange={(e) => setHeight(e.target.value)}
            className="border border-gray-300 rounded-lg p-2"
            placeholder="Enter Your Height"
          />
        </div>
        <div
          className="flex flex-col items-left gap-1"
          style={{ width: "46%" }}
        >
          <p className="text-left text-14">Weight (KG)</p>
          <input
            type="number"
            value={weight}
            min="0"
            required
            onChange={(e) => setWeight(e.target.value)}
            className="border border-gray-300 rounded-lg p-2"
            placeholder="Enter Your Weight"
          />
        </div>
      </div>

      {/* Age Slider */}
      <div className="flex flex-col items-left justify-start w-full gap-2 mt-2 px-3">
        <p className="text-left text-14">What's your age?</p>
        <Slider
          sx={{
            color: "#003b94", // Thumb and active track color
            height: 6,
            "& .MuiSlider-track": {
              background: "#004AAD", // Gradient for the track
              border: "none",
            },
            "& .MuiSlider-rail": {
              opacity: 1,
              backgroundColor: "#DAE3FE", // Inactive track color
            },
            "& .MuiSlider-thumb": {
              height: 20,
              width: 20,
              backgroundColor: "#003b94",
              border: "2px solid currentColor",
              "&:hover, &.Mui-focusVisible, &.Mui-active": {
                boxShadow: "inherit",
              },
            },
          }}
          defaultValue={30}
          onChange={(e, newVal) => setAge(Number(newVal))}
          aria-label="Small"
          valueLabelDisplay="auto"
          min={0}
          max={100}
        />
        {/* <input
          type="range"
          min="0"
          max="100"
          value={age}
          onChange={(e) => setAge(Number(e.target.value))}
          className="w-full range-input"
        /> */}
        <p className="text-center text-14">{age} years old</p>
      </div>
      {/* Shape of Chest */}
      {gender == "Male" ? <MaleComponent /> : <FemaleComponent />}
      {/* Clothing Usage Preference Slider */}
      <div className="flex flex-col items-left justify-start w-full gap-2 mt-2 px-3">
        <p className="font-nBold text-left text-14">
          Clothing Usage Preference
        </p>
        <input
          type="range"
          min="0"
          max="2"
          step="1"
          style={{ height }}
          value={clothingPreference}
          onChange={(e) => setClothingPreference(Number(e.target.value))}
          className="w-full"
        />
        <div className="flex justify-between w-full">
          {clothingLabels.map((label, index) => (
            <span key={index} className="text-12 font-nLight">
              {label}
            </span>
          ))}
        </div>
      </div>
      <div className="flex flex-col items-center justify-center w-full gap-2 mt-2 px-3 mb-4">
        <button
          className="text-white text-14 rounded-lg p-2 w-full mt-4"
          onClick={findPerfectSizeAPI}
          style={{
            backgroundImage:
              "linear-gradient(239.21deg, #38B6FF -83.33%, #004AAD 34.51%, #3E67E0 145.39%)",
          }}
        >
          Find Your Perfect Size
        </button>
      </div>
    </div>
  );
};

export default FindSize;
