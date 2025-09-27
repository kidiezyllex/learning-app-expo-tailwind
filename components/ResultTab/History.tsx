import { View } from 'react-native'
import Svg, { Line, Rect, Text as SvgText } from 'react-native-svg'

// Chart dimensions
const chartWidth = 656
const chartHeight = 384

// Data points for the lines (based on the image description)
const examData = [20, 50, 68, 49, 83]
const quizData = [55, 58, 28, 72, 52]

// Y-axis labels
const yAxisLabels = [0, 20, 40, 60, 80, 100]

// Calculate positions
const chartPadding = { top: 80, right: 60, bottom: 60, left: 80 }
const plotWidth = chartWidth - chartPadding.left - chartPadding.right
const plotHeight = chartHeight - chartPadding.top - chartPadding.bottom

export default function History() {
  // Calculate Y position for a given value
  const getYPosition = (value: number) => {
    return chartPadding.top + (100 - value) / 100 * plotHeight
  }

  // Calculate X position for data point index
  const getXPosition = (index: number) => {
    return chartPadding.left + (index / (examData.length - 1)) * plotWidth
  }

  // Render Y-axis labels
  const renderYAxisLabels = () => {
    return yAxisLabels.map((value) => {
      const y = getYPosition(value)
      return (
        <SvgText
          key={value}
          x={chartPadding.left - 10}
          y={y + 5}
          fontSize="14"
          fill="#6b7280"
          textAnchor="end"
          fontWeight="500"
        >
          {value}
        </SvgText>
      )
    })
  }

  // Render grid lines
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
          strokeWidth="1"
          strokeDasharray="2,2"
        />
      )
    })

    // Add vertical dotted lines on both sides
    const verticalLines = [
      // Left Y-axis line
      <Line
        key="v-left"
        x1={chartPadding.left}
        y1={chartPadding.top}
        x2={chartPadding.left}
        y2={chartPadding.top + plotHeight}
        stroke="#d6d3d1"
        strokeWidth="1"
        strokeDasharray="2,2"
      />,
      // Right Y-axis line
      <Line
        key="v-right"
        x1={chartPadding.left + plotWidth}
        y1={chartPadding.top}
        x2={chartPadding.left + plotWidth}
        y2={chartPadding.top + plotHeight}
        stroke="#d6d3d1"
        strokeWidth="1"
        strokeDasharray="2,2"
      />
    ]

    return [...horizontalLines, ...verticalLines]
  }

  // Render X-axis line
  const renderXAxis = () => {
    return (
      <Line
        x1={chartPadding.left}
        y1={chartPadding.top + plotHeight}
        x2={chartPadding.left + plotWidth}
        y2={chartPadding.top + plotHeight}
        stroke="#d6d3d1"
        strokeWidth="1.5"
      />
    )
  }

  // Render multiple line segments for the data
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
          strokeWidth="2"
        />
      )
    }
    return lines
  }

  // Render legend
  const renderLegend = () => {
    const legendY = chartPadding.top + plotHeight + 30
    const legendStartX = chartPadding.left + plotWidth / 2 - 60

    return (
      <>
        {/* Exam legend */}
        <Line
          x1={legendStartX}
          y1={legendY}
          x2={legendStartX + 24}
          y2={legendY}
          stroke="#ea580c"
          strokeWidth="2"
        />
        <SvgText
          x={legendStartX + 30}
          y={legendY + 5}
          fontSize="14"
          fill="#6b7280"
          fontFamily=""
          fontWeight="500"
        >
          Exam
        </SvgText>

        {/* Quiz legend */}
        <Line
          x1={legendStartX + 80}
          y1={legendY}
          x2={legendStartX + 104}
          y2={legendY}
          stroke="#3b82f6"
          strokeWidth="2"
        />
        <SvgText
          x={legendStartX + 110}
          y={legendY + 5}
          fontSize="14"
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
  <View style={{ borderRadius: 12 }} className="overflow-hidden bg-white shadow-sm">
        <Svg width={chartWidth} height={chartHeight}>
          {/* Background rectangle with shadow effect */}
          <Rect
            x="0"
            y="0"
            width={chartWidth}
            height={chartHeight}
            fill="white"
            rx="16"
            ry="16"
          />
          
          {/* Title */}
          <SvgText
            x={chartPadding.left - 40}
            y={30}
            fontSize="14"
            fill="black"
            fontWeight="500"
          >
            Tổng quan: 35 Quiz, 5 Exam
          </SvgText>

          {/* Grid lines */}
          {renderGridLines()}
          
          {/* X-axis */}
          {renderXAxis()}
          
          {/* Y-axis labels */}
          {renderYAxisLabels()}
          
          {/* Data lines */}
          {renderDataLines(examData, "#ea580c")}
          {renderDataLines(quizData, "#3b82f6")}
          
          {/* Legend */}
          {renderLegend()}
        </Svg>
      </View>
    </View>
  )
}
