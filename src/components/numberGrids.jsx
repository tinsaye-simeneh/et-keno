import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getKenoData, getKenoResult } from "../stores/keno/kenoAction";
import { kenoResult, prevData } from "../stores/keno/kenoSlice";
import draw from "../assets/images/draw-text.png";

const NumberGrids = ({
  gameId,
  seconds,
  showResults,
  toggleShowResult,
  setResultNumber,
  setWinnerCount,
}) => {
  const [selected, setSelected] = useState([]);
  const [numForDisplay, setNumForDisplay] = useState([]);
  const [hasStartedDisplay, setHasStartedDisplay] = useState(false);
  const numbers = Array.from({ length: 80 }, (_, index) => index + 1);
  const [range, setRange] = useState(null);

  const dispatch = useDispatch();
  const Result = useSelector(kenoResult);

  const startNumberDisplay = () => {
    setSelected(Result);
    let index = 0;
    const addNumber = () => {
      if (Result[index] !== undefined && index < Result.length) {
        setNumForDisplay(Result.slice(0, index + 1));
        setResultNumber(Result[index]); //set number for the ball
        setWinnerCount(index + 1);
        index++;
      } else {
        clearInterval(intervalId); // Stop the interval when all numbers are added
        dispatch(getKenoData());
        setHasStartedDisplay(false);
        // resetSecond(true);
        toggleShowResult();
      }
    };

    const intervalId = setInterval(addNumber, 2000);

    return () => clearInterval(intervalId);
  };

  const checkRange = () => {
    if (numForDisplay.length > 0) {
      const above40Count = numForDisplay.filter((num) => num > 40).length;
      const below40Count = numForDisplay.filter((num) => num < 40).length;
      if (above40Count < below40Count) {
        setRange("HEADS");
      } else {
        if (above40Count > below40Count) {
          setRange("TAILS");
        } else {
          setRange("EQUAL");
        }
      }
    }
  };

  const preData = useSelector(prevData);

  useEffect(() => {
    const fetchDataAndStartDisplay = async () => {
      seconds > 0 && setNumForDisplay(preData[0]);
      if (seconds === 0 && hasStartedDisplay === false) {
        if (Result.length > 0 && showResults) {
          startNumberDisplay();
          setHasStartedDisplay(true); // Set the flag to true to indicate that it has started
        }
      }
    };

    fetchDataAndStartDisplay();
  }, [seconds, dispatch, Result]);

  useEffect(() => {
    checkRange();
  }, [numForDisplay]);

  return (
    <div className="relative flex flex-col   h-vh w-full">
      <div className="flex  align-middle  h-full w-full absolute top-6 left-8 ">
        <img src={draw} alt="keno" className=" max-h-[3rem] mt-3 mr-4 " />
        <span className="font-[900] text-7xl  text-shadow Fontraj text-white">
          {" "}
          {seconds > 0 ? gameId - 1 : gameId}
        </span>{" "}
      </div>
      <div className="flex items-center justify-end w-full mb-1 mt-12">
        <div
          className={`w-40 h-10 mr-8 py-2 bg-gradient-to-t  rounded-2xl text-black shadow-md flex items-center justify-center ${
            range !== "HEADS"
              ? "bg-[#b10100]"
              : "from-[#ffff00] via-[#a9a916] to-[#ffff00]"
          }`}
        >
          <h2
            className={`text-3xl font-[600] py-4 Fontraj ${
              range !== "HEADS" && "hidden"
            }`}
          >
            HEADS
          </h2>
        </div>
      </div>
      <div className="grid grid-cols-10 gap-1.5 py-4 px-8 mt-1">
        {numbers.map((number) => (
          <div
            key={number}
            className={`flex items-center justify-center h-[3.7rem] w-[3.8rem]  rounded-2xl shadow-md  ${
              numForDisplay.length > 0 &&
              numForDisplay.find((selec) => selec === number)
                ? number <= 40
                  ? "bg-gradient-to-b from-[#ffff00] via-[#e8e815] to-[#a9a916]  scale-105 transition-transform draw-effect"
                  : " bg-[#ff9b17]   scale-105 transition-transform draw-effect"
                : "bg-gradient-to-b from-[#ee120eeb] to-[#a40201]  text-[#e90201]"
            }`}
          >
            <h3 className="text-[44px] font-[400] Fontraj">{number}</h3>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-end w-full mt-2">
        <div
          className={`w-40 h-10 py-2  mr-8  bg-gradient-to-b rounded-2xl text-black shadow-md flex items-center justify-center ${
            range !== "TAILS"
              ? "bg-[#b10100]"
              : "from-[#ff9b17] via-[#ba7821dc] to-[#ff9b17] "
          }`}
        >
          <h2
            className={`text-3xl font-[500] Fontraj ${
              range !== "TAILS" && "hidden"
            }`}
          >
            TAILS
          </h2>
        </div>
      </div>
      {/* <h2 className="absolute -bottom-14 left-4 text-8xl font-[00] Fontraj text-[#a40201] text-shadow">KENO</h2> */}
    </div>
  );
};

export default NumberGrids;
