import React, { useCallback, useEffect, useMemo, useState } from "react"

import GlobalStyle from "./GlobalStyle"
import Chart from "react-google-charts"
import styled from "@emotion/styled"

type ChartData = (number | Date | string | null)[][]

const LABEL: string[] = ["Day", "7", "14", "50", "Low", "Open", "Close", "High"]

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

type ChartConfig = {
  productCode: string
  duration?: string
  limit?: number
  sma: boolean
}

enum ProductCode {
  BTC_JPY = "BTC_JPY",
  BTC_USD = "BTC_USD"
}

type Sma = {
  period: number
  values: number[]
}

type DataFrameCandle = {
  productCode: ProductCode
  duration: number
  candles: Candle[]
  smas: Sma[]
}

let socket: WebSocket

const BASE_URL = "ws://localhost:3000/api/candle"

const DURATIONS = ["1s", "1m", "1h"]

export const App = () => {
  const [dfCandle, setDfCandle] = useState<DataFrameCandle | null>(null)
  const [chartConfig, setChartConfig] = useState<ChartConfig>({
    productCode: ProductCode.BTC_JPY,
    sma: true
  })

  useEffect(() => {
    setChartConfig({ productCode: ProductCode.BTC_JPY, sma: true })
  }, [])

  useEffect(() => {
    socket?.close()

    const url = new URL(BASE_URL)
    url.searchParams.set("product_code", chartConfig.productCode)
    chartConfig.limit &&
      url.searchParams.set("limit", chartConfig.limit.toString())
    chartConfig.duration &&
      url.searchParams.set("duration", chartConfig.duration)
    chartConfig.sma && url.searchParams.set("sma", String(chartConfig.sma))
    const nextSocket = new WebSocket(url.toString())
    nextSocket.onopen = function () {
      console.log("Connection OK\n")
    }

    nextSocket.onmessage = function (e) {
      const data = JSON.parse(e.data)
      setDfCandle(data)
    }

    nextSocket.onclose = e => {
      console.log(e)
    }
    socket = nextSocket
  }, [chartConfig])

  const chartData = useMemo<ChartData>(() => {
    const candleData = dfCandle?.candles.map((data, i) => {
      return [
        new Date(data.time),
        dfCandle.smas[0]?.values[i] || NaN,
        dfCandle.smas[1]?.values[i] || NaN,
        dfCandle.smas[2]?.values[i] || NaN,
        data.low,
        data.open,
        data.close,
        data.high
      ]
    })

    if (!candleData) return []

    return [LABEL, ...candleData]
  }, [dfCandle])

  const handleClickDurationButton = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      const { duration } = event.currentTarget.dataset
      setChartConfig(prev => ({ ...prev, duration }))
    },
    []
  )

  const handleChangeLimit = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.keyCode !== 13) return
      const value = event.currentTarget.value
      setChartConfig(prev => ({ ...prev, limit: parseInt(value, 10) }))
    },
    []
  )

  return (
    <div>
      <GlobalStyle />
      <h1>Stock Sim</h1>
      {DURATIONS.map(duration => (
        <DurationButton
          key={duration}
          onClick={handleClickDurationButton}
          data-duration={duration}
        >
          {duration}
        </DurationButton>
      ))}
      <DurationInput type="text" onKeyDown={handleChangeLimit} />
      <div>
        <Chart
          width={"1000px"}
          height={"500px"}
          loader={<div>Loading Chart</div>}
          data={chartData}
          chartType="ComboChart"
          options={{
            hAxis: { slantedText: false },
            legend: "none",
            candlestick: {
              fallingColor: { strokeWidth: 0, fill: "#a52714" }, // red
              risingColor: { strokeWidth: 0, fill: "#0f9d58" } // green
            },
            seriesType: "candlesticks",
            series: {
              0: { type: "line" },
              1: { type: "line" },
              2: { type: "line" }
            }
          }}
        />
      </div>
    </div>
  )
}

const DurationButton = styled.button`
  background-color: #333;
  color: #fff;
  padding: 3px 10px;
  & + & {
    margin-left: 5px;
  }
`

const DurationInput = styled.input`
  display: block;
  border: 1px solid #333;
`
