"use client";

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

import {
  ComposedChart,
  Bar,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Rectangle,
} from "recharts";

const chartConfig = {
  total: {
    label: "Total",
    color: "#6366f1",
  },
  successful: {
    label: "successful",
    color: "#22c55e",
  },
} satisfies ChartConfig;

const chartData = [
  { month: "January", total: 186, successful: 80 },
  { month: "February", total: 305, successful: 200 },
  { month: "March", total: 237, successful: 120 },
  { month: "April", total: 73, successful: 190 },
  { month: "May", total: 209, successful: 130 },
  { month: "June", total: 214, successful: 140 },
];

// 🔥 Custom hover effect for bars
const CustomBar = (props: any) => {
  const { fill, x, y, width, height } = props;

  return (
    <Rectangle
      x={x}
      y={y}
      width={width}
      height={height}
      fill={fill}
      radius={[8, 8, 0, 0]}
      style={{
        transition: "all 0.3s ease",
        cursor: "pointer",
      }}
    />
  );
};

const AppComposedChart = () => {
  return (
    <div className="rounded-xl border bg-white p-4 shadow-sm">
      <h1 className="text-lg font-semibold mb-6">Total Revenue</h1>

      <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
        <ComposedChart data={chartData}>
          <defs>
            <linearGradient id="totalGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6366f1" stopOpacity={0.9} />
              <stop offset="100%" stopColor="#6366f1" stopOpacity={0.3} />
            </linearGradient>

            <linearGradient id="successGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#22c55e" stopOpacity={1} />
              <stop offset="100%" stopColor="#16a34a" stopOpacity={0.7} />
            </linearGradient>
          </defs>

          <CartesianGrid vertical={false} opacity={0.1} />

          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickFormatter={(v) => v.slice(0, 3)}
          />

          <YAxis tickLine={false} axisLine={false} />

          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />

          {/* 🔥 Animated wide bars */}
          <Bar
            dataKey="total"
            fill="url(#totalGradient)"
            barSize={38}
            shape={<CustomBar />}
          />

          {/* ✨ Smooth trend line */}
          <Line
            type="monotone"
            dataKey="successful"
            stroke="url(#successGradient)"
            strokeWidth={3}
            dot={{ r: 5 }}
            activeDot={{ r: 8 }}
          />
        </ComposedChart>
      </ChartContainer>
    </div>
  );
};

export default AppComposedChart;