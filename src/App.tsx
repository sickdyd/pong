import { createRef } from 'react'
import styled from 'styled-components'
import useDrawBall from './hooks/useDrawBall'

const Canvas = styled.canvas`
  border: 1px solid red;
`

function App() {
  const canvasRef = createRef<HTMLCanvasElement>()
  useDrawBall({ canvasRef })

  return (
    <div className="App">
      <Canvas ref={canvasRef} width="300" height="300" />
    </div>
  )
}

export default App
