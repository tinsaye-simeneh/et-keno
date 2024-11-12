import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import NumberGrids from "../components/numberGrids";
import CountDown from "../components/CountDown";
import { getKenoData, getKenoResult } from "../stores/keno/kenoAction";
import {
  kenoData,
  kenoResult,
  prevData,
  error,
  setError,
} from "../stores/keno/kenoSlice";
import glass from "../assets/images/glass.png";
import historyBg from "../assets/images/historyBg.png";
import keno from "../assets/images/keno.png";
import shuffleVideo from "../assets/shuffle.mp4";
import isTokenAuthenticated from "../pages/isAuthenticated";
import { toast } from "react-toastify";

const Notification = ({ message, type }) => {
  if (type === "error") {
    toast.error(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  } else {
    toast.success(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
};

const Keno = () => {
  const dispatch = useDispatch();
  const kenoinfo = useSelector((state) => state.Keno.kenoData);
  const preData = useSelector(prevData);
  const Result = useSelector(kenoResult);
  const errorVal = useSelector(error);

  const videoRef = useRef(null);

  const [seconds, setSeconds] = useState(null);
  const [numberOnBall, setNumberOnBall] = useState("");
  const [winnerCount, setWinnerCount] = useState(0);

  const [ballOne, setBallOne] = useState(false);
  const [ballTwo, setBallTwo] = useState(false);
  const [ballThree, setBallThree] = useState(false);

  const [showVideo, setShowVideo] = useState(false);
  const [showPrev, setShowPrev] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [displayWarning, setDisplayWarning] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // if (isAuthenticated) {
    dispatch(getKenoData());
    setShowResults(false);
    setShowPrev(false);
    calculateDifference();
    // } else {
    //   Notification({
    //     message: "Session Expired, Please login first",
    //     type: "error",
    //   });
    //   window.location.href = "/login";
    // }
  }, [errorVal, dispatch]);

  useEffect(() => {
    calculateDifference();
  }, [kenoinfo.startTime]);

  const calculateDifference = () => {
    if (kenoinfo.startTime && kenoinfo.serverTime) {
      const serverTime = new Date(kenoinfo.serverTime);
      const localTime = new Date();

      const timeDifferenceWithServer = Math.floor(
        (localTime.getTime() - serverTime.getTime()) / 1000
      );

      const differenceInSeconds = Math.floor(
        (new Date().getTime() - new Date(kenoinfo.startTime).getTime()) / 1000
      );
      setSeconds(303 - differenceInSeconds + timeDifferenceWithServer);
    }
  };

  const handleVideoEnd = () => {
    dispatch(getKenoResult(kenoinfo._id));
    setShowVideo(false);
    setShowResults(true);
  };

  const handleGameRestart = () => {
    setShowPrev(true);
    const timer = setTimeout(() => {
      setShowResults(false);
      setShowPrev(false);
      setNumberOnBall(""); // Reset numberOnBall
      setWinnerCount(0); // Reset winnerCount
      calculateDifference();
    }, 8000);

    return () => clearTimeout(timer);
  };

  const handleBallMovement = (num) => {
    if (num !== "") {
      setNumberOnBall(num);
    }
  };

  useEffect(() => {
    if (numberOnBall !== "") {
      const delays = [30, 1300, 60];

      setBallOne(true);
      setTimeout(() => {
        setBallOne(false);
        setBallTwo(true);
        setTimeout(() => {
          setBallTwo(false);
          setBallThree(true);
          setTimeout(() => {
            setBallThree(false);
          }, delays[2]);
        }, delays[1]);
      }, delays[0]);
    }
  }, [numberOnBall]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowResults(false);
      setShowPrev(false);
    }, 8000);
    calculateDifference();

    return () => clearTimeout(timer);
  }, [showPrev]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      // if (isAuthenticated) {
      if (seconds > 0) {
        setSeconds((prevSeconds) => prevSeconds - 1);
        if (seconds === 1) {
          setTimeout(() => {
            dispatch(getKenoResult(kenoinfo._id));
            setShowVideo(true);
          }, 3000);
        }
      } else {
        clearInterval(intervalId);
      }
      // } else {
      //   Notification({
      //     message: "Session Expired, Please login first",
      //     type: "error",
      //   });
      //   window.location.href = "/login";
      // }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [seconds]);

  useEffect(() => {
    const checkAuthentication = async () => {
      const authStatus = await isTokenAuthenticated();
      setIsAuthenticated(authStatus);
    };

    const intervalId = setInterval(checkAuthentication, 20000);

    return () => clearInterval(intervalId);
  }, [isAuthenticated]);

  const handleVideoError = () => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        setShowVideo(false);
        dispatch(setError());
        console.error("Error playing video:", error);
      });
    }
  };

  useEffect(() => {
    if (showVideo) {
      const timer = setTimeout(() => {
        if (!videoRef.current || videoRef.current.currentTime === 0) {
          setShowVideo(false);
          setShowResults(true);
        }
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showVideo]);

  const screenWidth = window.screen.width;
  const screenHeight = window.screen.height;

  useEffect(() => {
    if (screenWidth !== 1280 || screenHeight !== 720) {
      setDisplayWarning(true);
    } else {
      setDisplayWarning(false);
    }
  }, [screenWidth, screenHeight]);

  return (
    <>
      {displayWarning ? (
        <div className="flex items-center justify-center h-screen bg-gray-600">
          <h1 className="text-2xl text-white" style={{ fontSize: "3rem" }}>
            Please set the screen display to 1280 x 720
          </h1>
        </div>
      ) : (
        <div className="grid grid-cols-7 h-screen overflow-hidden bg-[#fe0200]">
          <img
            src={keno}
            alt="keno"
            className="absolute max-h-[64px] bottom-4 left-4"
          />
          {showVideo ? (
            <video
              className="absolute top-0 left-0 z-20 object-cover w-screen h-screen"
              autoPlay
              muted
              preload="auto"
              onLoadedData={() => videoRef.current && videoRef.current.play()}
              onError={handleVideoError}
              onEnded={handleVideoEnd}
              ref={videoRef}
            >
              <source src={shuffleVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : !showPrev ? (
            <>
              <div className="col-span-4 number-grid">
                <NumberGrids
                  gameId={kenoinfo.gameId}
                  game_Id={kenoinfo._id}
                  seconds={seconds}
                  showResults={showResults}
                  toggleShowResult={handleGameRestart}
                  setResultNumber={handleBallMovement}
                  setWinnerCount={setWinnerCount}
                />
              </div>
              <div className="col-span-3 pl-6 ">
                {showResults ? (
                  <>
                    <div className="bg-transparent absolute h-[8rem] w-[10rem]  overflow-hidden bottom-[1.8rem] right-[14.7rem]">
                      <div
                        className={` absolute h-[8rem] w-[9rem] rounded-full overflow-hidden  right-4 ${
                          numberOnBall > 39
                            ? "circle-gradient-brown"
                            : "circle-gradient-yellow"
                        } z-10 opacity-70 text-center ${!ballOne && "hidden"}`}
                      >
                        <p className=" absolute top-[25%] right-[37%] rotate-45 font-bold text-[70px] Fontraj">
                          {numberOnBall}
                        </p>
                        <p className=" absolute -top-[30%] left-[25%] rotate-180 font-bold text-[70px] Fontraj">
                          {numberOnBall}
                        </p>
                      </div>
                    </div>
                    <div className="bg-transparent absolute h-[20.2rem] w-[28rem]  overflow-hidden top-[11.2rem] right-12 ">
                      <div
                        className={`vibrating absolute h-[23rem] w-[28rem] rounded-full overflow-hidden -top-7  ${
                          numberOnBall > 39
                            ? "circle-gradient-brown"
                            : "circle-gradient-yellow"
                        } z-10  text-center
                   ${!ballTwo && "hidden"}
                   `}
                      >
                        <p
                          className={` absolute top-[30%] right-[50%] rotate-25 font-bold text-[160px] Fontraj`}
                        >
                          {numberOnBall}
                        </p>
                        <p className=" absolute -top-[20%] left-[25%] rotate-180 font-bold text-[150px] Fontraj">
                          {numberOnBall}
                        </p>
                        <p className=" absolute bottom-[20%] -right-[10%] -rotate-90 font-bold text-[150px] Fontraj">
                          {numberOnBall}
                        </p>
                        <p className=" absolute -bottom-[28%] left-[40%] rotate-270 font-bold text-[150px] Fontraj">
                          {numberOnBall}
                        </p>
                      </div>
                    </div>

                    <div className="bg-transparent absolute h-[6rem] w-[10rem]  overflow-hidden top-[1.8rem] right-[12rem]">
                      <div
                        className={` absolute h-[7rem] w-[8rem] rounded-full overflow-hidden -top-10 right-4 ${
                          numberOnBall > 39
                            ? "circle-gradient-brown"
                            : "circle-gradient-yellow"
                        } z-10 opacity-50 text-center ${
                          !ballThree && "hidden"
                        }`}
                      >
                        <p className=" absolute top-[25%] right-[37%] rotate-45 font-bold text-[50px] Fontraj">
                          {numberOnBall}
                        </p>
                        <p className=" absolute -top-[30%] left-[25%] rotate-180 font-bold text-[50px] Fontraj">
                          {numberOnBall}
                        </p>
                      </div>
                    </div>

                    <div className="absolute flex text-3xl font-semibold text-gray-300 top-20 right-8">
                      <p>{winnerCount}</p>
                      <p className="mt-1">/</p>
                      <p className="mt-1">20</p>
                    </div>
                    <img src={glass} alt="glass" className="h-[100%]" />
                  </>
                ) : (
                  <CountDown
                    gameInfo={kenoinfo}
                    seconds={seconds}
                    videoOn={showVideo}
                  />
                )}
              </div>
            </>
          ) : (
            <div
              className="absolute top-0 left-0 w-full h-full bg-center bg-no-repeat bg-cover"
              style={{ backgroundImage: `url(${historyBg})` }}
            >
              <div className="px-10 py-12">
                {[...preData].map((dataArray, index) => (
                  <div key={index} className="flex gap-8 my-4">
                    <h1 className="text-5xl text-white Fontraj">
                      {kenoinfo.gameId - 1 - index}
                    </h1>
                    <div className="flex gap-2">
                      {[...dataArray]
                        .sort((a, b) => a - b)
                        .map((number, i, array) => (
                          <React.Fragment key={i}>
                            {number > 39 && array[i - 1] <= 39 && (
                              <div
                                key={number}
                                className="h-12 left-1/2 bg-gray-500 w-[2px]"
                              ></div>
                            )}
                            <div
                              key={i}
                              className={`w-12 h-12 rounded-full flex items-center justify-center text-black Fontraj shadow-lg ${
                                number > 39 ? "bg-[#ff9b17]" : "bg-[#ffff00]"
                              }`}
                            >
                              <p className="text-2xl font-bold text-center ">
                                {number}
                              </p>
                            </div>
                          </React.Fragment>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Keno;
