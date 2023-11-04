import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { fetchQues } from "../../features/quesSlice";
const Test = () => {
  const [ques, setques] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [param, setparam] = useState("Physics");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchTitleQues = () => {
      fetch(`https://mern-test-app-ewyk.onrender.com/api/ques/chapters/${param}`, {
        method: "GET",
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      })
        .then((response) => response.json())
        .then((response) => setques(response))
        .catch((err) => console.error(err));
    };
    fetchTitleQues();
  }, [param]);
  useEffect(() => {
    const fetchSubjects = () => {
      fetch(`https://mern-test-app-ewyk.onrender.com/api/ques/subject`, {
        method: "GET",
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      })
        .then((response) => response.json())
        .then((response) => setSubjects(response))
        .catch((err) => console.error(err));
    };
    fetchSubjects();
  }, []);
  const routeChange = (e) => {
    let path = `/quiz`;
    dispatch(fetchQues({ subject: param, chapter: e }));
    navigate(path, { state: { subject: param, chapter: e } });
  };
  return (
    <>
      <div className="flex overflow-hidden">
        <div className="left sidebar w-[33vh] h-[90vh] bg-transparent rounded-xl p-4 border-r border-t border-base-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 flex flex-col gap-3  ">
          <div className="top">
            <h1 className="text-center text-3xl text-secondary-content dark:text-blue-300">
              Topics
            </h1>
          </div>
          <div className="line w-full h-[2px] bg-blue-300 dark:bg-blue-700"></div>

          <div className="sidemain">
            {subjects &&
              subjects.map((s, index) => (
                <div className="flex flex-col gap-1">
                  <div
                    onClick={() => setparam(s)}
                    className={`${
                      s == param ? "bg-base-300 border border-white" : null
                    } mt-1 hover:bg-base-100  hover:scale-105 hover:cursor-pointer border content text-center items-center flex justify-center w-full h-12 border-b border-base-300 dark:border-gray-700 bg-base-content dark:bg-gray-700 rounded text-lg active:scale-95 dark:hover:bg-gray-700 text-blue-900 dark:text-gray-100`}
                  >
                    <h3 className={`${ s == param?"text-base-content":'text-base-300 hover:text-base-content'}  dark:text-gray-100`}>{s}</h3>
                  </div>  
                </div>
              ))}
          </div>
        </div>
        <div
          className="right main h-[90vh] p-4 rounded-xl border border-base-300 dark:border-t-gray-700 text-base-200 dark:text-gray-200"
          style={{ width: "100%" }}
        >
          <div className="card-container container flex flex-col mt-5 space-y-4 ml-3 overflow-x-hidden">
            {ques &&
              ques.map((e, index) => (
                <div
                  key={ques.length - index}
                  className="card bg-base-content opacity-100 shadow-md p-4 flex flex-row items-center space-x-4 rounded-xl border border-daisy-3 border-r"
                >
                  <div className="card-header w-48 h-16 bg-daisy-1 text-daisy-10 flex items-center justify-center rounded-l-xl">
                    <h1 className="text-xl text-base-300 font-semibold">
                      {param}
                    </h1>
                  </div>
                  <div
                    className="card-content flex-1 text-lg text-daisy-11 text-secondary-focus"
                    style={{ textDecoration: "underline wavy hotpink" }}
                  >
                    <h3>{e}</h3>
                  </div>
                  <div
                    onClick={() => routeChange(e)}
                    className="btn w-32 h-16 rounded-r-xl btn-daisy-5 hover:bg-daisy-6"
                  >
                    Start Test
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Test;
