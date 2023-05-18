import { useEffect, useState } from 'react'
import { w3cwebsocket } from 'websocket'

import './App.css'

const client = new w3cwebsocket('ws://localhost:3000')

function App() {
  const [count, setCount] = useState(0)
  const onTestClick = () =>
    client.send(
      JSON.stringify({
        type: 'message',
        payload: 'test',
      })
    )
  useEffect(() => {
    client.onopen = () => {
      console.log('client')
    }
  }, [])
  return (
    <>
      <div className='card'>
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
        <button onClick={onTestClick}>test</button>
      </div>
    </>
  )
}

export default App
