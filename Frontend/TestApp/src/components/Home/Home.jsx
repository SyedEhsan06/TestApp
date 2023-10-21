import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
<>
<div className="hero min-h-screen bg-base-200">
  <div className="hero-content text-center">
    <div className="max-w-md">
      <h1 className="text-5xl font-bold">Explore a World of Learning with Our Test App</h1>
      <p className="py-6">This highlights the idea that your app offers various features for learning and taking tests. Feel free to modify it further if needed.</p>
      <Link to='./test'><button className="btn btn-primary">Get Started</button></Link>
    </div>
  </div>
</div>
</>
    )
}

export default Home