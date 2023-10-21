import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchQues } from "../../features/quesSlice";
const Test = () => {
  const [ques, setques] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [param, setparam] = useState('Physics');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchTitleQues = () => {
      fetch(`http://localhost:8000/api/ques/chapters/${param}`, {
        method: 'GET',
        headers: {
          'auth-token': localStorage.getItem("token"),
        },
      })
      .then(response => response.json())
      .then(response => setques(response))
      .catch(err => console.error(err));
    }
    fetchTitleQues();
  }, [param]);
  useEffect(() => {
    const fetchSubjects = () => {
      fetch(`http://localhost:8000/api/ques/subject`, {
        method: 'GET',
        headers: {
          'auth-token': localStorage.getItem("token"),
        },
      })
      .then(response => response.json())
      .then(response => setSubjects(response))
      .catch(err => console.error(err));
    }
    fetchSubjects();
  }, []);
  const routeChange = (e) => {
    let path = `/quiz`;
    dispatch(fetchQues({subject:param,chapter:e}))
    navigate(path,{state:{subject:param,chapter:e}});
  };

  return (
    <>
      <div className="flex overflow-hidden">
        <div className="left sidebar w-[33vh] h-[90vh] bg-transparent rounded-xl p-4 border-r border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 flex flex-col gap-3  "  >
          <div className="top">
            <h1 className="text-center text-3xl text-blue-600 dark:text-blue-300">Topics</h1>
          </div>
          <div className="line w-full h-[2px] bg-blue-300 dark:bg-blue-700"></div>

          <div className="sidemain">
            {subjects&&subjects.map((s,index)=>(
            <div className="flex flex-col gap-1">
              <div onClick={() => setparam(s)} className="content text-center items-center flex justify-center w-full h-12 border-b border-gray-300 dark:border-gray-700 bg-blue-400 dark:bg-gray-700 rounded text-lg active:scale-95 dark:hover:bg-gray-700 text-blue-900 dark:text-gray-100">
                <h3 className="text-blue-900 dark:text-gray-100">{s}</h3>
              </div>
              {/* <div onClick={() => setparam('Chemistry')} className="content text-center items-center flex justify-center w-full h-12 border-b border-gray-300 dark:border-gray-700 bg-green-400 dark:bg-green-700 rounded text-lg active:scale-95 dark:hover:bg-green-700 text-green-900 dark:text-gray-100">
                <h3 className="text-green-900 dark:text-gray-100">Chemistry</h3>
              </div>
              <div onClick={() => setparam('Mathematics')} className="content text-center items-center flex justify-center w-full h-12 border-b border-gray-300 dark:border-gray-700 bg-blue-400 dark:bg-gray-700 rounded text-lg active:scale-95 dark:hover-bg-gray-700 text-blue-900 dark:text-gray-100">
                <h3 className="text-blue-900 dark:text-gray-100">Maths</h3>
              </div> */}
            </div>))}
          </div>
        </div>
        <div className="right main h-[90vh] p-4 rounded-xl border border-t-gray-300 dark:border-t-gray-700 text-base-200 dark:text-gray-200" style={{ width: "100%" }}>
          <div className="card_container container flex flex-col mt-5 gap-4 ml-3 overflow-x-hidden">
            {ques && ques.map((e, index) => (
              <div key={index} className="card bg-transparent border border-base-300  w-[170vh] h-16 rounded-xl flex flex-row justify-between gap-20 items-center">
                <div className="headtext text-xl w-48 h-full bg-yellow-400 text-center text-white rounded-s-xl">
                  <h1 className="text-center mt-4 text-yellow-900 dark:text-yellow-100">{ques[index]}</h1>
                </div>
                <div className="topictext text-white text-xl text-hotpink-500" style={{ textDecoration: "underline wavy hotpink" }}>
                  <h3>{e}</h3>
                </div>
                <div className="fullmarkstest text-base-300  text-xs text-coral-500" style={{ textDecoration: "underline overline coral" }}>
                  {e.text}
                </div>
                <div onClick={()=>routeChange(e)} className="btn w-32 h-full rounded-e-lg rounded-s-none btn-success hover:bg-green-700">
                  Give Test
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
