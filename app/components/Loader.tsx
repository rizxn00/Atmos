import React from 'react'

export default function Loader() {
    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-b from-[#344e7b] to-[#0b121e]">
        <div className="relative">
          <div className="w-20 h-20 rounded-full     opacity-75 animate-pulse"></div>
          <div className="absolute top-0 left-0 w-20 h-20 rounded-full bg-yellow-300 opacity-75 animate-bounce"></div>
        </div>
      </div>

    )
}
