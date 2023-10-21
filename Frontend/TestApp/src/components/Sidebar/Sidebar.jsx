import React from 'react'

const Sidebar = () => {
  return (
    <>
   <div className="flex">
        <div className="left sidebar w-[33vh] h-[90vh] bg-white rounded-xl">
          <div className="top">
            <h1 className="text-center text-3xl text-slate-800">Topics</h1>
          </div>
          <div className="line w-full h-[2px] bg-success"></div>

          <div className="sidemain">
            <div className="flex flex-col gap-1">
              <div className="content text-center items-center flex justify-center w-full h-12 bg-red-400 rounded text-lg active:scale-95">
                <h3>Physics</h3>
              </div>
              <div className="content text-center items-center flex justify-center w-full h-12 bg-green-400 rounded text-lg active:scale-95">
                <h3>Chemistry</h3>
              </div>
              <div className="content text-center items-center flex justify-center w-full h-12 bg-blue-400 rounded text-lg active:scale-95">
                <h3>Maths</h3>
              </div>
            </div>
          </div>
        </div>
        </div>
    </>
  )
}

export default Sidebar