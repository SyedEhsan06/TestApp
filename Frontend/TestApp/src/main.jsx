import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Layout from './Layout.jsx'
import Home from './components/Home/Home.jsx'
import Profile from './components/Profile/Profile.jsx'
import Test from './components/Test/Test.jsx'
import Stats from './components/Stats/Stats.jsx'
import Quiz from './components/Quiz/Quiz.jsx'
import Login from './components/Login/Login.jsx'
import Signup from './components/SignUp/Signup.jsx'
import Protected from './components/Protected/Protected.jsx'
import Adminprotected from './components/Adminroute/Adminprotected.jsx'
import { Provider } from 'react-redux'
import {store} from './Redux/store.js'
import Admindashboard from './components/Admindashboard/Admindashboard.jsx'
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/'element={<Layout/>}>
      <Route path=''element={<Home/>}/>
      <Route path='/test'element={<Protected Component={Test}/>}></Route>
      <Route path='/quiz'element={<Protected Component={Quiz}/>}></Route>
      <Route path='/login'element={<Login/>}></Route>
      <Route path='/signup'element={<Signup/>}></Route>
    
      <Route path='profile'element={<Protected Component={Profile}/>}/>
      <Route path='/admindashboard'element={<Protected Component={Admindashboard}/>}/>
      <Route path='stats'element={<Protected Component={Stats}/>}/>


    </Route> 
  )
)
ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
)
