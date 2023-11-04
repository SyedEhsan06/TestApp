import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Result from "../Result/Result";

const Quiz = () => {
  const location = useLocation()
  
  let subject = location.state.chapter
  const [postData, setPostData] = useState({
    marks: 0,
    question:subject,
    fullmarks: 100,
  });
const [optionss, setoptionss] = useState([])
  const [resultShow, setresultShow] = useState(false);
  const navigate = useNavigate();
  const [score, setscore] = useState(0);
  const [currentQues, setcurrentQues] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);  
  const ques = useSelector((state) => state.ques);


  if (ques !== undefined && Array.isArray(ques.data)) {
    const arr = ques.data.map((data, index) => {
      return data;
    });
    const questions = arr.map((data) => data.quesTitle);
  } else {
    return <div>Invalid data</div>;
  }

  const q = ques.data.map((data, index) => data);

  const setQues = (action) => {
    if (currentQues < q.length - 1 && action === currentQues + 1) {
      setcurrentQues(action);
    } else if (currentQues < q.length && action === currentQues - 1) {
      setcurrentQues(action);
      
      
    }
  };

  const handleOptionChange = (index) => {
    if (selectedOption === index + 1) {
      setSelectedOption(null);
      
      setscore(score)
    } else {
      setSelectedOption(index + 1);
    }
  };

  const handleSubmit = () => {
    if (selectedOption === getCorrectOptionIndex() ) {
      
      setscore(score + 10);
      setSelectedOption(null);

    }
    setQues(currentQues + 1);
  };

  const getResults = async () => {
    if (selectedOption === getCorrectOptionIndex()) {
      
      const newScore = score + 10;

      setscore(newScore);

      const updatedPostData = {
        ...postData,
        marks: newScore,
        question: subject,
        fullmarks: q.length*10,
      };
      setPostData(updatedPostData);

      const response = await fetch(
        "https://test-app-backend-xdeo.onrender.com/api/marks/postmarks",

        {
          method: "POST",
          mode: "no-cors",

          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
          body: JSON.stringify(updatedPostData),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      

      if (data) {
        setresultShow(true);
      }
    }
    else{
      
      const newScore = score;

      setscore(newScore);

      const updatedPostData = {
        ...postData,
        marks: newScore,
        question: subject,
        fullmarks: q.length*10,
      };
      setPostData(updatedPostData);

      const response = await fetch(
        "https://test-app-backend-xdeo.onrender.com/api/marks/postmarks",
        {
          method: "POST",
          mode: "no-cors",

          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
          body: JSON.stringify(updatedPostData),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      

      if (data) {
        setresultShow(true);
      }
    }
  };

  const getCorrectOptionIndex = () => {
    return (
      q[currentQues].options.findIndex((option) => option.isCorrect === true) +
      1
    );
  };

  
  

  return (
    <>
    {resultShow === false ? (
      <div className="maindiv w-full h-screen flex justify-center items-center">
        <div className="border h-[80vh] cont border-black p-4 w-[80vw] bg-slate-900 text-white text-lg relative">
          <div className="timeComponent w-full h-16 mb-4 flex justify-between">
            <div className="time bg-red-400 w-16 h-16 text-center flex justify-center items-center font-bold text-white rounded-full">
              Q{currentQues + 1}
            </div>
            <div className="time bg-emerald-400 w-32 h-16 text-center flex justify-center items-center font-bold text-white rounded-full">
              Score: {score}
            </div>
          </div>
          <div className="items-center main flex flex-col gap-4">
            <div className="ques text-left mb-6">
              <h1 className="quesText text-xl">{q[currentQues].quesTitle}</h1>
            </div>
            <div className="options flex flex-col gap-3">
              {q[currentQues].options.map((option, index) => (
                <div
                  key={index}
                  className={`btn border hover:text-white hover:bg-slate-700 hover:scale-105  border-black w-[70vw] p-3 text-left text-black ${
                    selectedOption === index + 1 ? "bg-black text-white" : "bg-white"
                  }`}
                  onClick={() => handleOptionChange(index)}
                >
                  {option.text}
                </div>
              ))}
            </div>
          </div>
          <div className="pagination mt-6">
            <div className="flex justify-center items-center m-12 w-[70vw]">
              {selectedOption === null ? (
                <button
                  className="btn btn-outline h-[9vh] w-[12vw]"
                  onClick={() => setQues(currentQues + 1)}
                >
                  Next
                </button>
              ) : (
                <>
                  {currentQues === q.length - 1 ? (
                    <button
                      className="btn btn-success"
                      onClick={getResults}
                    >
                      Get Results
                    </button>
                  ) : (
                    <button
                      className="btn btn-success"
                      onClick={() => handleSubmit()}
                    >
                      Submit
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    ) : (
      <Result props={postData} />
    )}
  </>
  
  );
};

export default Quiz;
