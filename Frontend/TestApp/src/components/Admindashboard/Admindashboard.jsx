  import React, { useEffect, useState } from "react";
  import { useLocation, useNavigate } from "react-router-dom";

  const Admindashboard = () => {
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const [userData, setUserData] = useState('')
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [allques, setallques] = useState([]);
    useEffect(() => {
      const fetchUserData = async () => {
        const authToken = localStorage.getItem("token");
        try {
          const response = await fetch('https://test-app-backend-xdeo.onrender.com/api/auth/getuser', {
            method: 'GET',
            headers: {
              'auth-token': authToken,
            },
          });
  
          if (response.ok && !undefined) {
            const userData = await response.json();
            setUserData(userData); 
          } else {
            console.error('Failed to fetch user data');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };
  
      fetchUserData();
      
    }, [location.pathname=="/admindashboard"])
    if (userData&&userData.role != "admin") {
        navigate("/login");
      }
    const [formData, setFormData] = useState({
      quesTitle: "",
      text: "",
      options: [
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
      ],
      subject: "",
      chapter: "",
    });

    const handleOptionChange = (index, text) => {
      const newOptions = [...formData.options];
      newOptions[index].text = text;
      setFormData({ ...formData, options: newOptions });
    };

    const handleCorrectOptionChange = (index) => {
      const newOptions = [...formData.options];
      newOptions.forEach((option, i) => (option.isCorrect = i === index));
      setFormData({ ...formData, options: newOptions });
    };

    const handleInputChange = (event, field) => {
      setFormData({ ...formData, [field]: event.target.value });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      const response = await fetch("https://test-app-backend-xdeo.onrender.com/api/ques/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify(formData),
      });
      const json = await response.json();      
      setShowModal(false);
    };

    const createModal = () => {
      return (
        <div className="w-full h-screen bg-transparent flex items-center justify-center z-20 absolute top-6">
          <div className="bg-base-100  text-white rounded p-6 max-w-lg flex flex-wrap">
            <div className="w-full md:w-1/2 pr-4">
              <form className="space-y-4">
                <div>
                  <label className="block font-semibold text-base">
                    Question Title:
                  </label>
                  <input
                    className="w-full px-4 py-2 rounded border focus:outline-none focus:ring focus:border-blue-300"
                    type="text"
                    value={formData.quesTitle}
                    onChange={(e) => handleInputChange(e, "quesTitle")}
                  />
                </div>

                <div>
                  <label className="block font-semibold text-base">
                    Text:
                  </label>
                  <textarea
                    className="w-full px-4 py-2 rounded border focus:outline-none focus:ring focus:border-blue-300"
                    value={formData.text}
                    onChange={(e) => handleInputChange(e, "text")}
                  />
                </div>

                <div>
                  <label className="block font-semibold text-base">
                    Subject:
                  </label>
                  <input
                    className="w-full px-4 py-2 rounded border focus:outline-none focus:ring focus:border-blue-300"
                    type="text"
                    value={formData.subject}
                    onChange={(e) => handleInputChange(e, "subject")}
                  />
                </div>

                <div>
                  <label className="block font-semibold text-base">
                    Chapter:
                  </label>
                  <input
                    className="w-full px-4 py-2 rounded border focus:outline-none focus:ring focus:border-blue-300"
                    type="text"
                    value={formData.chapter}
                    onChange={(e) => handleInputChange(e, "chapter")}
                  />
                </div>
              </form>
            </div>

            <div className="w-full md:w-1/2 pl-4">
              <div>
                <label className="block font-semibold text-base">
                  Options:
                </label>
                {formData.options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      className="w-full px-4 py-2 rounded border focus:outline-none focus:ring focus:border-blue-300"
                      type="text"
                      value={option.text}
                      onChange={(e) => handleOptionChange(index, e.target.value)}
                    />
                    <input
                      type="radio"
                      checked={option.isCorrect}
                      onChange={() => handleCorrectOptionChange(index)}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full mt-4">
              <button className="btn btn-primary w-full" onClick={handleSubmit}>
                Submit
              </button>
              <button
                className="btn btn-secondary btn-circle mt-4"
                onClick={() => setShowModal(false)}
              >
                X
              </button>
            </div>
          </div>
        </div>
      );
    };

    useEffect(() => {
      const fetchAllUsers = async () => {
        try {
          const response = await fetch(
            "https://test-app-backend-xdeo.onrender.com/api/auth/allUsers",
            {
              method: "GET",
              headers: {
                "auth-token": localStorage.getItem("token"),
              },
            }
          );
          if (!response.ok) {
          }
          const data = await response.json();
          setUsers(data.Users);
          setLoading(false);
        } catch (err) {
          setError(err.message);
          setLoading(false);
        }
      };
      fetchAllUsers();
    }, []);

    useEffect(() => {
      const fetchAllQues = async () => {
        try {
          const response = await fetch(
            "https://test-app-backend-xdeo.onrender.com/api/ques/allQuestions",
            {
              method: "GET",
              headers: {
                "auth-token": localStorage.getItem("token"),
              },
            }
          );
          if (!response.ok) {
            throw new Error("Failed to fetch questions");
          }
          const data = await response.json();
          setallques(data.questions);
        } catch (err) {
          setError(err.message);
        }
      };
      fetchAllQues();
    }, [handleSubmit]);
    const deleteIt = async (id) => {
      try {
        const response = await fetch(
          `https://test-app-backend-xdeo.onrender.com/api/ques/deleteQues/${id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem("token"),
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to delete question");
        }

        const updatedQuestions = allques.filter(
          (question) => question._id !== id
        );
        setallques(updatedQuestions);
      } catch (error) {
        console.error("Error deleting question:", error);
      }
    };

    return (
      <div className={`base-200 w-full h-[300vh]  ${showModal ? 'overflow-hidden' : ''}`}>
        <div className={`flex items-center justify-center gap-7 ${showModal ? 'blur-sm pointer-events-none' : ''}`}>
          <div className="container text-emerald-800 font-bold text-center bg-white w-40 h-20">
            <h1>Test</h1>
            <h1 className="text-3xl mt-1">{allques.length}</h1>
          </div>
          <div className="container text-emerald-800 font-bold text-center bg-white w-40 h-20">
            <h1>Users</h1>
            <h1 className="text-3xl mt-1">{users.length}</h1>
          </div>
          <button className="btn" onClick={() => setShowModal(true)}>
            Create Test
          </button>
        </div>
        <div className={`testlist bg-red-300 flex `}>
          {showModal && createModal()}
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <div className={`overflow-x-auto  ${showModal ? 'blur-sm pointer-events-none' : ''}`}>
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th>id</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                </tr>
              </thead>
              <tbody>
                {users.map((data) => (
                  <tr key={data._id}>
                    <td>{data._id}</td>
                    <td>{data.name}</td>
                    <td>{data.email}</td>
                    <td>{data.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div
          className={`right main h-full rounded-xl   ${showModal ? 'blur-sm pointer-events-none' : ''} `}
          style={{ width: "100%" }}
        >
          <div className="card_container container flex flex-col mt-5 gap-4 ml-3 overflow-x-hidden items-center">
            {allques &&
              allques.map((question, index) => (
                <div
                  key={question._id}
                  className="card bg-white w-[170vh] h-20 rounded-xl flex flex-row justify-between gap-20 items-center"
                >
                  <div className="headtext text-xl w-52 h-full bg-[#ee9b00] text-center text-white rounded-s-xl">
                    <h1 className="text-center mt-4">{question.subject}</h1>
                  </div>
                  <div
                    className="topictext text-slate-950 text-xl"
                    style={{ textDecoration: "underline wavy hotpink" }}
                  >
                    <h3>{question.quesTitle}</h3>
                  </div>
                  <div
                    className="fullmarkstest text-slate-950 text-xs"
                    style={{ textDecoration: "underline overline coral" }}
                  >
                    {question.text}
                  </div>
                  {/* <div
                    onClick={(id) => edit()}
                    className="btn w-32 h-full rounded-e-lg rounded-s-none btn-info hover-bg-red-700"
                  >
                    Edit
                  </div> */}
                  <div
                    onClick={() => deleteIt(question._id)}
                    className="btn w-32 h-full rounded-e-lg rounded-s-none btn-error hover-bg-green-700"
                  >
                    Delete
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  };

  export default Admindashboard;
