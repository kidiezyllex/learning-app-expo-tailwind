import { View } from 'react-native'
import Svg, { Line, Rect, Text as SvgText } from 'react-native-svg'
import { getScaleFactor } from '../../utils/scaling'

const baseChartWidth = 656
const baseChartHeight = 384

const examData = [20, 50, 68, 49, 83]
const quizData = [55, 58, 28, 72, 52]

const yAxisLabels = [0, 20, 40, 60, 80, 100]

const baseChartPadding = { top: 80, right: 60, bottom: 60, left: 80 }

export default function History() {
  const scaleFactor = getScaleFactor()
  const chartWidth = baseChartWidth * scaleFactor
  const chartHeight = baseChartHeight * scaleFactor
  const chartPadding = {
    top: baseChartPadding.top * scaleFactor,
    right: baseChartPadding.right * scaleFactor,
    bottom: baseChartPadding.bottom * scaleFactor,
    left: baseChartPadding.left * scaleFactor
  }
  const plotWidth = chartWidth - chartPadding.left - chartPadding.right
  const plotHeight = chartHeight - chartPadding.top - chartPadding.bottom
  const baseFontSize = 20
  const fontSize = baseFontSize * scaleFactor
  const getYPosition = (value: number) => {
    return chartPadding.top + (100 - value) / 100 * plotHeight
  }

  const getXPosition = (index: number) => {
    return chartPadding.left + (index / (examData.length - 1)) * plotWidth
  }

  const renderYAxisLabels = () => {
    return yAxisLabels.map((value) => {
      const y = getYPosition(value)
      return (
        <SvgText
          key={value}
          x={chartPadding.left - 10 * scaleFactor}
          y={y + 5 * scaleFactor}
          fontSize={fontSize}
          fill="#6b7280"
          textAnchor="end"
          fontWeight="500"
        >
          {value}
        </SvgText>
      )
    })
  }

  const renderGridLines = () => {
    const horizontalLines = yAxisLabels.map((value) => {
      const y = getYPosition(value)
      return (
        <Line
          key={`h-${value}`}
          x1={chartPadding.left}
          y1={y}
          x2={chartPadding.left + plotWidth}
          y2={y}
          stroke="#d6d3d1"
          strokeWidth={1 * scaleFactor}
          strokeDasharray={`${2 * scaleFactor},${2 * scaleFactor}`}
        />
      )
    })

    const verticalLines = [
      <Line
        key="v-left"
        x1={chartPadding.left}
        y1={chartPadding.top}
        x2={chartPadding.left}
        y2={chartPadding.top + plotHeight}
        stroke="#d6d3d1"
        strokeWidth={1 * scaleFactor}
        strokeDasharray={`${2 * scaleFactor},${2 * scaleFactor}`}
      />,
      <Line
        key="v-right"
        x1={chartPadding.left + plotWidth}
        y1={chartPadding.top}
        x2={chartPadding.left + plotWidth}
        y2={chartPadding.top + plotHeight}
        stroke="#d6d3d1"
        strokeWidth={1 * scaleFactor}
        strokeDasharray={`${2 * scaleFactor},${2 * scaleFactor}`}
      />
    ]

    return [...horizontalLines, ...verticalLines]
  }

  const renderXAxis = () => {
    return (
      <Line
        x1={chartPadding.left}
        y1={chartPadding.top + plotHeight}
        x2={chartPadding.left + plotWidth}
        y2={chartPadding.top + plotHeight}
        stroke="#d6d3d1"
        strokeWidth={1.5 * scaleFactor}
      />
    )
  }

  const renderDataLines = (data: number[], color: string) => {
    const lines = []
    for (let i = 0; i < data.length - 1; i++) {
      lines.push(
        <Line
          key={i}
          x1={getXPosition(i)}
          y1={getYPosition(data[i])}
          x2={getXPosition(i + 1)}
          y2={getYPosition(data[i + 1])}
          stroke={color}
          strokeWidth={2 * scaleFactor}
        />
      )
    }
    return lines
  }

  const renderLegend = () => {
    const legendY = chartPadding.top + plotHeight + 30 * scaleFactor
    const legendStartX = chartPadding.left + plotWidth / 2 - 60 * scaleFactor

    return (
      <>
        <Line
          x1={legendStartX}
          y1={legendY}
          x2={legendStartX + 24 * scaleFactor}
          y2={legendY}
          stroke="#ea580c"
          strokeWidth={2 * scaleFactor}
        />
        <SvgText
          x={legendStartX + 30 * scaleFactor}
          y={legendY + 5 * scaleFactor}
          fontSize={fontSize}
          fill="#6b7280"
          fontFamily=""
          fontWeight="500"
        >
          Exam
        </SvgText>

        <Line
          x1={legendStartX + 80 * scaleFactor}
          y1={legendY}
          x2={legendStartX + 104 * scaleFactor}
          y2={legendY}
          stroke="#3b82f6"
          strokeWidth={2 * scaleFactor}
        />
        <SvgText
          x={legendStartX + 110 * scaleFactor}
          y={legendY + 5 * scaleFactor}
          fontSize={fontSize}
          fill="#6b7280"
          fontWeight="500"
        >
          Quiz
        </SvgText>
      </>
    )
  }

  return (
    <View className="w-full">
  <View 
    style={{ 
      borderRadius: 12 * scaleFactor,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1 * scaleFactor,
      },
      shadowOpacity: 0.05,
      shadowRadius: 2 * scaleFactor,
      elevation: 2,
    }} 
    className="overflow-hidden bg-white">
        <Svg width={chartWidth} height={chartHeight}>
          <Rect
            x="0"
            y="0"
            width={chartWidth}
            height={chartHeight}
            fill="white"
            rx={16 * scaleFactor}
            ry={16 * scaleFactor}
          />
          
          <SvgText
            x={chartPadding.left - 40 * scaleFactor}
            y={30 * scaleFactor}
            fontSize={fontSize}
            fill="black"
            fontWeight="500"
          >
            Tổng quan: 35 Quiz, 5 Exam
          </SvgText>

          {renderGridLines()}
          
          {renderXAxis()}
          
          {renderYAxisLabels()}
          
          {renderDataLines(examData, "#ea580c")}
          {renderDataLines(quizData, "#3b82f6")}
          
          {renderLegend()}
        </Svg>
      </View>
    </View>
  )
}
