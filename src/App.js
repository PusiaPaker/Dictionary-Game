import axios from 'axios';
import { useEffect, useState } from 'react';
import Blocks from './Blocks';

var val = 0;


function App() {
  const [word, setWord]               = useState("")
  const [definition, setDefinition]   = useState("")
  const [defList, setDefList]         = useState([])
  const [next, setNext]               = useState()
  const [loading, setLoading]         = useState(true)
  const [correct, setCorrect]         = useState(false)
  const [incorrect, setIncorrect]     = useState(false)
  const [correctDef, setCorrectDef]   = useState("")
  const [score, setScore]             = useState(0);
  const [correctWord, setCorrectWord] = useState("")
  
  

  useEffect(() => {
    setDefList([])
    setLoading(true)

    let arr = []

    axios.get("https://random-words-api.vercel.app/word").then(res => {
      setWord(res.data[0].word)
      setDefinition(res.data[0].definition)
      // setDefList(defList => [...defList, res.data[0].definition])
      arr.push(res.data[0].definition)
    })

    axios.get("https://random-words-api.vercel.app/word").then(res => {
      // setDefList(defList => [...defList, res.data[0].definition])
      arr.push(res.data[0].definition)
    })
    axios.get("https://random-words-api.vercel.app/word").then(res => {
      // setDefList(defList => [...defList, res.data[0].definition])
      arr.push(res.data[0].definition)
    })
    axios.get("https://random-words-api.vercel.app/word").then(res => {
      // setDefList(defList => [...defList, res.data[0].definition])
      arr.push(res.data[0].definition)
      
      arr.sort(() => Math.random() - 0.5)
      setDefList(arr)
      
      setLoading(false)
      setCorrect(false)
      
    })

  }, [next]);

  


  function getNext(){
    setNext(++val)
  }

  function checkAnswer(def){
    if(def === definition){
      setCorrect(true)
      setScore(score + 1)
    }
    else {
      setIncorrect(true)
      setScore(0)
    } 
    setCorrectDef(definition)
    setCorrectWord(word)
    getNext()
  }


  if (correct) return (
    <>
      <div className='min-h-screen min-w-full bg-neutral-700'>
        <div className='-translate-y-12 flex justify-center'>
          <div className='duration-700 translate-y-32'>
            <div className='border-4 border-white px-10 py-5 bg-green-400 rounded-xl text-white shadow-xl font-bold text-2xl'>
              CORRECT
            </div>
          </div>
        </div>
      </div>
      
    </>
  );

  if (incorrect) return (
    <>
      <div className='min-h-screen min-w-full bg-neutral-700'>
        <div className='-translate-y-12 flex justify-center'>
          <div className='duration-700 translate-y-32'>
            <div className=' max-w-[220.6px] text-center border-4 border-white px-10 py-5 bg-red-400 rounded-xl text-white shadow-xl font-bold text-2xl'>
              INCORRECT
            </div>
            <div className='max-w-[220.6px] text-center translate-y-2 text-lg'>
              <div className='text-white font-bold text-2xl mt-5'>
                {correctWord}
              </div>
              <div className='text-white underline underline-offset-1'>
                Definition: 
                {" " + correctDef}
              </div>

              <button onClick={() => setIncorrect(false)} className="mt-6 text-center border-4 border-white px-3 py-2 bg-neutral-800 transition-all hover:scale-105 hover:bg-neutral-900 rounded-xl text-white shadow-xl font-bold text-lg">NEXT</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  if(loading) return (
    <>
    <div className='min-h-screen bg-neutral-700'>
      <div className='-translate-y-12 flex justify-center '>
      <div className='duration-700 translate-y-32'>
        <svg className="animate-spin h-20 w-20 mr-3 overflow-visible" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="50" stroke='white' strokeWidth={10} fill='transparent'/>
            <path d="M0,50 a1,1 0 0,0 100,0" className='stroke-neutral-800' strokeWidth={11} fill="transparent" />
          </svg>
      </div>
      </div>
    </div>

    </>
    );

  return (
    <div className='scrollbar-thin scrollbar-thumb-neutral-800 scrollbar-track-neutral-700 h-32 overflow-y-scroll flex justify-center min-h-screen bg-neutral-700'>
      <>
      <div className='flex flex-col'>        
        <div className='text-xl text-center'>
          <Blocks word={word} definition={definition} defList={defList} checkAnswer={checkAnswer} score={score}/>
        </div>
      </div>
      </>
    </div>
  );
}

export default App;
