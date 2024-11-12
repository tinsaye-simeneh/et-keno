import React from "react";
import { useState, useEffect } from "react";
import draw from "../assets/images/draw-text.png";

const Winners = ({ numb, hits, wins }) => (
  <>
    <p className="  font-[500] text-5xl text-[#ff0000] mt-2  Fontbruno ">
      PICK {numb}
    </p>
    <div className="flex flex-row justify-around w-full mt-8">
      <div className="flex flex-col text-left">
        <h3 className="  font-[600] text-4xl Fontraj text-[#ffff00] mb-2">
          {" "}
          HITS{" "}
        </h3>

        {hits.map((value, index) => (
          <p key={index} className="  font-[600] text-4xl text-white Fontraj">
            {value}
          </p>
        ))}
      </div>

      <div className="flex flex-col text-left">
        <h3 className="  font-[600] text-4xl Fontraj text-[#ffff00] mb-2">
          {" "}
          WINS{" "}
        </h3>

        {wins.map((value, index) => (
          <p key={index} className="  font-[600] text-4xl text-white Fontraj">
            {value}
          </p>
        ))}
      </div>
    </div>
  </>
);
const components = [
  //list of switching components

  () => (
    <div>
      <p className="  font-[600] text-5xl text-white  text-center Fontbruno mt-14 ">
        PICK <span className="text-[#ff0000]">1 </span>TO{"  "}
        <span className="text-[#ff0000]">10</span>
      </p>
      <p className="font-[600] text-5xl text-white  text-center Fontbruno mt-14 ">
        NUMBERS{" "}
      </p>
      <p className="font-[600] text-5xl text-white  text-center Fontbruno mt-14 ">
        FROM <span className="text-[#ff0000]">80</span>
      </p>
    </div>
  ),
  () => (
    <div>
      <p className="  font-[600] text-5xl text-white mt-2 text-center Fontraj ">
        Play
      </p>
      <p className="  font-[600] text-5xl text-white mt-2 text-center Fontraj ">
        The{" "}
        <span className="font-[600] text56xl text-[#ff0000] mt-2  Fontbruno">
          PICK 10
        </span>{" "}
        Game
      </p>
      <p className="  font-[600] text-5xl text-white  text-center Fontraj mt-8 ">
        Get <span className="text-[#ff0000]">10</span> Numbers
      </p>
      <p className="  font-[600] text-5xl text-white mt-2 text-center Fontraj ">
        Correct, and
      </p>
      <p className="  font-[600] text-5xl text-white mt-2 text-center Fontraj ">
        win the
      </p>
      <p className="  font-[600] text-5xl text-[#ff0000]  text-center Fontbruno mt-14 ">
        PICK 10 <span className="text-white Fontraj">JACKPOT</span>{" "}
      </p>
    </div>
  ),

  () => (
    <div>
      <p className="  font-[600] text-5xl text-[#ff0000]  text-center Fontbruno mt-14 ">
        PICK 3 <br /> <span className="text-white">TO</span>
        <br /> PICK 10 <br />
        <span className="  font-[600] text-5xl text-white mt-2 text-center Fontraj ">
          games have
        </span>
        <br /> <span className="  text-[#fff000] "> MULTIPLE PAY LEVEL</span>{" "}
        <br />
        <span className="font-[600] text-5xl text-white mt-2 text-center Fontraj ">
          on other spots.
        </span>
      </p>
    </div>
  ),
  () => {
    const hits = [10, 9, 8, 7, 6, 5, 4];
    const wins = [5000, 2500, 400, 40, 12, 4, 2];
    return <Winners numb="10" hits={hits} wins={wins} />;
  },
  () => {
    const hits = [9, 8, 7, 6, 5, 4];
    const wins = [4200, 1800, 120, 18, 6, 3];
    return <Winners numb="9" hits={hits} wins={wins} />;
  },
  () => {
    const hits = [8, 7, 6, 5, 4];
    const wins = [300, 600, 68, 8, 4];
    return <Winners numb="8" hits={hits} wins={wins} />;
  },
  () => {
    const hits = [7, 6, 5, 4, 3];
    const wins = [2150, 120, 12, 6, 1];
    return <Winners numb="7" hits={hits} wins={wins} />;
  },
  () => {
    const hits = [6, 5, 4, 3];
    const wins = [1800, 70, 10, 1];
    return <Winners numb="6" hits={hits} wins={wins} />;
  },
  () => {
    const hits = [5, 4, 3, 2];
    const wins = [300, 15, 3, 1];
    return <Winners numb="5" hits={hits} wins={wins} />;
  },
  () => {
    const hits = [4, 3, 2];
    const wins = [100, 8, 1];
    return <Winners numb="4" hits={hits} wins={wins} />;
  },
  () => {
    const hits = [3, 2];
    const wins = [35, 3];
    return <Winners numb="3" hits={hits} wins={wins} />;
  },
  () => {
    const hits = [2];
    const wins = [15];
    return <Winners numb="2" hits={hits} wins={wins} />;
  },
  () => {
    const hits = [1];
    const wins = ["3.8"];
    return <Winners numb="1" hits={hits} wins={wins} />;
  },
];

const CountDown = ({ gameInfo, seconds, videoOn }) => {
  const [activeComponent, setActiveComponent] = useState(0);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveComponent((prev) => (prev + 1) % components.length);
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  let ActiveComponent = components[activeComponent];

  return (
    <div className="flex flex-col gap-2  bg-gradient-to-b from-[#7c190b] to-black h-full text-center  ">
      <div className="flex justify-center align-middle mt-8">

      <img
        src={draw}
        alt="keno"
        className=" max-h-[3rem] mt-3 mr-4 "
        />
      <span className="font-[900] text-7xl  text-shadow Fontraj text-white"> {gameInfo.gameId}</span>{" "}
      </div>
      <p className={`  mt- mb-4  font-[300] bordered-text  Fontraj ${seconds <11  && "blink"} ${seconds<1 && videoOn==false ? "text-8xl mt-2 mb-4 ":"text-9xl"} `}>
        {seconds<1 && videoOn==false ?"BET CLOSED":formatTime(seconds)}
      </p>

      <div>{ActiveComponent && <ActiveComponent />}</div>
    </div>
  );
};

export default CountDown;
