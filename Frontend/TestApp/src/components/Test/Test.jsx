import './test.css'
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
      fetch(`https://test-app-backend-xdeo.onrender.com/api/ques/chapters/${param}`, {
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
      fetch(`https://test-app-backend-xdeo.onrender.com/api/ques/subject`, {
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
    <div className="flex flex-col lg:flex-row overflow-hidden">
      {/* Left Sidebar */}
      <div className="left sidebar lg:w-1/3  bg-transparent rounded-xl p-4 border-r border-t border-base-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 flex flex-col gap-3 overflow-y-auto">
        <div className="top">
          <h1 className="text-center text-3xl text-secondary-content dark:text-blue-300">
            Topics
          </h1>
        </div>
        <div className="line w-full h-[2px] bg-blue-300 dark:bg-blue-700"></div>
        <div className="sidemain">
  {subjects &&
    subjects.map((s, index) => (
      <div className="flex flex-col gap-3" key={index}>
        <div
          onClick={() => setparam(s)}
          className={`${
            s === param
              ? "bg-base-300 border-2 border-white"
              : "bg-base-content dark:bg-base-200"
          } mt-1  text-daisy-6 hover:scale-105 hover:cursor-pointer border content text-center hover:text-base-content items-center flex justify-center w-full h-12 border-b border-base-300 dark:border-gray-700 rounded text-lg active:scale-95 dark:hover:bg-base-300`}
        >
          <h3 className={`${
            s === param
              ? "text-base-content text-xl bg-base-200"
              : "text-base-200 hover:text-white"
          } text-daisy-11 font-bold `}
          >
            {s}
          </h3>
        </div>
      </div>
    ))}
</div>



      </div>
  
      {/* Right Main Content */}
      <div className="right main lg:w-2/3 h-[90vh] p-4 rounded-xl border border-base-300 dark:border-t-gray-700 text-base-200 dark:text-gray-200" style={{ width: "100%" }}>
        <h1 className='text-base-content text-2xl font-bold'>{param}</h1>
        <div className="card-container container flex flex-col mt-4 space-y-4 ml-3 overflow-x-hidden">
          {ques &&
            ques.map((e, index) => (
              <div key={ques.length - index} className="card bg-base-content opacity-100 shadow-md p-4 flex flex-row items-center space-x-4 rounded-xl border border-daisy-3 border-r">
                <div className="card-content flex-1 justify-center items-center text-lg text-daisy-11 text-secondary-focus" style={{ textDecoration: "underline wavy hotpink" }}>
                  <h2 className='text-xl' >{e}</h2>
                </div>
                <div onClick={() => routeChange(e)} className="btn w-32 h-16 rounded-r-xl btn-daisy-5 hover-bg-daisy-6">
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
