import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { userFetch } from "../../features/userSlice";
const Navbar = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const location = useLocation('')
  const [param, setparam] = useState('synthwave')
  const [userData, setUserData] = useState('');
   const logout = () => {
    localStorage.removeItem("token");
    setUserData('');
    navigate("/login");
  };
  useEffect(() => {
    const colorChanger =()=>{
      document.getElementsByTagName('html')[0].setAttribute('data-theme',param)
    }
    colorChanger()
  }, [param])
  
  
  useEffect(() => {
    const fetchUserData = async () => {
      const authToken = localStorage.getItem("token");
      try {
        const response = await fetch('https://mern-test-app-ewyk.onrender.com/api/auth/getuser', {
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
  }, [location.pathname]); 
  const navigate = useNavigate();

  if (location.pathname != "/login" && location.pathname != "/signup") {
    return (
      <>
        <div className="navbar bg-base-100">
          <div className="navbar-start">
            <div className="dropdown">
              <label tabIndex={0} className="btn btn-ghost btn-circle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h7"
                  />
                </svg>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <Link to="./">Home</Link>
                </li>
                <li>
                  <Link to="./Test">Test</Link>
                </li>
                <li>
                  <Link to="./Stats">Stats</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="navbar-center">
            <Link className="btn btn-ghost normal-case text-xl" to="./">
              TestIt
            </Link>
          </div>
          <div className="navbar-end">
           

          </div>
          {userData?<div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src="https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1528&q=80" />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a className="justify-between">
                  {userData ? userData.name : "Name Placeholder"}
                </a>
              </li>
              {userData && userData.role === "admin" ? (
                <li>
                  <button onClick={()=>navigate('/admindashboard',{state:{user:userData}})}>Admin Dashboard</button>
                </li>
              ) : null}
              <li>
                <button onClick={logout}>Logout</button>
              </li>
              <h3 className="text-center bg-fuchsia-500 rounded-lg mb-2">
                Color Pellate
              </h3>
              <div>
                <div className="container flex align-top justify-evenly">
                  <div onClick={()=>setparam('aqua')} className="w-5 h-5 bg-info rounded-full cursor-pointer"></div>
                  <div onClick={()=>setparam('cyberpunk')} className="w-5 h-5 bg-yellow-600 rounded-full   cursor-pointer "></div>
                  <div onClick={()=>setparam('luxury')} className="w-5 h-5 bg-slate-900   rounded-full  cursor-pointer "></div>
                  <div onClick={()=>setparam('retro')} className="w-5 h-5 bg-[#dbc99a]  rounded-full  cursor-pointer "></div>
                  <div onClick={()=>setparam('valentine')} className="w-5 h-5 bg-error rounded-full  cursor-pointer "></div>
                  <div onClick={()=>setparam('bumblebee')} className="w-5 h-5 bg-white  rounded-full  cursor-pointer"></div>
                  <div onClick={()=>setparam('synthwave')} className="w-5 h-5 bg-blue-900  rounded-full  cursor-pointer"></div>

                </div>
              </div>
            </ul>
          </div>:<div className="bg-base-100">
        <div className="flex">
          <Link to="/login" className="btn btn-primary mr-2">
            Login
          </Link>
          <Link to="/signup" className="btn btn-secondary">
            Signup
          </Link>
        </div>
        
      </div>
      }
        </div>
      </>
    );
  } else {
    return (
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <Link to="/login" className="btn btn-primary mr-2">
            Login
          </Link>
          <Link to="/signup" className="btn btn-secondary">
            Signup
          </Link>
        </div>
      </div>
    );
  }
};

export default Navbar;
