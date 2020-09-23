import React, { useMemo, useState } from "react"

import GlobalStyle from "./GlobalStyle"
import Chart from "react-google-charts"

type ChartData = (string | number)[][]

const LABEL: string[] = ["Day", "Low", "Open", "Close", "High"]

type Candle = {
  productCode: string
  duration: number
  time: number
  open: number
  close: number
  high: number
  low: number
  volume: number
}

type DataFrameCandle = {
  productCode: string
  duration: number
  candles: Candle[]
}

const socket = new WebSocket("ws://localhost:3000/api/chat")

export const App = () => {
  socket.onopen = function () {
    console.log("Connection OK\n")
  }

  socket.onmessage = function (e) {
    const data = JSON.parse(e.data)
    setDfCandle(data)
  }

  socket.onclose = e => {
    console.log(e)
  }

  const [dfCandle, setDfCandle] = useState<DataFrameCandle | null>(null)

  const chartData = useMemo<ChartData>(() => {
    const candleData = dfCandle?.candles.map(data => {
      return [data.time, data.low, data.open, data.close, data.high]
    })

    if (!candleData) return []

    return [LABEL, ...candleData]
  }, [dfCandle])

  return (
    <div>
      <GlobalStyle />
      <h1>Stock Sim</h1>
      <Chart
        chartType="CandlestickChart"
        width="100%"
        height="400px"
        data={chartData}
        options={{
          legend: "none",
          candlestick: {
            fallingColor: { strokeWidth: 0, fill: "#a52714" }, // red
            risingColor: { strokeWidth: 0, fill: "#0f9d58" } // green
          }
        }}
      />
    </div>
  )
}
