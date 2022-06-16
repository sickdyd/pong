import { useEffect, useState } from 'react'

interface Brick {
  x: number
  y: number
  width: number
  height: number
  life: number
  color: string
}

export default function useBricks({
  canvasWidth = 300,
  canvasHeight = 300,
  columns = 5,
  rows = 4
}: {
  canvasWidth?: number
  canvasHeight?: number
  columns?: number
  rows?: number
} = {}) {
  const [bricks, setBricks] = useState<Brick[]>([])
  const brickWidth = canvasWidth / columns
  const brickHeight = 20

  useEffect(() => {
    const tmpBricks: Brick[] = []

    for (let c = 0; c < columns; c++) {
      for (let r = 0; r < rows; r++) {
        tmpBricks.push({
          x: c * brickWidth,
          y: r * brickHeight,
          width: brickWidth,
          height: brickHeight,
          life: 1,
          color: `#${Math.floor(Math.random() * 16777215).toString(16)}`
        })
      }
    }

    setBricks(tmpBricks)
  }, [columns, rows, brickWidth])

  return { bricks }
}
