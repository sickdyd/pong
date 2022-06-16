import { RefObject } from 'react'
import useBricks from './useBricks'

export default function useDrawBall({
  canvasRef,
  width = 300,
  height = 300
}: {
  canvasRef: RefObject<HTMLCanvasElement>
  width?: number
  height?: number
}) {
  const { bricks } = useBricks()

  let vectorX = 1
  let vectorY = -1
  let ballX = Math.floor(Math.random() * width)
  let ballY = Math.floor(Math.random() * height)
  const ballRadius = 1

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

      for (const { x, y, width, height, color, life } of bricks) {
        if (life > 0) {
          canvasContext.fillStyle = color
          canvasContext.fillRect(x, y, width, height)
        }
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
    for (const brick of bricks) {
      const { x, y, width, height, life } = brick
      if (life > 0) {
        if (ballX >= x && ballX <= x + width && ballY >= y && ballY <= y + height) {
          if (ballY <= y || ballY >= y + height) {
            vectorY *= -1
            brick.life -= 1
          }
          if (ballX <= x || ballX >= x + width) {
            vectorX *= -1
            brick.life -= 1
          }
        }
      }
    }
  }

  return null
}
