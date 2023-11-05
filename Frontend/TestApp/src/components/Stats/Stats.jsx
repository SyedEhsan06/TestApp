import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
const Stats = () => {
  const [apis, setapi] = useState('')
const location = useLocation()
  let api = location.state.api
  const [marks, setmarks] = useState([]);
  useEffect(() => {
    setapi(api)
    console.log(apis)
    const fetchAllUsers = async () => {
      try {
        const response = await fetch(
          // "https://test-app-backend-xdeo.onrender.com/api/marks/results",
          apis,
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
        setmarks(data);
      } catch (err) {
        console.log("error");
      }
    };
    fetchAllUsers();
  }, [apis]);
  return (
    <div className="min-h-screen bg-soft-gray text-soft-blue p-6">
      <div className="container mx-auto">
        <h1 className="text-3xl font-semibold text-trendy-blue mb-4">User Stats</h1>

        <div className="overflow-x-auto">
          <table className="table-auto table-zebra table-trendy w-full border rounded-lg">
            <thead className="bg-trendy-blue">
              <tr>
                <th className="py-2 text-center">Name</th>
                <th className="py-2 text-center">Marks</th>
                <th className="py-2 text-center">Question</th>
                <th className="py-2 text-center">Full Marks</th>
                <th className="py-2 text-center">Given On</th>
              </tr>
            </thead>
            <tbody>
              {marks.map((data, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-trendy-light' : 'bg-trendy-blue'}>
                  <td className="py-2 text-center">{data.name}</td>
                  <td className="py-2 text-center">{data.marks}</td>
                  <td className="py-2 text-center">{data.question}</td>
                  <td className="py-2 text-center">{data.fullmarks}</td>
                  <td className="py-2 text-center">
                    {new Date(data.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
  
  
  
  
  
};

export default Stats;
