import { useEffect, useState } from "react"
import generateRnd from "./rnd"

const BASE_URL = 'http://localhost:8000'
let ID 

export default function App() {
  const [rnd, setRnd] = useState(generateRnd)
  const [prevRnd, setPrevRnd] = useState(0)

  useEffect(() => {
    async function getNum() {
      const res = await fetch(`${BASE_URL}/gamedata`)
      const data = await res.json()
      setPrevRnd(data[0].number)
      ID = data[0].id
    }

    getNum()
  }, [])

  function handleClick() {
    setRnd(generateRnd)
    setPrevRnd(rnd)
    saveCurrentNumber()
  }

  function saveCurrentNumber() {
    fetch(`${BASE_URL}/gamedata/${ID}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({number: rnd})
    })
  }

  return (
    <div className="main">
      <p>Current number: <span>{rnd}</span></p>
      <p>Previous number: <span>{prevRnd}</span></p>
      <button onClick={() => handleClick()}>Generate number</button>
    </div>
  )
}
