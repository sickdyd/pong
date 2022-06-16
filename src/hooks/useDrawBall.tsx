import { RefObject } from 'react'

export default function useDrawBall({
  canvasRef,
  width = 300,
  height = 300
}: {
  canvasRef: RefObject<HTMLCanvasElement>
  width?: number
  height?: number
}) {
  let vectorX = 1
  let vectorY = 1
  let ballX = 230
  let ballY = 30
  const ballRadius = 1

  const bricks = [
    {
      x: 20,
      y: 40,
      width: 100,
      height: 30
    },
    {
      x: 150,
      y: 140,
      width: 140,
      height: 20
    }
  ]

  window.requestAnimationFrame(animate)

  function animate() {
    draw()
    move()
    checkCollisions()

    window.requestAnimationFrame(animate)
  }

  function draw() {
    if (canvasRef.current) {
      const canvasContext = canvasRef.current.getContext('2d')!
      canvasContext.clearRect(0, 0, width, height)
      canvasContext.beginPath()

      canvasContext.strokeStyle = 'rgba(255, 0, 0, 0.8)'
      canvasContext.arc(ballX, ballY, ballRadius, 0, 2 * Math.PI)
      canvasContext.stroke()

      for (const { x, y, width, height } of bricks) {
        canvasContext.rect(x, y, width, height)
        canvasContext.fill()
      }
    }
  }

  function move() {
    ballX += vectorX
    ballY += vectorY

    if (ballX >= width || ballX <= 0) {
      vectorX *= -1
    }

    if (ballY >= height || ballY <= 0) {
      vectorY *= -1
    }
  }

  function checkCollisions() {
    for (const { x, y, width, height } of bricks) {
      if (ballX >= x && ballX <= x + width && ballY >= y && ballY <= y + height) {
        if (ballY <= y || ballY >= y + height) {
          vectorY *= -1
        }
        if (ballX <= x || ballX >= x + width) {
          vectorX *= -1
        }
      }
    }
  }

  return null
}
