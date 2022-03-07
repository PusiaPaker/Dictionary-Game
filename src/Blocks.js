import React from 'react'
import { v4 as uuidv4 } from 'uuid'

export default function Blocks({ word, definition, defList, checkAnswer, score }) {
  return (
    <div >
        <h1 className='text-white font-bold text-center text-7xl mt-10  mb-3'>{word}</h1>
        {/* <h2>{definition}</h2> */}
        <h6 className='text-white'>Streak: {score}</h6>
        <br/>
        <div className='flex justify-center'>
          <div className='grid grid-cols-2 gap-4 place-content-center mt-5'>
              {defList.map(x => (
                  <button onClick={() => checkAnswer(x)} key={uuidv4()} className='border-2 max-w-[200px] rounded-md bg-neutral-800 text-white shadow-2xl px-10 py-5 text-center transition-all duration-200 hover:text-red-400  hover:scale-110 hover:bg-neutral-900'>
                    {x}
                  </button>
              ))}
          </div>
        </div>
        
    </div>
  )
}
