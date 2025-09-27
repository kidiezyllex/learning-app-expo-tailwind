import React, { useState } from 'react'
import { Dimensions, View } from 'react-native'
import Svg, { Line, Rect, Text as SvgText } from 'react-native-svg'

const weekData = [
  { day: "CN", hours: 18 },
  { day: "T2", hours: 15 },
  { day: "T3", hours: 24 },
  { day: "T4", hours: 15 },
  { day: "T5", hours: 12 },
  { day: "T6", hours: 18 },
  { day: "T7", hours: 10 },
]

const chartHeight = 300
const maxValue = 24

export default function WeekChart() {
  const requiredWidth = 7 * 40 + 6 * 40 + 120 
  const [containerWidth, setContainerWidth] = useState(Math.max(Dimensions.get("window").width, requiredWidth))
  const chartWidth = containerWidth
  const barWidth = 40 
  const barSpacing = 40
  const renderYAxisLabels = () => {
    const labels = [0, 6, 12, 18, 24]
    return labels.map((value, index) => {
      const y = chartHeight - (value / maxValue) * (chartHeight - 40) + 20
      return (
        <SvgText
          key={value}
          x={chartWidth - 30}
          y={y + 5}
          fontSize="20"
          fill="#6b7280"
          textAnchor="middle"
        >
          {value}h
        </SvgText>
      )
    })
  }

  const renderGridLines = () => {
    const lines = [0, 6, 12, 18, 24]
    return lines.map((value, index) => {
      const y = chartHeight - (value / maxValue) * (chartHeight - 40) - 20
      return (
        <Line
          key={value}
          x1={40}
          y1={y}
          x2={chartWidth - 60}
          y2={y}
          stroke="#BEBEBE"
          strokeWidth="1"
          strokeDasharray="3,3"
        />
      )
    })
  }

  const renderBars = () => {
    return weekData.map((item, index) => {
      const barHeight = (item.hours / maxValue) * (chartHeight - 40)
      const x = 40 + index * (barWidth + barSpacing)
      const y = chartHeight - barHeight - 20
      
      return (
        <React.Fragment key={item.day}>
          <Rect
            x={x}
            y={y}
            width={barWidth}
            height={barHeight}
            fill="#3b82f6"
            rx="4"
            ry="4"
          />
          <SvgText
            x={x + barWidth / 2}
            y={y - 5}
            fontSize="20"
            fill="#3b82f6"
            textAnchor="middle"
          >
            {item.hours}h
          </SvgText>
        </React.Fragment>
      )
    })
  }

  const renderXAxisLabels = () => {
    return weekData.map((item, index) => {
      const x = 40 + index * (barWidth + barSpacing) + barWidth / 2
      return (
        <SvgText
          key={item.day}
          x={x}
          y={chartHeight + 15}
          fontSize="20"
          fill="#6b7280"
          textAnchor="middle"
        >
          {item.day}
        </SvgText>
      )
    })
  }

  return (
    <View 
      className="w-full"
      onLayout={(event) => {
        const { width } = event.nativeEvent.layout
        setContainerWidth(Math.max(width, requiredWidth))
      }}
    >
      <View style={{ height: chartHeight + 40, width: chartWidth }}>
        <Svg width={chartWidth} height={chartHeight + 40}>
          {/* Grid lines */}
          {renderGridLines()}
          
          {/* Y-axis labels */}
          {renderYAxisLabels()}
          
          {/* Bars */}
          {renderBars()}
          
          {/* X-axis labels */}
          {renderXAxisLabels()}
        </Svg>
      </View>
    </View>
  )
}
